import { MailCheck } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export default function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      className={cn(
        'flex items-center gap-2 text-xl font-bold text-foreground',
        className
      )}
    >
      <MailCheck className="h-6 w-6 text-primary" />
      <span>VeriFlow</span>
    </Link>
  );
}
