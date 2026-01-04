'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { countries } from '@/lib/countries';
import { Facebook, Twitter, Linkedin, Mail } from 'lucide-react';

export default function GenerateLeadsPage() {
  const [jobTitle, setJobTitle] = useState('');
  const [country, setCountry] = useState('in');
  const [location, setLocation] = useState('');
  const [keywordsToExclude, setKeywordsToExclude] = useState('');
  const [education, setEducation] = useState('');
  const [currentEmployer, setCurrentEmployer] = useState('');

  const buildSearchUrl = () => {
    let queryParts = [];

    // Job Title
    if (jobTitle) {
        const titles = jobTitle.split(/, | OR /i).map(t => `"${t.trim()}"`);
        queryParts.push(`(${titles.join(' OR ')})`);
    }

    // Keywords to Exclude
    if (keywordsToExclude) {
        const excludes = keywordsToExclude.split(/, | OR /i).map(e => `-"${e.trim()}"`);
        queryParts.push(excludes.join(' '));
    }
    
    // Location
    if (location) {
        const locations = location.split(/, | OR /i).map(l => `"${l.trim()}"`);
        queryParts.push(`(${locations.join(' OR ')})`);
    }

    // Education
    if (education) {
        const educations = education.split(/, | OR /i).map(e => `"${e.trim()}"`);
        queryParts.push(`(${educations.join(' OR ')})`);
    }
    
    // Current Employer
    if (currentEmployer) {
        queryParts.push(`"Current * ${currentEmployer}"`);
    }


    // LinkedIn Site Search
    const site = `site:${country}.linkedin.com/in/ OR site:${country}.linkedin.com/pub/`;
    queryParts.push(site);

    const query = queryParts.join(' ');
    const url = `https://www.google.com/search?q=${encodeURIComponent(query)}`;
    
    window.open(url, '_blank');
  };
  
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    buildSearchUrl();
  }

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
      <div className="max-w-7xl mx-auto w-full">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Generate Leads
          </h1>
          <p className="text-muted-foreground">
            Easily use Google to search profiles on LinkedIn
          </p>
        </div>
        
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
          <form onSubmit={handleFormSubmit} className="lg:col-span-2 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Country */}
                <div className="space-y-2">
                    <Label htmlFor="country">Country</Label>
                    <Select value={country} onValueChange={setCountry}>
                        <SelectTrigger id="country">
                            <SelectValue placeholder="Select a country" />
                        </SelectTrigger>
                        <SelectContent>
                            {countries.map(c => (
                                <SelectItem key={c.code} value={c.code.toLowerCase()}>{c.name}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                {/* Job Title */}
                 <div className="space-y-2">
                    <Label htmlFor="job-title">Job title</Label>
                    <Input id="job-title" placeholder="e.g. accountant OR cfo" value={jobTitle} onChange={e => setJobTitle(e.target.value)} />
                </div>

                 {/* Location */}
                <div className="space-y-2">
                    <Label htmlFor="location">Location or keywords to include</Label>
                    <Input id="location" placeholder="e.g. London OR Paris AND html" value={location} onChange={e => setLocation(e.target.value)} />
                </div>
                
                {/* Keywords to Exclude */}
                <div className="space-y-2">
                    <Label htmlFor="exclude">Keywords to exclude</Label>
                    <Input id="exclude" placeholder="e.g. Assistant OR secretary" value={keywordsToExclude} onChange={e => setKeywordsToExclude(e.target.value)} />
                </div>

                {/* Education */}
                <div className="space-y-2">
                    <Label htmlFor="education">Education</Label>
                    <Input id="education" placeholder="e.g. Masters OR MBA" value={education} onChange={e => setEducation(e.target.value)}/>
                </div>

                {/* Current Employer */}
                <div className="space-y-2">
                    <Label htmlFor="employer">Current Employer</Label>
                    <Input id="employer" placeholder="e.g. Paypal" value={currentEmployer} onChange={e => setCurrentEmployer(e.target.value)}/>
                </div>
            </div>

            <Button type="submit" size="lg" className="w-full text-base">
                Find the right people on LinkedIn
            </Button>
          </form>

          <div className="space-y-6">
            <Card className="bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-900/50">
                <CardHeader>
                    <CardTitle className="text-amber-900 dark:text-amber-200">Why search LinkedIn with Cleanmails?</CardTitle>
                </CardHeader>
                <CardContent>
                    <ul className="space-y-2 text-sm text-amber-800 dark:text-amber-300 list-disc list-inside">
                        <li>More than 100 Results</li>
                        <li>See out of network connections</li>
                        <li>Search by education & employer</li>
                        <li>No registration required</li>
                        <li>Completely free :)</li>
                    </ul>
                </CardContent>
            </Card>
             <Card>
                <CardHeader>
                    <CardTitle>Like this tool?</CardTitle>
                     <CardDescription>Share with your colleagues</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-wrap gap-2">
                    <Button variant="outline" size="sm" className="bg-blue-600 text-white hover:bg-blue-700">
                        <Facebook className="mr-2 h-4 w-4" /> Share
                    </Button>
                    <Button variant="outline" size="sm" className="bg-black text-white hover:bg-zinc-800">
                         <Twitter className="mr-2 h-4 w-4" /> Post
                    </Button>
                    <Button variant="outline" size="sm" className="bg-sky-500 text-white hover:bg-sky-600">
                        <Linkedin className="mr-2 h-4 w-4" /> Share
                    </Button>
                     <Button variant="outline" size="sm">
                        <Mail className="mr-2 h-4 w-4" /> Email
                    </Button>
                </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </main>
  );
}