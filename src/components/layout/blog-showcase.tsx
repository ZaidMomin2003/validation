
'use client';

import { blogPosts, BlogPost } from '@/lib/blog-data';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ArrowRight, Calendar, User } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export default function BlogShowcase() {
  const latestPosts = blogPosts.slice(0, 3);

  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-5xl px-4 md:px-6">
        <div className="flex flex-col items-center text-center">
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
                From the Blog
            </h2>
            <p className="mt-4 max-w-2xl text-muted-foreground">
                Stay updated with the latest insights on email marketing, deliverability, and data hygiene.
            </p>
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {latestPosts.map((post) => (
            <Link key={post.id} href="/blogs" className="group block">
              <div className="overflow-hidden rounded-lg">
                <Image
                  src={post.imageUrl}
                  alt={post.title}
                  width={600}
                  height={400}
                  className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                  data-ai-hint={post.imageHint}
                />
              </div>
              <div className="mt-4">
                <div className="flex gap-2">
                    {post.tags.map(tag => <Badge key={tag} variant="secondary">{tag}</Badge>)}
                </div>
                <h3 className="mt-3 text-lg font-semibold leading-snug group-hover:text-primary transition-colors">
                  {post.title}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground line-clamp-2">{post.description}</p>
                 <div className="mt-4 flex items-center gap-4 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1.5">
                        <User className="h-3.5 w-3.5" />
                        <span>{post.author}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <Calendar className="h-3.5 w-3.5" />
                        <span>{post.date}</span>
                    </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-12 text-center">
            <Button asChild variant="outline">
                <Link href="/blogs">
                    View All Posts <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
            </Button>
        </div>
      </div>
    </section>
  );
}
