
'use client';

import React from 'react';
import { SidebarTrigger } from '@/components/ui/sidebar';

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <main className="flex flex-1 flex-col gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
        <div className="flex items-center gap-4 pt-4">
          <SidebarTrigger className="md:hidden" />
          <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0 md:text-3xl">
            Dashboard
          </h1>
        </div>
        {/* Page content goes here */}
      </main>
    </div>
  );
}
