
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
import { ThemeProvider } from '../theme-provider';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { user, signOut, loading } = useAuth();
  const { setTheme } = useTheme();
  const router = useRouter();

  React.useEffect(() => {
    if (!loading && !user) {
      router.push('/auth');
    }
  }, [loading, user, router]);

  if (loading || !user) {
    return (
        <div className="flex min-h-screen items-center justify-center">
            <Skeleton className="h-20 w-20 rounded-full" />
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

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <SidebarProvider>
        <Sidebar>
          <SidebarHeader>
            <div className="flex h-14 items-center px-4">
              <Logo />
            </div>
          </SidebarHeader>
          <SidebarContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton href="/bulk-validate" isActive={pathname === '/bulk-validate'}>
                  <FileUp />
                  Clean and validate
                  {pathname === '/bulk-validate' && <ChevronRight className="ml-auto h-4 w-4" />}
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton href="/lists" isActive={pathname === '/lists'}>
                  <History />
                  Lists
                  {pathname === '/lists' && <ChevronRight className="ml-auto h-4 w-4" />}
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
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
            <SidebarSeparator />
            <ClientOnly>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <div className="p-2 cursor-pointer">
                      {loading ? (
                          <div className="flex items-center gap-3 p-2 rounded-lg">
                              <Skeleton className="h-9 w-9 rounded-full" />
                              <div className="flex flex-col gap-1">
                                  <Skeleton className="h-4 w-20" />
                                  <Skeleton className="h-3 w-12" />
                              </div>
                          </div>
                      ) : user ? (
                          <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-sidebar-accent transition-colors">
                              <Avatar className="h-9 w-9">
                                  <AvatarImage src={user.photoURL ?? ""} alt={user.displayName ?? "User"} />
                                  <AvatarFallback>{getInitials(user.displayName)}</AvatarFallback>
                              </Avatar>
                              <div className="flex flex-col text-left">
                                  <span className="text-sm font-medium">{user?.displayName}</span>
                                  <span className="text-xs text-muted-foreground">Free Plan</span>
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
                            <Link href="/subscription" className='flex items-center justify-between w-full'>
                              <div className='flex items-center'>
                                <CreditCard className="mr-2 h-4 w-4" />
                                <span>Subscription</span>
                              </div>
                              <Badge variant="secondary">Free</Badge>
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
            <div className="p-2">
              <Button asChild className="w-full justify-between bg-black text-white dark:bg-white dark:text-black">
                <Link href="/pricing">
                  <Zap />
                  <span>Upgrade to Pro</span>
                  <ChevronRight />
                </Link>
              </Button>
            </div>
          </SidebarFooter>
        </Sidebar>
        <SidebarInset>
          <Header />
          {children}
        </SidebarInset>
      </SidebarProvider>
    </ThemeProvider>
  );
}
