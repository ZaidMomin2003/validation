
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { SearchX, Home, ArrowRight } from 'lucide-react';
import Logo from '@/components/logo';

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4 text-center">
      <div className="absolute top-8">
        <Link href="/">
          <Logo />
        </Link>
      </div>
      <div className="flex max-w-lg flex-col items-center">
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-primary/10">
          <SearchX className="h-10 w-10 text-primary" />
        </div>
        <p className="text-sm font-semibold uppercase tracking-wide text-primary">
          Error 404
        </p>
        <h1 className="mt-2 text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
          Oops! You've found a dead link.
        </h1>
        <p className="mt-4 text-base text-muted-foreground">
          It seems you've wandered into uncharted territory. The page you're looking for doesn't exist.
        </p>
        <div className="mt-8 border-t border-dashed w-1/2"></div>
        <div className="mt-8 rounded-lg bg-card p-6 text-left">
            <h3 className="font-semibold text-card-foreground">While you're here, why not clean your email list?</h3>
            <p className="mt-2 text-sm text-muted-foreground">
                Verilist helps you remove bad emails, reduce bounces, and improve your sender reputation. Get started for free.
            </p>
        </div>
        <div className="mt-10 flex items-center justify-center gap-x-4">
          <Button asChild>
            <Link href="/">
              <Home className="mr-2 h-4 w-4" />
              Go back home
            </Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/auth">
              <span>Sign Up Free</span>
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
