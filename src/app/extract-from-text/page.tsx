
'use client';

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Zap, Copy, Download, CheckCircle } from "lucide-react";
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import * as XLSX from 'xlsx';
import { useRouter } from 'next/navigation';

export default function ExtractFromTextPage() {
  const [text, setText] = useState('');
  const [emails, setEmails] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const router = useRouter();


  const handleExtract = () => {
    setIsLoading(true);
    // Simple regex to find email-like strings
    const emailRegex = /[\w\.-]+@[\w\.-]+\.\w+/g;
    const foundEmails = text.match(emailRegex) || [];
    // Deduplicate emails
    const uniqueEmails = [...new Set(foundEmails)];
    
    // Simulate processing time
    setTimeout(() => {
        setEmails(uniqueEmails);
        setIsLoading(false);
    }, 500);
  };

  const handleCopy = () => {
    if (emails.length === 0) return;
    navigator.clipboard.writeText(emails.join('\n'));
    toast({
        title: 'Copied to clipboard!',
        description: `${emails.length} emails have been copied.`,
    });
  }

  const handleDownload = () => {
    if (emails.length === 0) return;
    const data = emails.map(email => ({ Email: email }));
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Extracted Emails");
    XLSX.writeFile(wb, "extracted-emails.csv", { bookType: "csv" });
  };

  const handleValidate = () => {
    if (emails.length === 0) return;

    // Store the data in sessionStorage to pass it to the next page
    sessionStorage.setItem('validationData', JSON.stringify({
        emails,
        fileName: `extracted-emails-${new Date().toISOString()}.csv`
    }));

    // Redirect to the bulk validation page
    router.push('/bulk-validate');
  }


  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
      <div className="grid gap-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Extract Emails From Text
          </h1>
          <p className="text-muted-foreground">
            Paste any block of text below to find and extract all email addresses.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Input Text</CardTitle>
            <CardDescription>
                Paste your content here. We'll automatically find all the email addresses for you.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea 
              placeholder="Paste your text here... e.g. 'You can contact us at contact@example.com or for support, use support@example.com'"
              className="min-h-[200px] text-base"
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
             <Button onClick={handleExtract} disabled={isLoading || !text}>
                {isLoading ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                    <Zap className="mr-2 h-4 w-4" />
                )}
                Extract Emails
            </Button>
          </CardContent>
        </Card>

        {emails.length > 0 && !isLoading && (
            <Card>
                <CardHeader>
                    <CardTitle>Extracted Emails ({emails.length})</CardTitle>
                    <CardDescription>
                        Here are the unique email addresses found in your text.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-wrap gap-2">
                        {emails.map((email, index) => (
                            <Badge key={index} variant="secondary" className="text-base font-normal">
                                {email}
                            </Badge>
                        ))}
                    </div>
                </CardContent>
                <CardFooter className="flex-wrap justify-start gap-2">
                    <Button variant="outline" onClick={handleCopy}>
                        <Copy className="mr-2 h-4 w-4" />
                        Copy Emails
                    </Button>
                    <Button variant="outline" onClick={handleDownload}>
                        <Download className="mr-2 h-4 w-4" />
                        Download CSV
                    </Button>
                     <Button onClick={handleValidate}>
                        <CheckCircle className="mr-2 h-4 w-4" />
                        Validate List
                    </Button>
                </CardFooter>
            </Card>
        )}
      </div>
    </main>
  );
}
