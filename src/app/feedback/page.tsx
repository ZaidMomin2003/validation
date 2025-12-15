
'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Upload } from "lucide-react";

export default function FeedbackPage() {
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
      <div className="grid gap-4 md:gap-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Feedback
          </h1>
          <p className="text-muted-foreground">
            We'd love to hear your thoughts. Let us know how we can improve.
          </p>
        </div>

        <Card className="max-w-2xl mx-auto w-full">
            <CardHeader>
                <CardTitle>Submit Feedback</CardTitle>
                <CardDescription>Your feedback is invaluable to us.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="name">Name</Label>
                        <Input id="name" placeholder="Your Name" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" placeholder="Your Email" />
                    </div>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="feedback">Feedback</Label>
                    <Textarea id="feedback" placeholder="What's on your mind?" rows={6} />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="file">Reference Image (Optional)</Label>
                    <div className="flex items-center justify-center w-full">
                        <label htmlFor="file-upload" className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-card hover:bg-muted transition-colors">
                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                <Upload className="w-8 h-8 mb-4 text-muted-foreground" />
                                <p className="mb-2 text-sm text-muted-foreground"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                                <p className="text-xs text-muted-foreground">PNG, JPG, GIF up to 10MB</p>
                            </div>
                            <Input id="file-upload" type="file" className="hidden" />
                        </label>
                    </div> 
                </div>
            </CardContent>
            <CardFooter>
                <Button>Submit Feedback</Button>
            </CardFooter>
        </Card>
      </div>
    </main>
  );
}
