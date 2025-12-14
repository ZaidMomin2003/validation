'use client';

import { cn } from '@/lib/utils';
import { MailCheck } from 'lucide-react';

export default function Logo({ className }: { className?: string }) {
  return (
    <div className={cn('flex items-center gap-3', className)}>
      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 border">
        <MailCheck className="h-6 w-6 text-primary" />
      </div>
      <div className="flex flex-col">
        <span className="font-bold text-lg text-foreground">Verilist</span>
        <span className="text-sm text-muted-foreground -mt-1">
          Email Verification
        </span>
      </div>
    </div>
  );
}
