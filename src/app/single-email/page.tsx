
'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { CheckCircle, AlertTriangle, XCircle, ArrowUp } from "lucide-react";

export default function SingleEmailPage() {
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
      <div className="grid gap-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Single Email
          </h1>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Enter Email Address</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex w-full items-center space-x-2">
              <Input type="email" placeholder="example@example.com" />
              <Button type="submit">
                <ArrowUp className="mr-2 h-4 w-4 -rotate-45" />
                Validate
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-4">
            <h2 className="text-2xl font-bold">Types of Categories</h2>
            <div className="grid gap-6 md:grid-cols-3">
                <Card className="bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800">
                    <CardHeader className="flex flex-row items-center gap-4">
                        <CheckCircle className="h-8 w-8 text-green-600 dark:text-green-400" />
                        <CardTitle className="text-green-800 dark:text-green-300">Good</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-green-700 dark:text-green-400/80">
                            Emails that are valid and safe to send to.
                        </p>
                    </CardContent>
                </Card>
                <Card className="bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800">
                    <CardHeader className="flex flex-row items-center gap-4">
                        <AlertTriangle className="h-8 w-8 text-yellow-600 dark:text-yellow-400" />
                        <CardTitle className="text-yellow-800 dark:text-yellow-300">Risky</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-yellow-700 dark:text-yellow-400/80">
                            Unknown or catch-all emails. Send at your own risk.
                        </p>
                    </CardContent>
                </Card>
                <Card className="bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800">
                    <CardHeader className="flex flex-row items-center gap-4">
                        <XCircle className="h-8 w-8 text-red-600 dark:text-red-400" />
                        <CardTitle className="text-red-800 dark:text-red-300">Bad</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-red-700 dark:text-red-400/80">
                            Invalid emails that you shouldn't send to.
                        </p>
                    </CardContent>
                </Card>
            </div>
        </div>

      </div>
    </main>
  );
}
