
'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { countries } from '@/lib/countries';
import { Lightbulb, Linkedin, Search, Twitter, Facebook } from 'lucide-react';

const platformConfig = {
  linkedin: {
    name: 'LinkedIn',
    icon: <Linkedin className="h-4 w-4" />,
    siteQuery: (country: string) => `site:${country}.linkedin.com/in/ OR site:${country}.linkedin.com/pub/`,
  },
  twitter: {
    name: 'Twitter / X',
    icon: <Twitter className="h-4 w-4" />,
    siteQuery: () => `site:twitter.com`,
  },
  facebook: {
    name: 'Facebook',
    icon: <Facebook className="h-4 w-4" />,
    siteQuery: () => `site:facebook.com`,
  }
};

export default function GenerateLeadsPage() {
  const [jobTitle, setJobTitle] = useState('');
  const [country, setCountry] = useState('us');
  const [location, setLocation] = useState('');
  const [keywordsToExclude, setKeywordsToExclude] = useState('');
  const [platform, setPlatform] = useState<keyof typeof platformConfig>('linkedin');

  const emailProviders = [
    '"@gmail.com"',
    '"@yahoo.com"',
    '"@outlook.com"',
    '"@hotmail.com"',
    '"@aol.com"',
    'email',
    'contact'
  ];

  const buildSearchUrl = () => {
    let queryParts = [];

    // Job Title
    if (jobTitle) {
      const titles = jobTitle.split(/, ?| OR /i).map(t => `"${t.trim()}"`);
      queryParts.push(`(${titles.join(' OR ')})`);
    }

    // Location
    if (location) {
      const locations = location.split(/, ?| OR /i).map(l => `"${l.trim()}"`);
      queryParts.push(`(${locations.join(' OR ')})`);
    }
    
    // Email Providers
    queryParts.push(`(${emailProviders.join(' OR ')})`);

    // Keywords to Exclude
    if (keywordsToExclude) {
      const excludes = keywordsToExclude.split(/, ?| OR /i).map(e => `-"${e.trim()}"`);
      queryParts.push(excludes.join(' '));
    }

    // Platform Site Search
    const selectedPlatform = platformConfig[platform];
    queryParts.push(selectedPlatform.siteQuery(country));

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
            Lead Finder
          </h1>
          <p className="text-muted-foreground">
            Use advanced Google searches to find public profiles and contact information.
          </p>
        </div>
        
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          <Card className="lg:col-span-2">
            <form onSubmit={handleFormSubmit}>
              <CardHeader>
                <CardTitle>Search Parameters</CardTitle>
                <CardDescription>Use 'OR' or commas to separate multiple keywords in a field.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Platform */}
                    <div className="space-y-2">
                        <Label htmlFor="platform">Platform</Label>
                        <Select value={platform} onValueChange={(value) => setPlatform(value as keyof typeof platformConfig)}>
                            <SelectTrigger id="platform">
                                <SelectValue placeholder="Select a platform" />
                            </SelectTrigger>
                            <SelectContent>
                                {Object.entries(platformConfig).map(([key, config]) => (
                                    <SelectItem key={key} value={key} className="flex items-center gap-2">
                                        <div className="flex items-center gap-2">
                                          {config.icon}
                                          <span>{config.name}</span>
                                        </div>
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Country */}
                    <div className="space-y-2">
                        <Label htmlFor="country">Country (for LinkedIn)</Label>
                        <Select value={country} onValueChange={setCountry} disabled={platform !== 'linkedin'}>
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
                        <Label htmlFor="job-title">Job Title</Label>
                        <Input id="job-title" placeholder="e.g. accountant, cfo" value={jobTitle} onChange={e => setJobTitle(e.target.value)} />
                    </div>

                    {/* Location or keywords to include */}
                    <div className="space-y-2">
                        <Label htmlFor="location">Location / Keywords</Label>
                        <Input id="location" placeholder="e.g. London OR Paris" value={location} onChange={e => setLocation(e.target.value)} />
                    </div>
                    
                    {/* Keywords to Exclude */}
                    <div className="md:col-span-2 space-y-2">
                        <Label htmlFor="exclude">Keywords to Exclude</Label>
                        <Input id="exclude" placeholder="e.g. Assistant, Intern, " value={keywordsToExclude} onChange={e => setKeywordsToExclude(e.target.value)} />
                    </div>
                </div>
              </CardContent>
              <div className="border-t p-6 flex justify-end">
                <Button type="submit" size="lg" className="text-base">
                    <Search className="mr-2 h-5 w-5" />
                    Find Leads
                </Button>
              </div>
            </form>
          </Card>

          <Card className="bg-muted/50">
            <CardHeader>
                <div className="flex items-center gap-3">
                    <Lightbulb className="h-6 w-6 text-yellow-400" />
                    <CardTitle>Pro Tips</CardTitle>
                </div>
            </CardHeader>
            <CardContent className="space-y-4 text-sm text-muted-foreground">
                <div className="space-y-1">
                    <p className="font-semibold text-foreground">Boolean Operators</p>
                    <p>Use <code className="bg-primary/10 text-primary px-1 rounded">OR</code> to find profiles with any of your specified keywords (e.g., <code className="bg-primary/10 text-primary px-1 rounded">"Sales Manager" OR "Account Executive"</code>).</p>
                </div>
                <div className="space-y-1">
                    <p className="font-semibold text-foreground">Exclusion is Key</p>
                    <p>Use the "Exclude" field to filter out job titles you don't want, like <code className="bg-primary/10 text-primary px-1 rounded">Assistant</code> or <code className="bg-primary/10 text-primary px-1 rounded">Intern</code>, to refine your search.</p>
                </div>
                <div className="space-y-1">
                    <p className="font-semibold text-foreground">Automatic Email Search</p>
                    <p>We automatically add terms like "@gmail.com" and "contact" to your search to help find public email addresses.</p>
                </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}
