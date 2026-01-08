
'use client';

import {
  FileUp,
  Mail,
  History,
  MessageSquare,
  LogOut,
  Zap,
  ChevronRight,
  Sun,
  Moon,
  ChevronsUpDown,
  FileClock,
  UserCog,
  CreditCard,
  LifeBuoy,
  FileText,
  ShieldAlert,
  Rocket,
  ShieldCheck,
} from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useTheme } from 'next-themes';
import React from 'react';

import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarInset,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarSeparator,
  SidebarProvider,
} from '@/components/ui/sidebar';
import Logo from '@/components/logo';
import Header from '@/components/layout/header';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useAuth } from '@/hooks/useAuth';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ClientOnly } from '@/components/ClientOnly';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '../ui/skeleton';
import { Progress } from '../ui/progress';
import { useCollection } from '@/firebase/hooks';
import { collection, query } from 'firebase/firestore';
import { db } from '@/firebase/firebaseClient';
import type { List } from '@/types';
import UpgradeNotice from './UpgradeNotice';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { user, signOut, loading: authLoading } = useAuth();
  const { setTheme } = useTheme();
  const router = useRouter();

  React.useEffect(() => {
    if (!authLoading && !user) {
      router.push('/auth');
    }
  }, [authLoading, user, router]);

  if (authLoading || !user) {
    return (
        <div className="flex min-h-screen items-center justify-center">
            <div className="flex flex-col items-center gap-4">
              <Logo />
              <p>Loading your dashboard...</p>
            </div>
        </div>
    );
  }
  
  const getInitials = (name?: string | null) => {
    if (!name) return 'U';
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase();
  };
  
  const showUpgradeNotice = user?.plan === 'Free' && pathname !== '/pricing';

  return (
      <SidebarProvider>
        <Sidebar>
          <SidebarHeader>
            <div className="flex h-14 items-center justify-center px-4">
              <Logo />
            </div>
          </SidebarHeader>
          <SidebarContent>
            <SidebarGroup>
                <SidebarGroupLabel>Tools</SidebarGroupLabel>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton href="/email-validation" isActive={pathname === '/email-validation'}>
                        <ShieldCheck />
                        Email Validation
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                        <SidebarMenuButton href="/bulk-validate" isActive={pathname === '/bulk-validate'}>
                        <FileUp />
                        Clean List
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                        <SidebarMenuButton href="/extract-from-text" isActive={pathname === '/extract-from-text'}>
                        <FileText />
                        Extract Emails
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                        <SidebarMenuButton href="/spam-checker" isActive={pathname === '/spam-checker'}>
                        <ShieldAlert />
                        Spam Checker
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarGroup>
            </SidebarContent>
          <SidebarFooter className="mt-auto">
            <SidebarGroup>
              <SidebarGroupLabel>QUICK LINKS</SidebarGroupLabel>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton href="/support" isActive={pathname === '/support'}>
                    <LifeBuoy />
                    Support
                    {pathname === '/support' && <ChevronRight className="ml-auto h-4 w-4" />}
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton href="/feedback" isActive={pathname === '/feedback'}>
                    <MessageSquare />
                    Feedback
                    {pathname === '/feedback' && <ChevronRight className="ml-auto h-4 w-4" />}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroup>
             <div className="p-2">
                <Link href="/email-system" className="block group">
                    <div className="relative rounded-lg p-4 overflow-hidden bg-primary text-primary-foreground transition-all hover:shadow-lg hover:shadow-primary/20">
                        <div className="absolute -top-1/2 -right-1/2 w-full h-full bg-white/10 rounded-full animate-pulse blur-2xl group-hover:scale-150 transition-transform duration-500"></div>
                        <div className="relative flex items-center gap-3">
                             <Rocket className="h-5 w-5 transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110" />
                            <p className="text-sm font-semibold">
                                Get Complete Email System
                            </p>
                        </div>
                    </div>
                </Link>
            </div>
            <SidebarSeparator />
            <ClientOnly>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <div className="p-2 cursor-pointer">
                      {authLoading ? (
                          <div className="flex items-center gap-3 p-2 rounded-lg">
                              <Skeleton className="h-9 w-9 rounded-full" />
                              <div className="flex flex-col gap-1">
                                  <Skeleton className="h-4 w-20" />
                              </div>
                          </div>
                      ) : user ? (
                          <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-sidebar-accent transition-colors">
                              <Avatar className="h-9 w-9">
                                  <AvatarImage src={user.photoURL ?? ""} alt={user.displayName ?? "User"} />
                                  <AvatarFallback>{getInitials(user.displayName)}</AvatarFallback>
                              </Avatar>
                              <div className="flex flex-col text-left overflow-hidden">
                                  <span className="text-sm font-medium truncate">{user?.displayName}</span>
                                  <span className="text-xs text-muted-foreground truncate">{user?.email}</span>
                              </div>
                              <ChevronsUpDown className="ml-auto h-4 w-4 text-muted-foreground" />
                          </div>
                      ) : (
                          <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-sidebar-accent transition-colors">
                               <Avatar className="h-9 w-9">
                                  <AvatarFallback>??</AvatarFallback>
                              </Avatar>
                              <div className="flex flex-col text-left">
                                  <span className="text-sm font-medium">Not Signed In</span>
                              </div>
                          </div>
                      )}
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-64 mb-2" side="top" align="start">
                  {user ? (
                      <>
                          <DropdownMenuLabel>My Account</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem asChild>
                            <Link href="/profile">
                              <UserCog className="mr-2 h-4 w-4" />
                              <span>Profile</span>
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link href="/pricing" className="flex justify-between items-center">
                                <div className='flex items-center'>
                                    <CreditCard className="mr-2 h-4 w-4" />
                                    <span>Subscription</span>
                                </div>
                                {user?.plan === 'Lifetime' ? (
                                    <Badge variant="outline" className="border-green-500/50 text-green-400">LTD</Badge>
                                ) : (
                                    <Badge variant="secondary">Free</Badge>
                                )}
                            </Link>
                          </DropdownMenuItem>
                           <DropdownMenuItem asChild>
                            <Link href="/changelog">
                              <FileClock className="mr-2 h-4 w-4" />
                              <span>Changelog</span>
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuSub>
                            <DropdownMenuSubTrigger>
                              <Sun className="h-4 w-4 mr-2 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                              <Moon className="absolute h-4 w-4 mr-2 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                              <span>Toggle theme</span>
                            </DropdownMenuSubTrigger>
                            <DropdownMenuPortal>
                              <DropdownMenuSubContent>
                                <DropdownMenuItem onClick={() => setTheme('light')}>
                                  Light
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => setTheme('dark')}>
                                  Dark
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => setTheme('system')}>
                                  System
                                </DropdownMenuItem>
                              </DropdownMenuSubContent>
                            </DropdownMenuPortal>
                          </DropdownMenuSub>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem onClick={signOut} className="text-destructive focus:bg-destructive focus:text-destructive-foreground">
                            <LogOut className="mr-2 h-4 w-4" />
                            <span>Log out</span>
                          </DropdownMenuItem>
                      </>
                  ) : (
                      <DropdownMenuItem asChild>
                          <Link href="/auth">
                              <LogOut className="mr-2 h-4 w-4" />
                              <span>Sign In</span>
                          </Link>
                      </DropdownMenuItem>
                  )}

                </DropdownMenuContent>
              </DropdownMenu>
              </ClientOnly>
            {user?.plan === 'Lifetime' ? (
                <div className="p-2">
                    <div className="w-full justify-center rounded-lg bg-emerald-500/10 p-3 text-center text-sm font-semibold text-emerald-400 border border-emerald-500/20">
                        <div className="flex items-center justify-center gap-2">
                            <ShieldCheck className="h-4 w-4"/>
                            <span>Lifetime Deal Active</span>
                        </div>
                    </div>
                </div>
            ) : (
              <div className="p-2">
                <Button asChild className="w-full justify-between dark:bg-white dark:text-black dark:hover:bg-white/90 bg-primary text-primary-foreground hover:bg-primary/90">
                  <Link href="/pricing">
                    <div className="flex items-center gap-2">
                      <Zap />
                      <span>Upgrade to Pro</span>
                    </div>
                    <ChevronRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            )}
          </SidebarFooter>
        </Sidebar>
        <div className="flex flex-1 flex-col overflow-auto">
          <Header />
          <SidebarInset>
            {showUpgradeNotice ? <UpgradeNotice /> : children}
          </SidebarInset>
        </div>
      </SidebarProvider>
  );
}
