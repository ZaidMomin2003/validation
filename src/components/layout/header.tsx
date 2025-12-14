
'use client';

import AuthButton from '@/components/auth-button';
import { ThemeToggle } from '@/components/theme-toggle';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { ClientOnly } from '@/components/ClientOnly';
import { usePathname } from 'next/navigation';
import { HeroHeader } from './hero-header';

export default function Header() {
  const pathname = usePathname();

  if (pathname === '/') {
    return null;
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur-sm">
      <div className="container flex h-14 items-center">
        <div className="mr-4 flex items-center gap-2">
          <SidebarTrigger className="md:hidden" />
        </div>
        <div className="flex flex-1 items-center justify-end space-x-2">
          <ClientOnly>
            <ThemeToggle />
            <AuthButton />
          </ClientOnly>
        </div>
      </div>
    </header>
  );
}
