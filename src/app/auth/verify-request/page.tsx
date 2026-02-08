// src/app/auth/verify-request/page.tsx

export default function VerifyRequest() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-normal tracking-wide text-primary font-barrio">
            CHECK YOUR EMAIL
          </h1>
          <p className="text-xl text-primary/90 font-oooh-baby">
            A sign in link has been sent to your email address...
          </p>
        </div>
      </div>
    </div>
  );
}