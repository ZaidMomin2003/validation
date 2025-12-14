
'use client';

import React from 'react';
import { FileUp, MousePointerClick, Download, CheckCircle, Info, Loader2 } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FileUpload } from "@/components/ui/file-upload";
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useToast } from '@/hooks/use-toast';
import * as XLSX from 'xlsx';

const PREVIEW_ROW_COUNT = 8;
const PREVIEW_COLUMN_COUNT = 4;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

interface TableData {
    headers: string[];
    rows: string[][];
}

export default function BulkValidatePage() {
    const [files, setFiles] = React.useState<File[]>([]);
    const [tableData, setTableData] = React.useState<TableData | null>(null);
    const [emailColumnIndex, setEmailColumnIndex] = React.useState<number | null>(null);
    const [isLoading, setIsLoading] = React.useState(false);
    const { toast } = useToast();

    const processFile = (file: File) => {
        setIsLoading(true);
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
                const rows = json.slice(1, PREVIEW_ROW_COUNT + 1).map(row => 
                    headers.map((_, index) => row[index] ? String(row[index]) : '')
                );
                
                setTableData({ headers, rows });

                let bestCandidate = -1;
                let maxEmailCount = 0;
                
                headers.forEach((_, colIndex) => {
                    let emailCount = 0;
                    for(let i = 1; i < json.length; i++) {
                        if (json[i] && EMAIL_REGEX.test(String(json[i][colIndex]))) {
                            emailCount++;
                        }
                    }
                    if (emailCount > maxEmailCount) {
                        maxEmailCount = emailCount;
                        bestCandidate = colIndex;
                    }
                });

                setEmailColumnIndex(bestCandidate);

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
            processFile(uploadedFiles[0]);
        }
    };

    const handleReset = () => {
        setFiles([]);
        setTableData(null);
        setEmailColumnIndex(null);
        setIsLoading(false);
    };

    const renderTable = () => (
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
                                <p>You can only validate up to 1000 emails at a time. We will only verify the first 1000 emails from your list. Upgrade to the Pro Plan for 10,000 emails / list.</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </div>
            </CardHeader>
            <CardContent>
                <div className="space-y-6">
                    <div>
                        <h3 className="font-semibold">Email Column</h3>
                        <p className="text-sm text-muted-foreground">Select the column containing email addresses. We've highlighted our best guess.</p>
                    </div>

                    <div className="relative max-h-[400px] overflow-auto">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    {tableData?.headers.slice(0, tableData.headers.length > PREVIEW_COLUMN_COUNT ? PREVIEW_COLUMN_COUNT : tableData.headers.length).map((header, index) => (
                                        <TableHead key={index} className={index === emailColumnIndex ? "bg-muted sticky top-0" : "sticky top-0 bg-background"}>
                                            <div className="flex items-center gap-1">
                                                {header}
                                                {index === emailColumnIndex && <CheckCircle className="h-4 w-4 text-primary" />}
                                            </div>
                                        </TableHead>
                                    ))}
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {tableData?.rows.map((row, rowIndex) => (
                                    <TableRow key={rowIndex}>
                                        {row.slice(0, tableData.headers.length > PREVIEW_COLUMN_COUNT ? PREVIEW_COLUMN_COUNT : tableData.headers.length).map((cell, cellIndex) => (
                                            <TableCell key={cellIndex} className={cellIndex === emailColumnIndex ? "bg-muted" : ""}>
                                                {cell}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>

                </div>
            </CardContent>
            <div className="border-t p-6 flex items-center justify-end">
                <div className="flex items-center gap-2">
                    <Button variant="outline" onClick={handleReset}>Reset</Button>
                    <Button>Validate</Button>
                </div>
            </div>
        </Card>
    );

    const renderFileUpload = () => (
        <>
            <Tabs defaultValue="clean">
                <div className="flex justify-start">
                    <TabsList>
                        <TabsTrigger value="clean">Clean</TabsTrigger>
                        <TabsTrigger value="validate">Validate</TabsTrigger>
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
                            <CardTitle>1. Upload your file</CardTitle>
                        </div>
                    </CardHeader>
                    <CardContent>
                    <p className="text-muted-foreground">
                        Drag and drop or select a CSV/XLSX file containing the email
                        addresses you want to verify.
                    </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <div className="flex items-center gap-4">
                            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                                <MousePointerClick className="h-6 w-6 text-primary" />
                            </div>
                            <CardTitle>2. Select check type</CardTitle>
                        </div>
                    </CardHeader>
                    <CardContent>
                    <p className="text-muted-foreground">
                        Choose the verification mode that best suits your needs: Easy,
                        Targeted, or Ultra-Targeted.
                    </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <div className="flex items-center gap-4">
                            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                                <Download className="h-6 w-6 text-primary" />
                            </div>
                            <CardTitle>3. Download results</CardTitle>
                        </div>
                    </CardHeader>
                    <CardContent>
                    <p className="text-muted-foreground">
                        Once the verification is complete, you can download a detailed
                        report with the status of each email.
                    </p>
                    </CardContent>
                </Card>
                </div>
            </div>
        </>
    );
    
    const renderLoading = () => (
        <Card className="flex items-center justify-center p-20">
            <div className="flex flex-col items-center gap-4">
                <Loader2 className="h-12 w-12 animate-spin text-primary" />
                <p className="text-muted-foreground">Analyzing your file...</p>
            </div>
        </Card>
    );

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
    <div className="grid gap-4 md:gap-8">
        {!tableData && !isLoading && (
            <div>
                <h1 className="text-3xl font-bold tracking-tight">
                    Verify Emails by Uploading a File
                </h1>
                <p className="text-muted-foreground">
                    Upload a CSV or XLSX file to start the email verification process.
                </p>
            </div>
        )}
        
        {isLoading ? renderLoading() : (tableData ? renderTable() : renderFileUpload())}
    </div>
  </main>
  );
}

    