import { Bot } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function Logo({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        'flex items-center gap-2 text-xl font-bold text-foreground',
        className
      )}
    >
      <div className="bg-primary text-primary-foreground p-2 rounded-md">
        <Bot className="h-6 w-6" />
      </div>
      <span>Talxify</span>
    </div>
  );
}
