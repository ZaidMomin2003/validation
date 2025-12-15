'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Search,
  Clock,
  Info,
  Download,
  Lock,
  ChevronLeft,
  ChevronRight,
  MailCheck,
  CheckCircle,
  AlertTriangle,
  Sparkles,
  Loader2,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/hooks/useAuth';
import { useCollection } from '@/firebase/hooks';
import { collection, query, getDoc, doc } from 'firebase/firestore';
import { db } from '@/firebase/firebaseClient';
import React from 'react';
import { List } from '@/types';
import { Skeleton } from '@/components/ui/skeleton';
import * as XLSX from 'xlsx';

const stats = [
  {
    title: 'Total Validated',
    value: '12,435',
    icon: MailCheck,
    description: 'Total emails processed across all lists.',
    color: 'text-blue-500',
  },
  {
    title: 'Valid Emails',
    value: '11,890',
    icon: CheckCircle,
    description: 'Deliverable and safe-to-send emails.',
    color: 'text-green-500',
  },
  {
    title: 'Risky Emails',
    value: '545',
    icon: AlertTriangle,
    description: 'Catch-all or unknown status emails.',
    color: 'text-yellow-500',
  },
  {
    title: 'Cleaned Emails',
    value: '2,130',
    icon: Sparkles,
    description: 'Duplicates and invalid formats removed.',
    color: 'text-indigo-500',
  },
]

const ProgressMultiple = ({
  values,
  className,
}: {
  values: { value: number; color: string }[];
  className?: string;
}) => {
  const total = values.reduce((acc, curr) => acc + curr.value, 0);
  if (total === 0) return <div className={cn('h-2 w-full rounded-full bg-muted', className)}></div>;


  return (
    <div className={cn('h-2 w-full rounded-full bg-muted', className)}>
      <div className="flex h-full">
        {values.map((item, index) => (
          <div
            key={index}
            className={`h-full ${item.color}`}
            style={{
              width: `${(item.value / total) * 100}%`,
              borderTopLeftRadius: index === 0 ? '9999px' : '0',
              borderBottomLeftRadius: index === 0 ? '9999px' : '0',
              borderTopRightRadius:
                index === values.length - 1 ? '9999px' : '0',
              borderBottomRightRadius:
                index === values.length - 1 ? '9999px' : '0',
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default function ListsPage() {
  const { user } = useAuth();
  const [downloadingId, setDownloadingId] = React.useState<string | null>(null);

  const listsQuery = React.useMemo(() => {
    if (!user) return null;
    return query(collection(db, `users/${user.uid}/lists`));
  }, [user]);

  const { data: lists, loading } = useCollection<List>(listsQuery);

  const handleDownload = async (list: List) => {
    if (!list.id || !user) return;
    setDownloadingId(list.id);

    try {
        const listDocRef = doc(db, `users/${user.uid}/lists`, list.id);
        const listDoc = await getDoc(listDocRef);

        if (listDoc.exists()) {
            const listData = listDoc.data() as List;
            const dataToExport = listData.data || [];
            
            // Create a new workbook and a worksheet
            const ws = XLSX.utils.json_to_sheet(dataToExport);
            const wb = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(wb, ws, "Validated List");

            // Generate CSV file and trigger download
            const fileName = `${list.name.replace(/[^a-z0-9_]/gi, '-')}.csv`;
            XLSX.writeFile(wb, fileName, { bookType: "csv" });

        } else {
            console.error("List document not found");
        }
    } catch (error) {
        console.error("Error downloading list:", error);
    } finally {
        setDownloadingId(null);
    }
  };

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
      <div className="grid gap-8">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => (
              <Card key={stat.title}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    {stat.title}
                  </CardTitle>
                  <stat.icon className={cn("h-4 w-4 text-muted-foreground", stat.color)} />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <p className="text-xs text-muted-foreground">
                    {stat.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>


        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">Recent Lists</h1>
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search lists" className="pl-9" />
          </div>
        </div>

        {loading ? (
           <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {Array(4).fill(0).map((_, index) => (
                 <Card key={index}>
                    <CardHeader>
                      <Skeleton className="h-5 w-3/4 rounded-md" />
                      <Skeleton className="h-3 w-1/2 rounded-md" />
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <Skeleton className="h-2 w-full rounded-full" />
                      <div className="flex items-center justify-between">
                        <Skeleton className="h-6 w-12 rounded-full" />
                        <Skeleton className="h-4 w-20 rounded-md" />
                      </div>
                    </CardContent>
                    <CardFooter>
                       <Skeleton className="h-10 w-full rounded-md" />
                    </CardFooter>
                  </Card>
              ))}
           </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {lists && lists.map((list) => (
              <Card key={list.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="truncate text-lg font-medium">
                      {list.name}
                    </CardTitle>
                    <Info className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <CardDescription className="flex items-center gap-2 text-xs">
                    <Clock className="h-3 w-3" />
                    <span>{new Date(list.createdAt).toLocaleString()}</span>
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ProgressMultiple
                    values={[
                      { value: list.good, color: 'bg-green-500' },
                      { value: list.risky, color: 'bg-yellow-500' },
                      { value: list.bad, color: 'bg-red-500' },
                    ]}
                  />
                  <div className="flex items-center justify-between text-sm">
                    <Badge
                      variant="outline"
                      className={cn(
                        list.progress > 20
                          ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300 border-green-200 dark:border-green-800'
                          : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300 border-yellow-200 dark:border-yellow-800'
                      )}
                    >
                      {list.progress}%
                    </Badge>
                    <span className="text-muted-foreground">
                      {list.emailCount.toLocaleString()} Emails
                    </span>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => handleDownload(list)}
                    disabled={downloadingId === list.id}
                  >
                    {downloadingId === list.id ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                      <Download className="mr-2 h-4 w-4" />
                    )}
                    {downloadingId === list.id ? 'Preparing...' : 'Download'}
                  </Button>
                </CardFooter>
              </Card>
            ))}

            {Array(8 - (lists?.length || 0))
              .fill(0)
              .map((_, index) => (
                <Card
                  key={`locked-${index}`}
                  className="relative flex flex-col items-center justify-center bg-muted/50"
                >
                  <div className="absolute right-4 top-4">
                    <Lock className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <div className="w-full p-6 space-y-4 animate-pulse">
                    <div className="h-5 w-3/4 rounded-md bg-muted-foreground/20" />
                    <div className="h-3 w-1/2 rounded-md bg-muted-foreground/20" />
                    <div className="h-2 w-full rounded-full bg-muted-foreground/20 mt-4" />
                    <div className="flex justify-between items-center">
                      <div className="h-6 w-12 rounded-full bg-muted-foreground/20" />
                      <div className="h-4 w-20 rounded-md bg-muted-foreground/20" />
                    </div>
                    <div className="h-10 w-full rounded-md bg-muted-foreground/20 mt-4" />
                  </div>
                </Card>
              ))}
          </div>
        )}

        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <p>Showing 1 to {lists?.length || 0} of {lists?.length || 0} results</p>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" className="h-8 w-8" disabled>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" className="h-8 w-8" disabled>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span>Page 1 of 1</span>
            <Button variant="outline" size="icon" className="h-8 w-8" disabled>
              <ChevronRight className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" className="h-8 w-8" disabled>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </main>
  );

    