
'use client';

import { cn } from '@/lib/utils';
import { MailCheck } from 'lucide-react';

export function LogoIcon({ 
    className, 
    containerSize = 40, 
    iconSize = 24 
}: { 
    className?: string;
    containerSize?: number;
    iconSize?: number;
}) {
  return (
    <div className={cn('inline-flex items-center justify-center', className)}>
      <div 
        className="flex items-center justify-center rounded-lg bg-primary/10 border"
        style={{ height: containerSize, width: containerSize }}
      >
        <MailCheck className="text-primary" style={{ height: iconSize, width: iconSize }} />
      </div>
    </div>
  );
}
