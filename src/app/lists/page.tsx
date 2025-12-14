
'use client';

export default function ListsPage() {
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
      <div className="grid gap-4 md:gap-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            My Lists
          </h1>
          <p className="text-muted-foreground">
            Manage your saved email lists.
          </p>
        </div>
      </div>
    </main>
  );
}
