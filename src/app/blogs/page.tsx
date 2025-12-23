
'use client';

import { blogPosts, BlogPost } from '@/lib/blog-data';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ArrowRight, Calendar, User, Search } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { HeroHeader } from '@/components/layout/HeroHeader';
import Footer from '@/components/layout/footer';
import { Input } from '@/components/ui/input';

const BlogCard = ({ post }: { post: BlogPost }) => (
    <Link href={`/blogs/${post.slug}`} className="group block overflow-hidden rounded-2xl border border-white/10 bg-card/5 shadow-sm transition-all duration-300 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/10">
      <Image
        src={post.imageUrl}
        alt={post.title}
        width={600}
        height={400}
        className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
        data-ai-hint={post.imageHint}
      />
      <div className="p-6">
        <div className="flex gap-2">
            {post.tags.map(tag => <Badge key={tag} variant="secondary">{tag}</Badge>)}
        </div>
        <h3 className="mt-4 text-xl font-semibold leading-tight text-white transition-colors group-hover:text-primary">
          {post.title}
        </h3>
        <p className="mt-2 text-sm text-muted-foreground line-clamp-2">{post.description}</p>
        <div className="mt-4 flex items-center gap-4 text-sm text-muted-foreground">
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
      </div>
    </Link>
);


export default function BlogPage() {
    const latestPost = blogPosts[0];
    const otherPosts = blogPosts.slice(1);

  return (
    <div className="bg-neutral-950 text-white landing-page">
      <HeroHeader />
      <main className="pt-20">
         <section className="py-16 md:py-24">
            <div className="mx-auto max-w-5xl px-4 md:px-6">
                <div className="text-center">
                    <h1 className="text-4xl font-bold tracking-tight md:text-5xl">Our Blog</h1>
                    <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
                        Insights, tips, and updates on email validation and marketing from the Cleanmails team.
                    </p>
                    <div className="mt-8 mx-auto max-w-md relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                        <Input placeholder="Search articles..." className="pl-10 h-12 bg-card/5 border-white/10" />
                    </div>
                </div>

                 {latestPost && (
                    <div className="mt-16 group">
                        <Link href={`/blogs/${latestPost.slug}`} className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
                            <div className="overflow-hidden rounded-2xl">
                                <Image
                                    src={latestPost.imageUrl}
                                    alt={latestPost.title}
                                    width={800}
                                    height={500}
                                    className="w-full object-cover transition-transform duration-300 group-hover:scale-105"
                                    data-ai-hint={latestPost.imageHint}
                                    priority
                                />
                            </div>
                            <div>
                                <Badge variant="default" className="mb-4">Latest Post</Badge>
                                <h2 className="text-3xl font-bold leading-tight tracking-tight text-white transition-colors group-hover:text-primary">
                                    {latestPost.title}
                                </h2>
                                <p className="mt-4 text-muted-foreground line-clamp-3">
                                    {latestPost.description}
                                </p>
                                <div className="mt-6 flex items-center gap-4 text-muted-foreground">
                                    <div className="flex items-center gap-2">
                                        <div className="text-sm">
                                            <p className="font-semibold text-white">{post.author}</p>
                                            <p>{post.date}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </div>
                )}
                
                <div className="mt-20 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                    {otherPosts.map(post => (
                        <BlogCard key={post.id} post={post} />
                    ))}
                </div>

            </div>
         </section>
      </main>
      <Footer />
    </div>
  );
}
