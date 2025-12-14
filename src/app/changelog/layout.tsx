
'use client';

import {
  FileUp,
  Mail,
  History,
  FileText,
  MessageSquare,
  User,
  LogOut,
  Zap,
  ChevronRight,
  Sun,
  Moon,
  ChevronsUpDown,
  FileClock,
  UserCog,
  CreditCard,
} from 'lucide-react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { useTheme } from 'next-themes';

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

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { user, signOut } = useAuth();
  const { setTheme } = useTheme();

  const getInitials = (name?: string | null) => {
    if (!name) return 'U';
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase();
  };

  return (
    <>
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
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton href="/single-email" isActive={pathname === '/single-email'}>
                <Mail />
                Single Email
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton href="/lists" isActive={pathname === '/lists'}>
                <History />
                Lists
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter className="mt-auto">
          <SidebarGroup>
            <SidebarGroupLabel>QUICK LINKS</SidebarGroupLabel>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton href="/changelog" isActive={pathname === '/changelog'}>
                  <FileText />
                  Changelog
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton href="#">
                  <MessageSquare />
                  Feedback
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroup>
          <SidebarSeparator />
          <ClientOnly>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className="p-2 cursor-pointer">
                    <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-sidebar-accent transition-colors">
                        {user && (
                             <Avatar className="h-9 w-9">
                                <AvatarImage src={user.photoURL ?? ""} alt={user.displayName ?? "User"} />
                                <AvatarFallback>{getInitials(user.displayName)}</AvatarFallback>
                            </Avatar>
                        )}
                        <div className="flex flex-col text-left">
                            <span className="text-sm font-medium">{user?.displayName}</span>
                            <span className="text-xs text-muted-foreground">Free Plan</span>
                        </div>
                        <ChevronsUpDown className="ml-auto h-4 w-4 text-muted-foreground" />
                    </div>
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-64 mb-2" side="top" align="start">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/profile">
                    <UserCog className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/subscription">
                    <CreditCard className="mr-2 h-4 w-4" />
                    <span>Subscription</span>
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
              </DropdownMenuContent>
            </DropdownMenu>
            </ClientOnly>
          <div className="p-2">
            <Button className="w-full justify-between bg-black text-white dark:bg-white dark:text-black">
              <Zap />
              <span>Upgrade to Pro</span>
              <ChevronRight />
            </Button>
          </div>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <Header />
        {children}
      </SidebarInset>
    </>
  );
}
