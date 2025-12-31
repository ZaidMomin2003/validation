
'use client';

import React, { useEffect, useState } from 'react';
import { FileUp, Download, CheckCircle, Info, Loader2, Settings, Columns, Milestone, CreditCard } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { FileUpload } from "@/components/ui/file-upload";
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Button, buttonVariants } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useToast } from '@/hooks/use-toast';
import * as XLSX from 'xlsx';
import { cn } from '@/lib/utils';
import { useAuth } from '@/hooks/useAuth';
import { addDoc, collection, doc, updateDoc } from 'firebase/firestore';
import { useFirestore } from '@/firebase/provider';
import { useRouter } from 'next/navigation';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { validate } from '@/lib/email-validator';
import type { List } from '@/types';
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
import Link from 'next/link';
import { useCollection } from '@/firebase/hooks';
import { query } from 'firebase/firestore';
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError } from '@/firebase/errors';


const PREVIEW_ROW_COUNT = 8;
const PREVIEW_COLUMN_COUNT = 4;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

interface TableData {
    headers: string[];
    rows: any[][];
    fileName: string;
}

interface CleanedData {
    headers: string[];
    rows: any[][];
}

export default function BulkValidatePage() {
    const { user } = useAuth();
    const db = useFirestore();
    const router = useRouter();
    const [files, setFiles] = React.useState<File[]>([]);
    const [tableData, setTableData] = React.useState<TableData | null>(null);
    const [cleanedData, setCleanedData] = React.useState<CleanedData | null>(null);

    const [emailColumn, setEmailColumn] = React.useState<string | null>(null);
    const [delimiter, setDelimiter] = React.useState<string>(',');
    
    const [isLoading, setIsLoading] = React.useState(false);
    const [isProcessing, setIsProcessing] = React.useState(false);
    const [activeTab, setActiveTab] = React.useState('clean');
    const { toast } = useToast();

    const listsQuery = React.useMemo(() => {
        if (!user || !db) return null;
        return query(collection(db, `users/${user.uid}/lists`));
    }, [user, db]);

    const { data: lists } = useCollection<List>(listsQuery);

    const usedCredits = React.useMemo(() => {
        if (!lists) return 0;
        return lists.reduce((acc, list) => {
            if (list.status === 'Completed' && !list.name.startsWith('Cleaned -')) {
                return acc + (list.emailCount || 0);
            }
            return acc;
        }, 0);
    }, [lists]);
    
    const totalCredits = user?.creditsTotal ?? 0;
    const creditsLeft = totalCredits - usedCredits;


    useEffect(() => {
        const validationDataString = sessionStorage.getItem('validationData');
        if (validationDataString) {
            try {
                const { emails, fileName } = JSON.parse(validationDataString);
                
                // Create a CSV string
                const csvContent = "Email\n" + emails.join("\n");
                const blob = new Blob([csvContent], { type: 'text/csv' });
                const file = new File([blob], fileName, { type: 'text/csv' });

                // Process this file
                processFile(file, 'validate');
                
            } catch (e) {
                console.error("Failed to parse validation data from sessionStorage", e);
            } finally {
                 // Clean up sessionStorage
                sessionStorage.removeItem('validationData');
            }
        }
    }, []);

    const processFile = (file: File, defaultTab: 'clean' | 'validate' = 'clean') => {
        setIsLoading(true);
        setActiveTab(defaultTab);
        const reader = new FileReader();

        reader.onload = (e) => {
            try {
                const data = e.target?.result;
                const workbook = XLSX.read(data, { type: 'binary' });
                const sheetName = workbook.SheetNames[0];
                const worksheet = workbook.Sheets[sheetName];
                const json: any[][] = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

                if (json.length === 0) {
                    throw new Error("The file is empty.");
                }

                const headers = json[0].map(header => header ? String(header) : '');
                const rows = json.slice(1).map(row => 
                    headers.map((_, index) => row[index] ?? '')
                );
                
                const fullTableData = { headers, rows, fileName: file.name };
                setTableData(fullTableData);
                
                let bestCandidate = -1;
                let maxEmailCount = 0;
                
                headers.forEach((h, colIndex) => {
                    let emailCount = 0;
                    for(let i = 0; i < rows.length; i++) {
                        if (rows[i] && String(rows[i][colIndex]).includes('@')) {
                            emailCount++;
                        }
                    }
                    if (emailCount > maxEmailCount) {
                        maxEmailCount = emailCount;
                        bestCandidate = colIndex;
                    }
                });
                setEmailColumn(bestCandidate !== -1 ? headers[bestCandidate] : (headers.length > 0 ? headers[0] : null));

            } catch (error) {
                console.error("File processing error:", error);
                toast({
                    variant: 'destructive',
                    title: 'Error processing file',
                    description: error instanceof Error ? error.message : 'Could not read the uploaded file.',
                });
                handleReset();
            } finally {
                setIsLoading(false);
            }
        };

        reader.onerror = () => {
            toast({
                variant: 'destructive',
                title: 'Error reading file',
                description: 'Something went wrong while trying to read your file.',
            });
            handleReset();
        };

        reader.readAsArrayBuffer(file);
    };

    const handleFileUpload = (uploadedFiles: File[]) => {
        setFiles(uploadedFiles);
        if (uploadedFiles.length > 0) {
            processFile(uploadedFiles[0], activeTab as 'clean' | 'validate');
        }
    };

    const handleReset = () => {
        setFiles([]);
        setTableData(null);
        setCleanedData(null);
        setEmailColumn(null);
        setDelimiter(',');
        setIsLoading(false);
        setIsProcessing(false);
    };

    const handleCleanAction = () => {
        if (!tableData || emailColumn === null) return;
        
        const columnIndex = tableData.headers.indexOf(emailColumn);
        if (columnIndex === -1) return;

        const finalDelimiter = delimiter.replace(/\\n/g, '\n').replace(/\\t/g, '\t');

        const newRows: any[][] = [];
        const originalHeaders = tableData.headers.filter(h => h !== emailColumn);
        const newHeaders = [...originalHeaders, 'Email'];

        tableData.rows.forEach(originalRow => {
            const emailCell = originalRow[columnIndex];
            const otherData = originalRow.filter((_, i) => i !== columnIndex);

            if(typeof emailCell === 'string' && emailCell) {
                const emails = emailCell.split(finalDelimiter).map(e => e.trim()).filter(e => e && e.includes('@'));
                emails.forEach(email => {
                    newRows.push([...otherData, email]);
                });
            }
        });
        
        setCleanedData({ headers: newHeaders, rows: newRows });
    }

    const convertDataToObjects = (data: { headers: string[], rows: any[][] }) => {
        return data.rows.map(row => {
            const obj: Record<string, any> = {};
            data.headers.forEach((header, index) => {
                obj[header] = row[index];
            });
            return obj;
        });
    };

    const handleDownloadCleaned = () => {
        if (!cleanedData) return;
        const dataObjects = convertDataToObjects(cleanedData);
        const ws = XLSX.utils.json_to_sheet(dataObjects);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Cleaned Data");
        XLSX.writeFile(wb, `Cleaned-${tableData?.fileName || 'data'}.csv`, { bookType: 'csv' });
    };
    
    const handleSaveCleanedList = async () => {
        if (!user || !cleanedData || !tableData || !db) return;
        
        setIsProcessing(true);

        const listsCollection = collection(db, `users/${user.uid}/lists`);
        const listData: List = {
            name: `Cleaned - ${tableData.fileName}`,
            createdAt: Date.now(),
            progress: 100, 
            emailCount: cleanedData.rows.length,
            good: cleanedData.rows.length,
            risky: 0,
            bad: 0,
            userId: user.uid,
            data: convertDataToObjects(cleanedData),
            status: 'Completed'
        };

        addDoc(listsCollection, listData)
            .then(() => {
                toast({
                    title: 'List cleaned and saved!',
                    description: `${listData.name} has been added to your lists.`,
                });
                router.push('/lists');
            })
            .catch((serverError) => {
                 const permissionError = new FirestorePermissionError({
                    path: listsCollection.path,
                    operation: 'create',
                    requestResourceData: listData,
                });
                errorEmitter.emit('permission-error', permissionError);
            })
            .finally(() => {
                setIsProcessing(false);
            });
    };
    
    const handleValidateAction = async (bypassCreditCheck = false) => {
        if (!user || !tableData || !emailColumn || !db) return;

        const isFreePlan = user.plan === 'Free';
        const emailsToProcess = tableData.rows;
        let finalEmails = emailsToProcess;

        if (isFreePlan && !bypassCreditCheck && emailsToProcess.length > creditsLeft) {
            document.getElementById('credit-limit-trigger')?.click();
            return;
        }

        if (isFreePlan && emailsToProcess.length > creditsLeft) {
            finalEmails = emailsToProcess.slice(0, creditsLeft);
        }
    
        setIsProcessing(true);
        toast({
            title: 'Starting Validation...',
            description: 'Your list is being prepared for validation. You can track progress on the Lists page.',
        });

        const dataToProcess = { ...tableData, rows: finalEmails };

        const dataObjects = convertDataToObjects(dataToProcess);
        
        const listsCollection = collection(db, `users/${user.uid}/lists`);
        const listData: Partial<List> = {
            name: tableData.fileName,
            createdAt: Date.now(),
            progress: 0,
            emailCount: dataToProcess.rows.length,
            good: 0, risky: 0, bad: 0,
            userId: user.uid,
            status: 'Processing'
        };

        addDoc(listsCollection, listData)
            .then((docRef) => {
                router.push('/lists');
        
                validate(dataObjects, emailColumn, async ({ good, risky, bad, total, data }) => {
                    const progress = Math.round(((good + risky + bad) / total) * 100);
                    const isCompleted = progress === 100;
                    
                    const updateData: Partial<List> = { good, risky, bad, progress };

                    if (isCompleted) {
                        updateData.data = data;
                        updateData.status = 'Completed';
                    }
                    
                    await updateDoc(doc(db, `users/${user.uid}/lists`, docRef.id), updateData);
                }).catch(async (error) => {
                    console.error("Validation process failed:", error);
                    await updateDoc(doc(db, `users/${user.uid}/lists`, docRef.id), {
                        status: 'Failed',
                        progress: 100
                    });
                });
            })
            .catch((serverError) => {
                const permissionError = new FirestorePermissionError({
                    path: listsCollection.path,
                    operation: 'create',
                    requestResourceData: listData,
                });
                errorEmitter.emit('permission-error', permissionError);
                setIsProcessing(false);
            });
    };

    const renderTablePreview = (data: {headers: string[], rows: any[][]}, selectedColumn: string | null) => {
        if (!data) return null;

        const displayHeaders: string[] = [];
        const columnMap: number[] = [];
        const selectedColIndex = selectedColumn ? data.headers.indexOf(selectedColumn) : -1;

        if (selectedColIndex !== -1) {
            displayHeaders.push(data.headers[selectedColIndex]);
            columnMap.push(selectedColIndex);
        }

        for (let i = 0; i < data.headers.length && displayHeaders.length < PREVIEW_COLUMN_COUNT; i++) {
            if (i !== selectedColIndex) {
                displayHeaders.push(data.headers[i]);
                columnMap.push(i);
            }
        }

        const displayRows = data.rows.slice(0, PREVIEW_ROW_COUNT).map(row => {
            return columnMap.map(colIndex => row[colIndex]);
        });

        return (
             <div className="relative max-h-[400px] overflow-auto rounded-md border">
                <Table>
                    <TableHeader>
                        <TableRow>
                            {displayHeaders.map((header, index) => (
                                <TableHead key={index} className={cn("sticky top-0 bg-background z-10", columnMap[index] === selectedColIndex && "bg-muted")}>
                                    <div className="flex items-center gap-1">
                                        {header}
                                        {columnMap[index] === selectedColIndex && <CheckCircle className="h-4 w-4 text-primary" />}
                                    </div>
                                </TableHead>
                            ))}
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {displayRows.map((row, rowIndex) => (
                            <TableRow key={rowIndex}>
                                {row.map((cell, cellIndex) => (
                                    <TableCell 
                                        key={cellIndex} 
                                        className={cn("max-w-xs truncate", columnMap[cellIndex] === selectedColIndex && "bg-muted")}
                                        title={String(cell)}
                                    >
                                        {String(cell)}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        )
    }

    const renderCleanFlow = () => {
        if (!tableData) return null;

        return (
            <Card>
                {cleanedData ? (
                    <>
                        <CardHeader>
                            <CardTitle className="text-2xl">Cleaned Data Preview</CardTitle>
                            <CardDescription>Your data has been unpivoted. Here is a preview of the cleaned result.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                           {renderTablePreview(cleanedData, 'Email')}
                           <p className="text-sm text-muted-foreground">Found {cleanedData.rows.length.toLocaleString()} total emails.</p>
                        </CardContent>
                        <CardFooter className="flex flex-wrap items-center justify-end gap-2">
                             <Button variant="outline" onClick={() => setCleanedData(null)}>Back</Button>
                             <Button variant="outline" onClick={handleDownloadCleaned}>
                                <Download className="mr-2 h-4 w-4" />
                                Download CSV
                             </Button>
                             <Button variant="outline" disabled>Validate</Button>
                             <Button onClick={handleSaveCleanedList} disabled={isProcessing}>
                                {isProcessing && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                Save Cleaned List
                            </Button>
                        </CardFooter>
                    </>
                ) : (
                    <>
                        <CardHeader>
                            <CardTitle className="text-2xl">Configure Cleaning</CardTitle>
                            <CardDescription>Select the column with multiple emails and specify the delimiter used.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            {renderTablePreview(tableData, emailColumn)}
                            <div className="grid md:grid-cols-2 gap-4 pt-4">
                                <div className="space-y-2">
                                    <Label htmlFor="email-column-select">Column with emails</Label>
                                    <Select value={emailColumn || ''} onValueChange={setEmailColumn}>
                                        <SelectTrigger id="email-column-select">
                                            <SelectValue placeholder="Select column..." />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {tableData.headers.map(h => <SelectItem key={h} value={h}>{h}</SelectItem>)}
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="delimiter-input">Delimiter</Label>
                                    <Input id="delimiter-input" value={delimiter} onChange={(e) => setDelimiter(e.target.value)} placeholder="e.g., , or ;" />
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter className="flex items-center justify-end gap-2">
                            <Button variant="outline" onClick={handleReset}>Reset</Button>
                            <Button onClick={handleCleanAction}>
                                <Settings className="mr-2 h-4 w-4" />
                                Prepare Data
                            </Button>
                        </CardFooter>
                    </>
                )}
            </Card>
        )
    }

    const renderValidateFlow = () => {
        if (!tableData) return null;

        return (
             <Card>
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <CardTitle className="text-2xl">Select Email Column</CardTitle>
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Button variant="ghost" size="icon">
                                        <Info className="h-5 w-5 text-muted-foreground" />
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent side="left" className="max-w-xs">
                                    <p>Validation is a background process. You can track progress on the 'Lists' page. We will only verify the first 1000 emails from your list. Upgrade to Pro for more.</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    </div>
                     <CardDescription>Select the column containing email addresses. We've highlighted our best guess.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="email-column-select-validate">Email Column</Label>
                         <Select value={emailColumn || ''} onValueChange={setEmailColumn}>
                            <SelectTrigger id="email-column-select-validate">
                                <SelectValue placeholder="Select column..." />
                            </SelectTrigger>
                            <SelectContent>
                                {tableData.headers.map(h => <SelectItem key={h} value={h}>{h}</SelectItem>)}
                            </SelectContent>
                        </Select>
                    </div>
    
                    {renderTablePreview(tableData, emailColumn)}
    
                </CardContent>
                <CardFooter className="flex items-center justify-end gap-2">
                    <Button variant="outline" onClick={handleReset}>Reset</Button>
                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <Button id="credit-limit-trigger" className="hidden">Hidden Trigger</Button>
                        </AlertDialogTrigger>
                        <Button onClick={() => handleValidateAction(false)} disabled={isProcessing}>
                            {isProcessing && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Start Validation
                        </Button>
                        <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Credit Limit Reached</AlertDialogTitle>
                            <AlertDialogDescription>
                                Your list of {tableData.rows.length} emails exceeds your remaining {creditsLeft} credits. We will only validate the first {creditsLeft} emails.
                                <br /><br />
                                Upgrade your plan to validate the entire list and get more credits.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                                onClick={() => router.push('/pricing')}
                                className={buttonVariants({ variant: 'default' })}
                            >
                                <CreditCard className="mr-2 h-4 w-4" />
                                Upgrade Plan
                            </AlertDialogAction>
                            <AlertDialogAction onClick={() => handleValidateAction(true)}>
                                Proceed with {creditsLeft}
                            </AlertDialogAction>
                        </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </CardFooter>
            </Card>
        )
    }

    const renderFileUpload = () => {
        return (
            <>
                <Tabs defaultValue="clean" onValueChange={setActiveTab} value={activeTab}>
                    <div className="flex justify-start">
                        <TabsList>
                            <TabsTrigger value="clean">
                                <Columns className="mr-2 h-4 w-4" />
                                Clean List
                            </TabsTrigger>
                            <TabsTrigger value="validate">
                                <CheckCircle className="mr-2 h-4 w-4" />
                                Validate List
                            </TabsTrigger>
                        </TabsList>
                    </div>
                    <TabsContent value="clean">
                        <Card>
                            <CardContent className="w-full max-w-4xl mx-auto p-0">
                                <FileUpload onChange={handleFileUpload} accept=".csv, .xlsx" />
                            </CardContent>
                        </Card>
                    </TabsContent>
                    <TabsContent value="validate">
                        <Card>
                            <CardContent className="w-full max-w-4xl mx-auto p-0">
                                <FileUpload onChange={handleFileUpload} accept=".csv, .xlsx" />
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
                <div className="grid gap-4 mt-8">
                    <h2 className="text-2xl font-bold">How it works</h2>
                    <div className="grid gap-4 md:grid-cols-3">
                        <Card>
                            <CardHeader>
                                <div className="flex items-center gap-4">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                                        <FileUp className="h-6 w-6 text-primary" />
                                    </div>
                                    <CardTitle>1. Upload File</CardTitle>
                                </div>
                            </CardHeader>
                            <CardContent>
                            <p className="text-muted-foreground">
                            Upload a CSV or XLSX file containing the email addresses you want to process.
                            </p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader>
                                <div className="flex items-center gap-4">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                                        <Milestone className="h-6 w-6 text-primary" />
                                    </div>
                                    <CardTitle>2. Choose Action</CardTitle>
                                </div>
                            </CardHeader>
                            <CardContent>
                            <p className="text-muted-foreground">
                                Choose to clean a messy list (multiple emails per cell) or validate a clean list.
                            </p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader>
                                <div className="flex items-center gap-4">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                                        <Download className="h-6 w-6 text-primary" />
                                    </div>
                                    <CardTitle>3. Download Results</CardTitle>
                                </div>
                            </CardHeader>
                            <CardContent>
                            <p className="text-muted-foreground">
                                Once processing is complete, go to the 'Lists' page to download your detailed report.
                            </p>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </>
        )
    };
    
    const renderContent = () => {
        if (isLoading) {
            return (
                <Card className="flex items-center justify-center p-20">
                    <div className="flex flex-col items-center gap-4">
                        <Loader2 className="h-12 w-12 animate-spin text-primary" />
                        <p className="text-muted-foreground">Analyzing your file...</p>
                    </div>
                </Card>
            );
        }

        if (tableData) {
            if (activeTab === 'clean') {
                return renderCleanFlow();
            }
            if (activeTab === 'validate') {
                return renderValidateFlow();
            }
        }
        
        if (user?.plan === 'Free' && creditsLeft <= 0) {
            return (
                <Card>
                    <CardHeader className="text-center">
                        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-destructive/10">
                            <CreditCard className="h-8 w-8 text-destructive" />
                        </div>
                        <CardTitle className="text-2xl mt-4">You've Used All Your Credits</CardTitle>
                        <CardDescription>
                            You have used all your free monthly credits. Please upgrade your plan to continue validating emails.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="flex flex-col items-center gap-4">
                        <Button asChild size="lg">
                            <Link href="/pricing">Upgrade Plan</Link>
                        </Button>
                        <p className="text-xs text-muted-foreground">Your credits will reset next month.</p>
                    </CardContent>
                </Card>
            );
        }

        return renderFileUpload();
    }

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
    <div className="grid gap-4 md:gap-8">
        {!tableData && !isLoading && (
             user?.plan !== 'Free' || creditsLeft > 0 ? (
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">
                        Clean or Validate Your Email Lists
                    </h1>
                    <p className="text-muted-foreground">
                        Upload a CSV or XLSX file to begin the process.
                    </p>
                </div>
            ) : null
        )}
        
        {renderContent()}
    </div>
  </main>
  );
}

    

    