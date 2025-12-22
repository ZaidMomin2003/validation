'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { Loader2 } from 'lucide-react';
import { ClientOnly } from '@/components/ClientOnly';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [isVerified, setIsVerified] = useState(false);

  useEffect(() => {
    // This check runs only on the client
    const isAdmin = sessionStorage.getItem('isAdminAuthenticated') === 'true';

    if (!isAdmin) {
      router.replace('/admin/login');
    } else {
      setIsVerified(true);
    }
  }, [router, pathname]);

  if (!isVerified) {
    return (
      <div className="flex min-h-screen w-full items-center justify-center bg-background">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <ClientOnly>
      <div className="flex min-h-screen w-full bg-muted/40">{children}</div>
    </ClientOnly>
  );
}
