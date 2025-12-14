
'use client';

import AuthButton from '@/components/auth-button';
import Logo from '@/components/logo';
import { ThemeToggle } from '@/components/theme-toggle';
import { SidebarTrigger } from '@/components/ui/sidebar';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur-sm">
      <div className="container flex h-14 items-center">
        <div className="mr-4 flex items-center gap-2">
          <SidebarTrigger className="md:hidden" />
          <Logo />
        </div>
        <div className="flex flex-1 items-center justify-end space-x-2">
          <ThemeToggle />
          <AuthButton />
        </div>
      </div>
    </header>
  );
}
