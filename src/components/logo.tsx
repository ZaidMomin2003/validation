import { cn } from '@/lib/utils';

export default function Logo({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        'inline-block font-bold text-foreground',
        className
      )}
    >
      <div className="text-xl">
        Talxify
        <div className="h-0.5 bg-gradient-to-r from-purple-400 to-orange-400"></div>
      </div>
    </div>
  );
}
