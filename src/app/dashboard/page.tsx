
'use client';

import { CloudUpload, Download, FileCheck, FileUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { SidebarTrigger } from '@/components/ui/sidebar';

export default function DashboardPage() {
  const howToUseSteps = [
    {
      icon: <FileUp className="mb-4 h-8 w-8 text-primary" />,
      title: 'Upload',
      description: 'Upload a CSV with the email addresses that you want to verify.',
    },
    {
      icon: <FileCheck className="mb-4 h-8 w-8 text-primary" />,
      title: 'Verify',
      description: 'We will do all the hard work and verify if the email is valid.',
    },
    {
      icon: <Download className="mb-4 h-8 w-8 text-primary" />,
      title: 'Download',
      description: 'Download a CSV instantly categorizing emails as valid or invalid.',
    },
  ];

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <main className="flex flex-1 flex-col gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
        <div className="flex items-center gap-4 pt-4">
          <SidebarTrigger className="md:hidden" />
          <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0 md:text-3xl">
            Bulk Upload
          </h1>
        </div>
        <div className="grid grid-cols-1 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Upload a file</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="standard">
                <div className="flex items-center justify-between">
                  <TabsList>
                    <TabsTrigger value="standard">Standard</TabsTrigger>
                    <TabsTrigger value="catch-all">Catch-all</TabsTrigger>
                  </TabsList>
                  <p className="text-sm text-muted-foreground">
                    Upload Limit: <strong>1,000</strong> / list
                  </p>
                </div>
                <TabsContent value="standard">
                  <div className="mt-4 flex h-64 w-full flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 dark:border-gray-600 dark:bg-gray-800">
                    <CloudUpload className="h-12 w-12 text-gray-400" />
                    <p className="mt-4 text-sm text-muted-foreground">
                      <span className="font-semibold">Click to upload</span> or drag and
                      drop
                    </p>
                    <p className="text-xs text-muted-foreground">
                      .csv or .xlsx (MAX. 1000 rows)
                    </p>
                    <Button variant="outline" className="mt-4">
                      Select File
                    </Button>
                  </div>
                </TabsContent>
                <TabsContent value="catch-all">
                  <div className="mt-4 flex h-64 w-full flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 dark:border-gray-600 dark:bg-gray-800">
                    <CloudUpload className="h-12 w-12 text-gray-400" />
                    <p className="mt-4 text-sm text-muted-foreground">
                      <span className="font-semibold">Click to upload</span> or drag and
                      drop
                    </p>
                    <p className="text-xs text-muted-foreground">
                      .csv or .xlsx (MAX. 1000 rows)
                    </p>
                    <Button variant="outline" className="mt-4">
                      Select File
                    </Button>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>How to Use</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-8 md:grid-cols-3">
                {howToUseSteps.map((step, index) => (
                  <div key={index} className="text-left">
                    <div className="mb-2 text-sm font-semibold text-muted-foreground">Step {index + 1}</div>
                    {step.icon}
                    <h3 className="mb-2 text-lg font-bold">{step.title}</h3>
                    <p className="text-muted-foreground">{step.description}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
