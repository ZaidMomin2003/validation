
'use client';

import React, { useState } from 'react';
import { FileUp, MousePointerClick, Download, Check, Lock, Info, CheckCircle, XCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FileUpload } from "@/components/ui/file-upload";
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

// Mock data for demonstration until file parsing is implemented
const mockData = {
    headers: ["NNAMED: 2", "UNNAMED: 3", "EMAIL", "UNNAMED: 5", "DOMAIN", "SYSTEM"],
    rows: [
        ["GA.org.au Inc", "Sports", "0000info@pga.org.au", "Strathfield", "pga.org.au", "TH"],
        ["PwC Indonesia", "Business And Industrial", "michelle@pwc.com", "Little Rock", "pwc.com", "TI"],
        ["Westchester", "Business And Industrial", "michelle.trader@westchester.com", "Alpharetta", "westchester.com", "TH"],
        ["Wave Navigators", "Technology And Computing", "michelle.ward@navigators.org", "Colorado Springs", "navigators.org", "TH"],
        ["Insightsoftware", "Business And Industrial", "michelle.werkmeister@insightsoftware.com", "Osborne Park", "insightsoftware.com", "TI"],
    ],
    emailColumnIndex: 2
};


export default function BulkValidatePage() {
    const [files, setFiles] = useState<File[]>([]);
    const [showTable, setShowTable] = useState(false);

    const handleFileUpload = (uploadedFiles: File[]) => {
        setFiles(uploadedFiles);
        // This is where you would parse the file and set the data
        // For now, we'll just switch to the table view with mock data
        if (uploadedFiles.length > 0) {
            setShowTable(true);
        }
    };

    const handleReset = () => {
        setFiles([]);
        setShowTable(false);
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
                        <p className="text-sm text-muted-foreground">Select the column containing email addresses. The highlighted column indicates your selection.</p>
                    </div>

                    <div>
                        <h3 className="font-semibold mb-2">Verification Mode</h3>
                        <div className="grid grid-cols-3 gap-2">
                            <Button variant="outline" className="flex items-center justify-center gap-2 border-green-500 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300">
                                <CheckCircle className="h-4 w-4" />
                                <span>Standard</span>
                            </Button>
                            <Button variant="outline" className="flex items-center justify-center gap-2" disabled>
                                <Lock className="h-4 w-4" />
                                <span>Ultra</span>
                            </Button>
                             <Button variant="outline" className="flex items-center justify-center gap-2" disabled>
                                <span>Legacy</span>
                            </Button>
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    {mockData.headers.map((header, index) => (
                                        <TableHead key={index} className={index === mockData.emailColumnIndex ? "bg-muted" : ""}>
                                            <div className="flex items-center gap-1">
                                                {header}
                                                {index === mockData.emailColumnIndex && <CheckCircle className="h-4 w-4 text-primary" />}
                                            </div>
                                        </TableHead>
                                    ))}
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {mockData.rows.map((row, rowIndex) => (
                                    <TableRow key={rowIndex}>
                                        {row.map((cell, cellIndex) => (
                                            <TableCell key={cellIndex} className={cellIndex === mockData.emailColumnIndex ? "bg-muted" : ""}>
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
            <div className="border-t p-6 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                    <Switch id="save-list" />
                    <Label htmlFor="save-list">Save list to Recent Lists</Label>
                </div>
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

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
    <div className="grid gap-4 md:gap-8">
        {!showTable && (
            <div>
                <h1 className="text-3xl font-bold tracking-tight">
                    Verify Emails by Uploading a File
                </h1>
                <p className="text-muted-foreground">
                    Upload a CSV or XLSX file to start the email verification process.
                </p>
            </div>
        )}
        
        {showTable ? renderTable() : renderFileUpload()}
    </div>
  </main>
  );
}
