
'use client';

import React, { useState } from 'react';
import { FileUp, Download, Loader2, ShieldCheck, PieChart, ShieldAlert, ShieldX, CheckCircle, FileWarning, FileX, Check, HelpCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { FileUpload } from "@/components/ui/file-upload";
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import * as XLSX from 'xlsx';
import { cn } from '@/lib/utils';
import { validate } from '@/lib/email-validator';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"


const PREVIEW_ROW_COUNT = 8;

interface TableData {
    headers: string[];
    rows: any[][];
    fileName: string;
}

type ValidationCategory = 'good' | 'risky' | 'bad';

interface ValidatedData {
    good: number;
    risky: number;
    bad: number;
    total: number;
    data: Record<string, any>[];
}

export default function EmailValidationPage() {
    const [files, setFiles] = useState<File[]>([]);
    const [tableData, setTableData] = useState<TableData | null>(null);
    const [emailColumn, setEmailColumn] = useState<string | null>(null);
    const [isProcessing, setIsProcessing] = useState(false);
    const [progress, setProgress] = useState(0);
    const [validatedData, setValidatedData] = useState<ValidatedData | null>(null);
    const [selectedCategories, setSelectedCategories] = useState<Set<ValidationCategory>>(new Set(['good']));
    const { toast } = useToast();

    const processFile = (file: File) => {
        setIsProcessing(true);
        setProgress(0);
        const reader = new FileReader();

        reader.onload = (e) => {
            try {
                const data = e.target?.result;
                const workbook = XLSX.read(data, { type: 'binary' });
                const sheetName = workbook.SheetNames[0];
                const worksheet = workbook.Sheets[sheetName];
                const json: any[] = XLSX.utils.sheet_to_json(worksheet, { header: 'A' });

                if (json.length === 0) throw new Error("The file is empty.");
                
                const headers = Object.keys(json[0]);
                const rows = json.map(row => headers.map(header => row[header]));

                setTableData({ headers, rows, fileName: file.name });
                
                let bestCandidate: string | null = null;
                let maxEmailCount = 0;
                
                headers.forEach((h, colIndex) => {
                    let emailCount = 0;
                    for(let i = 0; i < json.length; i++) {
                        if (json[i] && String(json[i][h]).includes('@')) {
                            emailCount++;
                        }
                    }
                    if (emailCount > maxEmailCount) {
                        maxEmailCount = emailCount;
                        bestCandidate = h;
                    }
                });

                setEmailColumn(bestCandidate || (headers.length > 0 ? headers[0] : null));
                
                // Automatically start validation
                handleValidate(json, bestCandidate || headers[0]);

            } catch (error) {
                toast({
                    variant: 'destructive',
                    title: 'Error processing file',
                    description: error instanceof Error ? error.message : 'Could not read the uploaded file.',
                });
                handleReset();
            }
        };
        reader.readAsArrayBuffer(file);
    };

    const handleFileUpload = (uploadedFiles: File[]) => {
        if (isProcessing) return;
        setFiles(uploadedFiles);
        if (uploadedFiles.length > 0) {
            processFile(uploadedFiles[0]);
        }
    };

    const handleReset = () => {
        setFiles([]);
        setTableData(null);
        setValidatedData(null);
        setEmailColumn(null);
        setIsProcessing(false);
        setProgress(0);
        setSelectedCategories(new Set(['good']));
    };

    const handleValidate = async (rows: Record<string, any>[], emailCol: string) => {
        if (!rows || !emailCol) return;
        
        setIsProcessing(true);
        setValidatedData(null);

        try {
            const validationPromise = validate(rows, emailCol, (progressData) => {
                const currentProgress = Math.round((progressData.good + progressData.risky + progressData.bad) / progressData.total * 90);
                setProgress(currentProgress); // Cap progress at 90% until delay is over
                setValidatedData(progressData);
            });

            const delayPromise = new Promise(resolve => setTimeout(resolve, 5000));
            
            const [results] = await Promise.all([validationPromise, delayPromise]);
            
            setProgress(100);

            toast({
                title: "Validation Complete!",
                description: `Successfully processed ${results.total} records.`,
            });
        } catch (error) {
            toast({
                variant: 'destructive',
                title: "Validation Failed",
                description: "An unexpected error occurred during validation."
            })
        } finally {
            setIsProcessing(false);
        }
    };

    const handleCategoryToggle = (category: ValidationCategory) => {
        setSelectedCategories(prev => {
            const newSet = new Set(prev);
            if (newSet.has(category)) {
                newSet.delete(category);
            } else {
                newSet.add(category);
            }
            return newSet;
        });
    };

    const handleDownload = () => {
        if (!validatedData || selectedCategories.size === 0) {
            toast({
                variant: 'destructive',
                title: 'No categories selected',
                description: 'Please select at least one category to download.',
            });
            return;
        }

        const dataToExport = validatedData.data.filter(row => 
            row.Status && selectedCategories.has(row.Status.toLowerCase())
        );

        if (dataToExport.length === 0) {
            toast({
                title: 'No emails to download',
                description: 'There are no emails in the selected categories.',
            });
            return;
        }

        const ws = XLSX.utils.json_to_sheet(dataToExport);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Validated Data");

        const fileName = `${Array.from(selectedCategories).join('-')}-${tableData?.fileName || 'data'}.csv`;
        XLSX.writeFile(wb, fileName, { bookType: 'csv' });
    }
    
    const Legend = () => (
        <Alert className="bg-muted/50 border-border/50">
            <HelpCircle className="h-4 w-4" />
            <AlertTitle>Understanding the Results</AlertTitle>
            <AlertDescription>
                <ul className="list-disc list-inside space-y-2 mt-2 text-xs">
                    <li><strong className="text-green-400">Good:</strong> The email has valid syntax and the domain has a mail server (MX Record). Safe to send.</li>
                    <li><strong className="text-yellow-400">Risky:</strong> These are role-based emails (e.g., support@, info@). They are valid but may have low engagement.</li>
                    <li><strong className="text-red-400">Bad:</strong> These emails are undeliverable. They may have invalid syntax, belong to a disposable domain, have a typo, or the domain does not accept emails (no MX Record).</li>
                </ul>
            </AlertDescription>
        </Alert>
    );


    const renderFileUpload = () => (
        <>
            <Card>
                <CardContent className="w-full max-w-4xl mx-auto p-0">
                    <FileUpload onChange={handleFileUpload} accept=".csv, .xlsx" />
                </CardContent>
            </Card>
            <div className="grid gap-4 mt-8">
                <h2 className="text-2xl font-bold">How Email Validation Works</h2>
                <div className="grid gap-4 md:grid-cols-3">
                    <Card>
                        <CardHeader className="flex flex-row items-center gap-4">
                            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                                <FileUp className="h-6 w-6 text-primary" />
                            </div>
                            <CardTitle>1. Upload File</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground">Upload a CSV or XLSX file containing your email list.</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center gap-4">
                             <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                                <ShieldCheck className="h-6 w-6 text-primary" />
                            </div>
                            <CardTitle>2. Validate & Clean</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground">We check syntax, MX records, disposable domains, and more.</p>
                        </CardContent>
                    </Card>
                     <Card>
                        <CardHeader className="flex flex-row items-center gap-4">
                             <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                                <Download className="h-6 w-6 text-primary" />
                            </div>
                            <CardTitle>3. Download Results</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground">Download your cleaned list, segmented by validation status.</p>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </>
    );

    const renderResults = () => {
        if (!validatedData) return null;
        
        const { good, risky, bad, total } = validatedData;
        const goodPercent = total > 0 ? (good / total * 100).toFixed(1) : 0;
        const riskyPercent = total > 0 ? (risky / total * 100).toFixed(1) : 0;
        const badPercent = total > 0 ? (bad / total * 100).toFixed(1) : 0;

        return (
            <Card>
                <CardHeader>
                    <CardTitle className="text-2xl">Validation Results</CardTitle>
                    <CardDescription>Your list has been analyzed. Select categories and download the segments you need.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="grid gap-4 md:grid-cols-3">
                        <Card className="bg-green-500/10 border-green-500/20">
                            <CardHeader className="flex flex-row items-center justify-between pb-2">
                                <CardTitle className="text-sm font-medium text-green-200">Good</CardTitle>
                                <CheckCircle className="h-4 w-4 text-green-300" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold text-white">{good.toLocaleString()}</div>
                                <p className="text-xs text-green-200">{goodPercent}% of total</p>
                            </CardContent>
                        </Card>
                        <Card className="bg-yellow-500/10 border-yellow-500/20">
                            <CardHeader className="flex flex-row items-center justify-between pb-2">
                                <CardTitle className="text-sm font-medium text-yellow-200">Risky</CardTitle>
                                <ShieldAlert className="h-4 w-4 text-yellow-300" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold text-white">{risky.toLocaleString()}</div>
                                <p className="text-xs text-yellow-200">{riskyPercent}% of total</p>
                            </CardContent>
                        </Card>
                        <Card className="bg-red-500/10 border-red-500/20">
                            <CardHeader className="flex flex-row items-center justify-between pb-2">
                                <CardTitle className="text-sm font-medium text-red-200">Bad</CardTitle>
                                <ShieldX className="h-4 w-4 text-red-300" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold text-white">{bad.toLocaleString()}</div>
                                <p className="text-xs text-red-200">{badPercent}% of total</p>
                            </CardContent>
                        </Card>
                    </div>
                     <Legend />
                    <Alert>
                        <PieChart className="h-4 w-4" />
                        <AlertTitle>Download Validated Segments</AlertTitle>
                        <AlertDescription>Select one or more categories to include in your download.</AlertDescription>
                        <div className="mt-4 flex flex-col sm:flex-row sm:items-center gap-4">
                            <div className="flex items-center space-x-4">
                                <div className="flex items-center space-x-2">
                                    <Checkbox id="good-check" checked={selectedCategories.has('good')} onCheckedChange={() => handleCategoryToggle('good')} />
                                    <Label htmlFor="good-check" className="font-normal text-green-300">Good ({good})</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Checkbox id="risky-check" checked={selectedCategories.has('risky')} onCheckedChange={() => handleCategoryToggle('risky')} />
                                    <Label htmlFor="risky-check" className="font-normal text-yellow-300">Risky ({risky})</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Checkbox id="bad-check" checked={selectedCategories.has('bad')} onCheckedChange={() => handleCategoryToggle('bad')} />
                                    <Label htmlFor="bad-check" className="font-normal text-red-300">Bad ({bad})</Label>
                                </div>
                            </div>
                            <Button onClick={handleDownload} size="sm" className="sm:ml-auto" disabled={selectedCategories.size === 0}>
                                <Download className="mr-2 h-4 w-4" />
                                Download Selected
                            </Button>
                        </div>
                    </Alert>
                </CardContent>
                <CardFooter>
                    <Button variant="outline" onClick={handleReset}>Validate Another List</Button>
                </CardFooter>
            </Card>
        )
    };

    const renderProcessing = () => (
        <Card className="flex flex-col items-center justify-center p-20 gap-4">
            <Loader2 className="h-12 w-12 animate-spin text-primary" />
            <p className="text-muted-foreground">Validating your list...</p>
            <Progress value={progress} className="w-full max-w-sm" />
            <p className="text-sm font-semibold">{progress}% complete</p>
        </Card>
    );

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
    <div className="grid gap-4 md:gap-8">
        <div>
            <h1 className="text-3xl font-bold tracking-tight">
                Email Validation
            </h1>
            <p className="text-muted-foreground">
                Clean your list by verifying emails, removing duplicates, and checking for disposable domains.
            </p>
        </div>
        
        {isProcessing ? renderProcessing() : (validatedData ? renderResults() : renderFileUpload())}
    </div>
  </main>
  );
}

    