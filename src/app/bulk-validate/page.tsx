
'use client';

import React, { useState } from 'react';
import { FileUp, MousePointerClick, Download } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FileUpload } from "@/components/ui/file-upload";
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function BulkValidatePage() {
    const [files, setFiles] = useState<File[]>([]);

    const handleFileUpload = (uploadedFiles: File[]) => {
        setFiles(uploadedFiles);
    };
    
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
    <div className="grid gap-4 md:gap-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Verify Emails by Uploading a File
        </h1>
        <p className="text-muted-foreground">
          Upload a CSV or XLSX file to start the email verification process.
        </p>
      </div>

      <Tabs defaultValue="clean">
        <div className="flex justify-center p-2">
          <TabsList>
            <TabsTrigger value="clean">Clean</TabsTrigger>
            <TabsTrigger value="validate">Validate</TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value="clean">
          <Card>
            <CardContent className="p-6">
                <FileUpload onChange={handleFileUpload} />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="validate">
           <Card>
            <CardContent className="p-6">
                <FileUpload onChange={handleFileUpload} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>


      <div className="grid gap-4">
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
    </div>
  </main>
  );
}
