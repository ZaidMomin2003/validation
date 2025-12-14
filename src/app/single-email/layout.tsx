
'use client';

import {
  FileUp,
  Mail,
  History,
  ListFilter,
  FileText,
  MessageSquare,
  User,
  Zap,
  ChevronRight,
} from 'lucide-react';
import { usePathname } from 'next/navigation';

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

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
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
              <SidebarMenuButton href="#" isActive={pathname === '/lists'}>
                <History />
                Lists
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton href="#" isActive={pathname === '/sort-the-list'}>
                <ListFilter />
                Sort the list
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter className="mt-auto">
          <SidebarGroup>
            <SidebarGroupLabel>QUICK LINKS</SidebarGroupLabel>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton href="#">
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
          <SidebarGroup>
             <SidebarMenu>
                <SidebarMenuItem>
                    <SidebarMenuButton href="#">
                        <User />
                        <div className="flex flex-col">
                            <span>My Account</span>
                            <span className="text-xs text-muted-foreground">Free Plan</span>
                        </div>
                        <ChevronRight className="ml-auto" />
                    </SidebarMenuButton>
                </SidebarMenuItem>
             </SidebarMenu>
          </SidebarGroup>
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
