import clientPromise from '@/lib/db/mongodb';

const WINDOW_MS = 60 * 60 * 1000; // 1 hour
const MAX_REQUESTS = 10;

interface RateLimitEntry {
  ip: string;
  timestamps: Date[];
  expiresAt: Date;
}

/**
 * Check whether the given IP has exceeded the rate limit.
 * Uses MongoDB so the limit is shared across all Vercel instances.
 *
 * Returns { allowed, remaining, retryAfterMs }.
 */
export async function checkRateLimit(ip: string) {
  const client = await clientPromise;
  const db = client.db(process.env.MONGODB_DB);
  const col = db.collection<RateLimitEntry>('rateLimits');

  // Ensure TTL index exists (MongoDB will auto-delete expired docs).
  // createIndex is a no-op when the index already exists.
  await col.createIndex({ expiresAt: 1 }, { expireAfterSeconds: 0 });

  const now = new Date();
  const windowStart = new Date(now.getTime() - WINDOW_MS);

  // Atomically prune old timestamps and push the new one
  const result = await col.findOneAndUpdate(
    { ip },
    {
      $pull: { timestamps: { $lt: windowStart } } as never,
      $setOnInsert: { ip },
      $set: { expiresAt: new Date(now.getTime() + WINDOW_MS) },
    },
    { upsert: true, returnDocument: 'after' }
  );

  const doc = result;
  const currentCount = doc?.timestamps?.length ?? 0;

  if (currentCount >= MAX_REQUESTS) {
    // Find the oldest timestamp in the window to calculate retry-after
    const oldest = doc!.timestamps[0];
    const retryAfterMs = oldest.getTime() + WINDOW_MS - now.getTime();
    return {
      allowed: false,
      remaining: 0,
      retryAfterMs: Math.max(retryAfterMs, 0),
    };
  }

  // Under the limit — record this request
  await col.updateOne(
    { ip },
    {
      $push: { timestamps: now },
      $set: { expiresAt: new Date(now.getTime() + WINDOW_MS) },
    },
    { upsert: true },
  );

  return {
    allowed: true,
    remaining: MAX_REQUESTS - currentCount - 1,
    retryAfterMs: 0,
  };
}
