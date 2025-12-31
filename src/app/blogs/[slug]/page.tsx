
import { blogPosts, BlogPost } from '@/lib/blog-data';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Calendar, User, ArrowRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { HeroHeader } from '@/components/layout/HeroHeader';
import Footer from '@/components/layout/footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Logo from '@/components/logo';
import type { Metadata } from 'next';

type Props = {
  params: { slug: string }
}

const getPost = (slug: string): BlogPost | undefined => {
  return blogPosts.find((post) => post.slug === slug);
};

export async function generateMetadata(
  { params }: Props
): Promise<Metadata> {
  const post = getPost(params.slug);

  if (!post) {
    return {
      title: 'Post Not Found | Cleanmails',
      description: 'The blog post you are looking for could not be found.',
    }
  }

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description,
    image: post.imageUrl,
    author: {
      '@type': 'Person',
      name: post.author,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Cleanmails',
      logo: {
        '@type': 'ImageObject',
        url: 'https://cleanmails.com/logo.png', // You should create this logo image
      },
    },
    datePublished: new Date('2025-12-23T12:00:00Z').toISOString(),
    dateModified: new Date('2025-12-23T12:00:00Z').toISOString(),
  };

  return {
    title: `${post.title} | Cleanmails Blog`,
    description: post.description,
    openGraph: {
      title: `${post.title} | Cleanmails Blog`,
      description: post.description,
      url: `https://cleanmails.com/blogs/${post.slug}`,
      siteName: 'Cleanmails',
      images: [
        {
          url: post.imageUrl,
          width: 1200,
          height: 630,
        },
      ],
      locale: 'en_US',
      type: 'article',
      authors: [post.author],
      publishedTime: new Date('2025-12-23T12:00:00Z').toISOString(),
    },
    twitter: {
      card: 'summary_large_image',
      title: `${post.title} | Cleanmails Blog`,
      description: post.description,
      images: [post.imageUrl],
      creator: '@cleanmails', // Add your Twitter handle
    },
    alternates: {
      canonical: `https://cleanmails.com/blogs/${post.slug}`,
    },
    other: {
      'script[type="application/ld+json"]': JSON.stringify(structuredData),
    },
  }
}


export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

const PromoCard = () => (
    <Card className="my-12 bg-primary/10 border-primary/20 text-white">
        <CardContent className="p-8 flex flex-col md:flex-row items-center gap-8">
            <Logo />
            <div className="flex-1">
                <h3 className="text-xl font-bold">Stop Bad Emails, Boost Your Deliverability.</h3>
                <p className="mt-2 text-muted-foreground">
                    Clean, verify, and protect your email lists with Cleanmails. Get started for free and see the difference.
                </p>
            </div>
            <Button asChild size="lg" className="flex-shrink-0">
                <Link href="/auth">
                    Try Cleanmails for Free <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
            </Button>
        </CardContent>
    </Card>
);

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = getPost(params.slug);

  if (!post) {
    notFound();
  }

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description,
    image: post.imageUrl,
    author: {
      '@type': 'Person',
      name: post.author,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Cleanmails',
      logo: {
        '@type': 'ImageObject',
        url: 'https://cleanmails.com/logo.png', // You should create this logo image
      },
    },
    datePublished: new Date('2025-12-23T12:00:00Z').toISOString(),
    dateModified: new Date('2025-12-23T12:00:00Z').toISOString(),
  };

  return (
    <div className="bg-neutral-950 text-white landing-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <HeroHeader />
      <main className="pt-20">
        <article className="py-16 md:py-24">
            <div className="mx-auto max-w-3xl px-4 md:px-6">
                <header className="text-center">
                    <div className="flex justify-center gap-2">
                        {post.tags.map(tag => <Badge key={tag} variant="secondary">{tag}</Badge>)}
                    </div>
                    <h1 className="mt-6 text-4xl font-bold tracking-tight md:text-5xl">
                        {post.title}
                    </h1>
                    <div className="mt-6 flex items-center justify-center gap-6 text-sm text-muted-foreground">
                        <div className="flex items-center gap-2">
                            <User className="h-4 w-4" />
                            <span>{post.author}</span>
                        </div>
                        <span className="text-muted-foreground/50">|</span>
                        <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4" />
                            <span>{post.date}</span>
                        </div>
                    </div>
                </header>
                
                <div className="my-12 aspect-video w-full overflow-hidden rounded-2xl">
                     <Image
                        src={post.imageUrl}
                        alt={post.title}
                        width={1200}
                        height={630}
                        className="w-full object-cover"
                        data-ai-hint={post.imageHint}
                        priority
                    />
                </div>

                <div 
                    className="prose prose-invert prose-lg mx-auto max-w-none text-foreground/90 
                    prose-p:text-lg prose-p:leading-relaxed
                    prose-headings:text-foreground prose-h3:mt-8 prose-h3:mb-2 prose-h3:text-2xl prose-h3:font-bold prose-h3:leading-tight
                    prose-a:text-primary prose-a:no-underline hover:prose-a:underline
                    prose-strong:text-foreground/90
                    prose-ul:list-disc prose-ul:pl-6 prose-ul:space-y-2
                    prose-li:text-lg"
                    dangerouslySetInnerHTML={{ __html: post.content }} 
                />

                <PromoCard />
            </div>
        </article>
      </main>
      <Footer />
    </div>
  );
}
