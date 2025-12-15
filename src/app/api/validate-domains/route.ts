import { NextResponse } from 'next/server';
import dns from 'dns';
import { promisify } from 'util';

const resolveMx = promisify(dns.resolveMx);

// Simple in-memory cache to avoid re-validating the same domain within a short period.
const mxCache = new Map<string, { records: dns.MxRecord[]; timestamp: number }>();
const CACHE_TTL = 1000 * 60 * 60; // 1 hour

async function hasMxRecord(domain: string): Promise<boolean> {
  const cached = mxCache.get(domain);
  if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
    return cached.records.length > 0;
  }

  try {
    const records = await resolveMx(domain);
    const hasRecords = records && records.length > 0;
    mxCache.set(domain, { records, timestamp: Date.now() });
    return hasRecords;
  } catch (error: any) {
    // Common errors for non-existent domains
    if (error.code === 'ENODATA' || error.code === 'ENOTFOUND' || error.code === 'DNS_R_SERVFAIL') {
       mxCache.set(domain, { records: [], timestamp: Date.now() });
      return false;
    }
    // For other errors, we might not want to cache the failure
    console.error(`DNS resolution error for ${domain}:`, error);
    return false;
  }
}

export async function POST(request: Request) {
  try {
    const { domains } = await request.json();

    if (!Array.isArray(domains)) {
      return NextResponse.json({ error: 'Domains must be an array.' }, { status: 400 });
    }
    
    // Deduplicate domains to avoid redundant lookups
    const uniqueDomains = [...new Set(domains)];

    const results = await Promise.all(
      uniqueDomains.map(async (domain) => {
        const hasMx = await hasMxRecord(domain);
        return { domain, hasMx };
      })
    );
    
    // Create a map for easy lookup on the client
    const validationMap = results.reduce((acc, { domain, hasMx }) => {
        acc[domain] = hasMx;
        return acc;
    }, {} as Record<string, boolean>);


    return NextResponse.json({ validationMap });

  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ error: 'An internal server error occurred.' }, { status: 500 });
  }
}
