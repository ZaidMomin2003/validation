
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Target, Rocket, Eye, Linkedin, Github, Twitter } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function DeveloperPage() {
  return (
    <main className="flex-1">
        <section className="relative py-24 md:py-32">
             <div className="absolute inset-0 z-0 opacity-10">
                <Image 
                    src="https://images.unsplash.com/photo-1593720213428-28a5b9e94613?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3"
                    alt="Developer background"
                    fill
                    className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent"></div>
            </div>
            <div className="container mx-auto max-w-5xl px-4 md:px-6 relative z-10">
                <div className="grid md:grid-cols-3 gap-12 items-center">
                    <div className="flex flex-col items-center md:items-start text-center md:text-left">
                        <Avatar className="w-40 h-40 border-4 border-primary shadow-lg">
                            <AvatarImage src="https://i.pravatar.cc/300?u=zaid" alt="Zaid Momin" />
                            <AvatarFallback>ZM</AvatarFallback>
                        </Avatar>
                        <h1 className="text-4xl font-bold mt-6">Zaid Momin</h1>
                        <p className="text-primary text-lg font-semibold">Founder of ZuhanaTech</p>
                        <div className="flex gap-4 mt-4">
                            <Link href="#" target="_blank" className="text-muted-foreground hover:text-primary"><Linkedin /></Link>
                            <Link href="#" target="_blank" className="text-muted-foreground hover:text-primary"><Github /></Link>
                            <Link href="#" target="_blank" className="text-muted-foreground hover:text-primary"><Twitter /></Link>
                        </div>
                    </div>
                     <div className="md:col-span-2">
                        <Card className="bg-card/5 border-border/20 backdrop-blur-sm">
                            <CardContent className="p-8">
                                <h2 className="text-xl font-semibold mb-4">About Me</h2>
                                <p className="text-muted-foreground leading-relaxed">
                                    I am a passionate software engineer and entrepreneur dedicated to building tools that are not only powerful but also intuitive and accessible. With a background in full-stack development, I founded ZuhanaTech to transform complex problems into elegant software solutions. Cleanmails is the first step in a journey to create a suite of products that empower businesses to grow.
                                </p>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </section>

        <section className="py-24 md:py-32 bg-muted/20">
            <div className="container mx-auto max-w-5xl px-4 md:px-6">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold tracking-tight">Our Philosophy at ZuhanaTech</h2>
                    <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
                        The principles that guide our product development and company culture.
                    </p>
                </div>
                 <div className="grid md:grid-cols-3 gap-8">
                    <Card className="text-center bg-card/10 border-border/20">
                        <CardHeader>
                            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 mb-4">
                                <Eye className="h-8 w-8 text-primary" />
                            </div>
                            <CardTitle className="text-2xl">Vision</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground">To create a world where technology is a seamless extension of human capability, simplifying complexity and unlocking potential for everyone.</p>
                        </CardContent>
                    </Card>
                    <Card className="text-center bg-card/10 border-border/20">
                        <CardHeader>
                            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 mb-4">
                                <Rocket className="h-8 w-8 text-primary" />
                            </div>
                            <CardTitle className="text-2xl">Mission</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground">Our mission is to build beautiful, user-centric software products that solve real-world problems for businesses and individuals, one line of code at a time.</p>
                        </CardContent>
                    </Card>
                    <Card className="text-center bg-card/10 border-border/20">
                        <CardHeader>
                            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 mb-4">
                                <Target className="h-8 w-8 text-primary" />
                            </div>
                            <CardTitle className="text-2xl">Goals</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground">To continuously innovate, prioritize our users' needs in every decision, and build a sustainable company culture rooted in creativity, integrity, and excellence.</p>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </section>
    </main>
  );
}
