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
import { Button, buttonVariants } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Search,
  Clock,
  Download,
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
  Trash2,
  MoreHorizontal,
} from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
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
import { Progress } from '@/components/ui/progress';

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
  ];

  const handleDownload = async (
    list: List,
    filter: 'Good' | 'Risky' | 'All'
  ) => {
    if (!list.id || !user) return;
    setDownloadingId(list.id);

    try {
      const listDocRef = doc(db, `users/${user.uid}/lists`, list.id);
      const listDoc = await getDoc(listDocRef);

      if (listDoc.exists()) {
        const listData = listDoc.data() as List;
        if (!listData.data) {
          throw new Error(
            'Full list data is not available for download. It might still be processing or was created with a previous version.'
          );
        }

        let dataToExport = listData.data;
        if (filter !== 'All') {
          dataToExport = listData.data.filter(
            (row) => row.Status === filter
          );
        }

        if (dataToExport.length === 0) {
          toast({
            variant: 'destructive',
            title: 'No Emails to Download',
            description: `There are no emails with the status "${filter}" in this list.`,
          });
          return;
        }

        const ws = XLSX.utils.json_to_sheet(dataToExport);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Validated List');

        const fileName = `${list.name.replace(
          /[^a-z0-9_]/gi,
          '-'
        )}_${filter}.csv`;
        XLSX.writeFile(wb, fileName, { bookType: 'csv' });
      } else {
        console.error('List document not found');
      }
    } catch (error: any) {
      console.error('Error downloading list:', error);
      toast({
        variant: 'destructive',
        title: 'Download Error',
        description: error.message || 'Could not download the list.',
      });
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

    switch (list.status) {
      case 'Processing':
        icon = <Loader2 className="mr-1 h-3 w-3 animate-spin" />;
        text = `Processing...`;
        className =
          'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300 border-blue-200 dark:border-blue-800';
        break;
      case 'Completed':
        icon = <CheckCircle className="mr-1 h-3 w-3" />;
        text = 'Completed';
        className =
          'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300 border-green-200 dark:border-green-800';
        break;
      case 'Failed':
        icon = <XCircle className="mr-1 h-3 w-3" />;
        text = 'Failed';
        className =
          'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300 border-red-200 dark:border-red-800';
        break;
      default:
        icon = <FileQuestion className="mr-1 h-3 w-3" />;
        text = 'Queued';
        className =
          'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-300 border-gray-200 dark:border-gray-800';
        break;
    }

    return (
      <div className="flex flex-col gap-2">
        <Badge variant="outline" className={cn('font-medium', className)}>
          {icon}
          {text}
        </Badge>
        {list.status === 'Processing' && (
          <Progress value={list.progress} className="h-1" />
        )}
      </div>
    );
  };

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
      <div className="grid gap-8">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <Card
              key={stat.title}
              className={cn(
                stat.title === 'Valid Emails' && 'bg-gray-900 text-white dark:bg-card dark:text-card-foreground'
              )}
            >
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.title}
                </CardTitle>
                <stat.icon
                  className={cn(
                    'h-4 w-4',
                    stat.title === 'Valid Emails'
                      ? 'text-green-500'
                      : 'text-muted-foreground',
                    stat.color
                  )}
                />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {loading ? (
                    <Skeleton className="h-8 w-24" />
                  ) : (
                    stat.value
                  )}
                </div>
                <p
                  className={cn(
                    'text-xs',
                    stat.title === 'Valid Emails'
                      ? 'text-gray-400'
                      : 'text-muted-foreground'
                  )}
                >
                  {stat.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="grid gap-2">
                <CardTitle className="text-2xl">Recent Lists</CardTitle>
                <CardDescription>
                  View, manage, and download your email validation lists.
                </CardDescription>
              </div>
              <div className="relative w-full max-w-sm">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search lists..." className="pl-9" />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>List Name</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Breakdown</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  Array(3)
                    .fill(0)
                    .map((_, index) => (
                      <TableRow key={index}>
                        <TableCell>
                          <Skeleton className="h-5 w-48 rounded-md" />
                        </TableCell>
                        <TableCell>
                          <Skeleton className="h-5 w-32 rounded-md" />
                        </TableCell>
                        <TableCell>
                          <Skeleton className="h-5 w-24 rounded-md" />
                        </TableCell>
                        <TableCell>
                          <Skeleton className="h-5 w-40 rounded-md" />
                        </TableCell>
                        <TableCell className="text-right">
                          <Skeleton className="h-8 w-8 rounded-md ml-auto" />
                        </TableCell>
                      </TableRow>
                    ))
                ) : lists && lists.length > 0 ? (
                  lists.map((list) => (
                    <TableRow key={list.id}>
                      <TableCell className="font-medium">
                        <div className="flex flex-col">
                          <span className="truncate max-w-xs">
                            {list.name}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            {list.emailCount.toLocaleString()} emails
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        {new Date(list.createdAt).toLocaleDateString()}
                      </TableCell>
                      <TableCell>{renderStatusBadge(list)}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-4 text-xs">
                          <div className="flex items-center gap-1.5 text-green-600">
                            <CheckCircle className="h-3 w-3" />
                            <span>{list.good.toLocaleString()}</span>
                          </div>
                          <div className="flex items-center gap-1.5 text-yellow-600">
                            <AlertTriangle className="h-3 w-3" />
                            <span>{list.risky.toLocaleString()}</span>
                          </div>
                          <div className="flex items-center gap-1.5 text-red-600">
                            <XCircle className="h-3 w-3" />
                            <span>{list.bad.toLocaleString()}</span>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              disabled={downloadingId === list.id || deletingId === list.id}
                            >
                              {downloadingId === list.id || deletingId === list.id ? (
                                <Loader2 className="h-4 w-4 animate-spin" />
                              ) : (
                                <MoreHorizontal className="h-4 w-4" />
                              )}
                              <span className="sr-only">Actions</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem
                              disabled={list.status !== 'Completed'}
                              onClick={() => handleDownload(list, 'Good')}
                            >
                              <TrendingUp className="mr-2 h-4 w-4" />
                              Download Good
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              disabled={list.status !== 'Completed'}
                              onClick={() => handleDownload(list, 'Risky')}
                            >
                              <AlertTriangle className="mr-2 h-4 w-4" />
                              Download Risky
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              disabled={list.status !== 'Completed'}
                              onClick={() => handleDownload(list, 'All')}
                            >
                              <Download className="mr-2 h-4 w-4" />
                              Download All
                            </DropdownMenuItem>
                            {/* <DropdownMenuSeparator />
                             <AlertDialog>
                                <AlertDialogTrigger asChild>
                                  <Button variant="ghost" className="w-full justify-start text-red-500 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 px-2 py-1.5 text-sm h-auto font-normal relative flex cursor-default select-none items-center rounded-sm outline-none transition-colors data-[disabled]:pointer-events-none data-[disabled]:opacity-50">
                                    <Trash2 className="mr-2 h-4 w-4" />
                                    Delete List
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
                              </AlertDialog> */}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} className="h-24 text-center">
                      No lists found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
          <CardFooter>
             <div className="flex w-full items-center justify-between text-sm text-muted-foreground">
                <p>Showing 1 to {lists?.length || 0} of {lists?.length || 0} results</p>
                <div className="flex items-center gap-2">
                    <Button variant="outline" size="icon" className="h-8 w-8" disabled>
                    <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <span>Page 1 of 1</span>
                    <Button variant="outline" size="icon" className="h-8 w-8" disabled>
                    <ChevronRight className="h-4 w-4" />
                    </Button>
                </div>
            </div>
          </CardFooter>
        </Card>
      </div>
    </main>
  );
}
