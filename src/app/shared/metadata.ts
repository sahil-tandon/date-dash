import { Metadata, ResolvingMetadata } from 'next';

type Props = {
  searchParams: { [key: string]: string | string[] | undefined }
}

export async function generateMetadata(
  { searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const title = searchParams.title as string || 'Date Idea';
  const description = searchParams.description as string || '';
  const city = searchParams.city as string || '';

  return {
    title: `${title} - DateDash`,
    description: `Check out this date idea in ${city}: ${description}`,
    openGraph: {
      title: `${title} - A Date Idea for ${city}`,
      description: `${description}`,
      images: [`/api/og?title=${encodeURIComponent(title)}&city=${encodeURIComponent(city)}`],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} - A Date Idea for ${city}`,
      description: `${description}`,
    },
  }
}