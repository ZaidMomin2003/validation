'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Progress } from '@/components/ui/progress';
import { Hourglass } from 'lucide-react';
import { Card } from '../ui/card';

export function TrialStatus() {
  const { user } = useAuth();
  const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 0 });
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (user?.plan !== 'Free' || !user.trialEndsAt) return;

    const interval = setInterval(() => {
      const now = Date.now();
      const endTime = user.trialEndsAt!;
      
      if (now >= endTime) {
        setTimeLeft({ hours: 0, minutes: 0 });
        setProgress(100);
        clearInterval(interval);
        return;
      }

      const totalDuration = 24 * 60 * 60 * 1000;
      const elapsedTime = totalDuration - (endTime - now);
      
      const remainingMs = endTime - now;
      const hours = Math.floor(remainingMs / (1000 * 60 * 60));
      const minutes = Math.floor((remainingMs % (1000 * 60 * 60)) / (1000 * 60));

      setTimeLeft({ hours, minutes });
      setProgress((elapsedTime / totalDuration) * 100);
    }, 1000);

    return () => clearInterval(interval);
  }, [user]);

  if (user?.plan !== 'Free' || !user.trialEndsAt || Date.now() > user.trialEndsAt) {
    return null;
  }

  return (
    <Card className="m-2 bg-muted/50 border-border/50 p-3">
        <div className="flex items-center gap-2 text-xs font-semibold">
            <Hourglass className="h-4 w-4 text-primary" />
            <span>Free Trial Ends In:</span>
        </div>
        <p className="text-center font-bold my-1 text-sm">{`${timeLeft.hours}h ${timeLeft.minutes}m`}</p>
        <Progress value={progress} className="h-1.5" />
    </Card>
  );
}
