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
  XCircle,
  FileQuestion,
  TrendingUp,
  TrendingDown,
  Mail,
  Trash2,
} from 'lucide-react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { cn } from '@/lib/utils';
import { useAuth } from '@/hooks/useAuth';
import { useCollection } from '@/firebase/hooks';
import { collection, query, getDoc, doc, deleteDoc } from 'firebase/firestore';
import { db } from '@/firebase/firebaseClient';
import React from 'react';
import { List } from '@/types';
import { Skeleton } from '@/components/ui/skeleton';
import * as XLSX from 'xlsx';
import { useToast } from '@/hooks/use-toast';

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
    <div className={cn('relative h-2 w-full overflow-hidden rounded-full bg-muted', className)}>
      <div className="flex h-full">
        {values.map((item, index) => (
          <div
            key={index}
            className={`h-full ${item.color}`}
            style={{
              width: `${(item.value / total) * 100}%`,
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default function ListsPage() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [downloadingId, setDownloadingId] = React.useState<string | null>(null);
  const [deletingId, setDeletingId] = React.useState<string | null>(null);

  const listsQuery = React.useMemo(() => {
    if (!user) return null;
    return query(collection(db, `users/${user.uid}/lists`));
  }, [user]);

  const { data: lists, loading } = useCollection<List>(listsQuery);
  
  const aggregatedStats = React.useMemo(() => {
    if (!lists) {
      return {
        totalValidated: 0,
        validEmails: 0,
        riskyEmails: 0,
        cleanedEmails: 0,
      };
    }

    return lists.reduce(
      (acc, list) => {
        if (list.status === 'Completed') {
          if (list.name.startsWith('Cleaned -')) {
            acc.cleanedEmails += list.emailCount;
          } else {
            acc.totalValidated += list.emailCount;
            acc.validEmails += list.good;
            acc.riskyEmails += list.risky;
          }
        }
        return acc;
      },
      {
        totalValidated: 0,
        validEmails: 0,
        riskyEmails: 0,
        cleanedEmails: 0,
      }
    );
  }, [lists]);

  const stats = [
    {
      title: 'Total Validated',
      value: aggregatedStats.totalValidated.toLocaleString(),
      icon: MailCheck,
      description: 'Total emails processed across all lists.',
      color: 'text-blue-500',
    },
    {
      title: 'Valid Emails',
      value: aggregatedStats.validEmails.toLocaleString(),
      icon: CheckCircle,
      description: 'Deliverable and safe-to-send emails.',
      color: 'text-green-500',
    },
    {
      title: 'Risky Emails',
      value: aggregatedStats.riskyEmails.toLocaleString(),
      icon: AlertTriangle,
      description: 'Catch-all or unknown status emails.',
      color: 'text-yellow-500',
    },
    {
      title: 'Cleaned Emails',
      value: aggregatedStats.cleanedEmails.toLocaleString(),
      icon: Sparkles,
      description: 'Duplicates and invalid formats removed.',
      color: 'text-indigo-500',
    },
  ]

  const handleDownload = async (list: List) => {
    if (!list.id || !user) return;
    setDownloadingId(list.id);

    try {
        const listDocRef = doc(db, `users/${user.uid}/lists`, list.id);
        const listDoc = await getDoc(listDocRef);

        if (listDoc.exists()) {
            const listData = listDoc.data() as List;
            if (!listData.data) {
                throw new Error("Full list data is not available for download. It might still be processing or was created with a previous version.");
            }
            
            const ws = XLSX.utils.json_to_sheet(listData.data);
            const wb = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(wb, ws, "Validated List");

            const fileName = `${list.name.replace(/[^a-z0-9_]/gi, '-')}.csv`;
            XLSX.writeFile(wb, fileName, { bookType: "csv" });

        } else {
            console.error("List document not found");
        }
    } catch (error: any) {
        console.error("Error downloading list:", error);
    } finally {
        setDownloadingId(null);
    }
  };

  const handleDelete = async (listId: string) => {
    if (!user || !listId) return;
    setDeletingId(listId);
    try {
      await deleteDoc(doc(db, `users/${user.uid}/lists`, listId));
      toast({
        title: 'List Deleted',
        description: 'The selected list has been permanently deleted.',
      });
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Error Deleting List',
        description: error.message || 'Could not delete the list.',
      });
    } finally {
      setDeletingId(null);
    }
  };

  const renderStatusBadge = (list: List) => {
      let icon, text, className;

      switch(list.status) {
          case 'Processing':
              icon = <Loader2 className="mr-1 h-3 w-3 animate-spin" />;
              text = `${list.progress}%`;
              className = 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300 border-blue-200 dark:border-blue-800'
              break;
          case 'Completed':
              icon = <CheckCircle className="mr-1 h-3 w-3" />;
              text = 'Completed';
              className = 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300 border-green-200 dark:border-green-800'
              break;
          case 'Failed':
              icon = <XCircle className="mr-1 h-3 w-3" />;
              text = 'Failed';
              className = 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300 border-red-200 dark:border-red-800'
              break;
          default:
              icon = <FileQuestion className="mr-1 h-3 w-3" />;
              text = 'Queued';
              className = 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-300 border-gray-200 dark:border-gray-800'
              break;
      }

      return (
          <Badge variant="outline" className={cn('font-mono', className)}>
              {icon}
              {text}
          </Badge>
      )
  }
  
  const ListStatsPopover = ({ list }: { list: List }) => {
    const isCleanedList = list.name.startsWith('Cleaned -');

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Info className="h-4 w-4 text-muted-foreground flex-shrink-0 cursor-pointer hover:text-foreground" />
            </PopoverTrigger>
            <PopoverContent className="w-64 text-sm">
                <div className="grid gap-4">
                    <div className="space-y-2">
                        <h4 className="font-medium leading-none">List Details</h4>
                        <p className="text-xs text-muted-foreground">
                            A quick overview of this list's results.
                        </p>
                    </div>
                     <div className="grid gap-2">
                        <div className="flex items-center justify-between">
                            <span className="flex items-center text-muted-foreground">
                                <Mail className="mr-2 h-4 w-4" />
                                Uploaded
                            </span>
                            <span>{list.emailCount.toLocaleString()}</span>
                        </div>
                         <div className="flex items-center justify-between">
                            <span className="flex items-center text-green-500">
                                <TrendingUp className="mr-2 h-4 w-4" />
                                Good
                            </span>
                            <span>{list.good.toLocaleString()}</span>
                        </div>
                        {isCleanedList ? (
                           <div className="flex items-center justify-between">
                               <span className="flex items-center text-indigo-500">
                                   <Sparkles className="mr-2 h-4 w-4" />
                                   Cleaned
                               </span>
                               <span>{list.emailCount.toLocaleString()}</span>
                           </div>
                        ) : (
                            <>
                                <div className="flex items-center justify-between">
                                    <span className="flex items-center text-yellow-500">
                                        <AlertTriangle className="mr-2 h-4 w-4" />
                                        Risky
                                    </span>
                                    <span>{list.risky.toLocaleString()}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="flex items-center text-red-500">
                                        <TrendingDown className="mr-2 h-4 w-4" />
                                        Bad
                                    </span>
                                    <span>{list.bad.toLocaleString()}</span>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </PopoverContent>
        </Popover>
    );
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
                  <div className="text-2xl font-bold">{loading ? <Skeleton className='h-8 w-24' /> : stat.value}</div>
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
           <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {Array(4).fill(0).map((_, index) => (
                 <Card key={index}>
                    <CardHeader>
                      <Skeleton className="h-5 w-3/4 rounded-md" />
                      <Skeleton className="h-3 w-1/2 rounded-md" />
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <Skeleton className="h-2 w-full rounded-full" />
                      <div className="flex items-center justify-between">
                        <Skeleton className="h-6 w-20 rounded-md" />
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
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {lists && lists.map((list) => (
              <Card key={list.id} className="flex flex-col">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="truncate text-lg font-medium pr-2">
                      {list.name}
                    </CardTitle>
                    <ListStatsPopover list={list} />
                  </div>
                  <CardDescription className="flex items-center gap-2 text-xs">
                    <Clock className="h-3 w-3" />
                    <span>{new Date(list.createdAt).toLocaleString()}</span>
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4 flex-1">
                  <ProgressMultiple
                    values={[
                      { value: list.good, color: 'bg-green-500' },
                      { value: list.risky, color: 'bg-yellow-500' },
                      { value: list.bad, color: 'bg-red-500' },
                    ]}
                  />
                  <div className="flex items-center justify-between text-sm">
                    {renderStatusBadge(list)}
                    <span className="text-muted-foreground">
                      {list.emailCount.toLocaleString()} Emails
                    </span>
                  </div>
                </CardContent>
                <CardFooter className="flex items-center gap-2">
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => handleDownload(list)}
                    disabled={downloadingId === list.id || list.status !== 'Completed'}
                  >
                    {downloadingId === list.id ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                      <Download className="mr-2 h-4 w-4" />
                    )}
                    Download
                  </Button>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        variant="destructive"
                        size="icon"
                        disabled={deletingId === list.id}
                      >
                         {deletingId === list.id ? (
                           <Loader2 className="h-4 w-4 animate-spin" />
                         ) : (
                          <Trash2 className="h-4 w-4" />
                         )}
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone. This will permanently delete the list "{list.name}" from our servers.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => handleDelete(list.id!)}
                          className={buttonVariants({ variant: 'destructive' })}
                        >
                          Yes, delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </CardFooter>
              </Card>
            ))}

            {Array(Math.max(0, 8 - (lists?.length || 0)))
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
}
