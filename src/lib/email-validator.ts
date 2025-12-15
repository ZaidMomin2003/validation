import * as XLSX from 'xlsx';

export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// A selection of common disposable email providers
export const DISPOSABLE_DOMAINS = new Set([
  'mailinator.com', '10minutemail.com', 'guerrillamail.com', 'trashmail.com', 'tempmail.com', 
  'yopmail.com', 'getnada.com', 'maildrop.cc', 'throwawaymail.com', 'temp-mail.org'
]);

// A selection of common role-based prefixes
export const ROLE_BASED_PREFIXES = new Set([
  'admin', 'support', 'info', 'sales', 'contact', 'webmaster', 'help', 'postmaster', 'hostmaster',
  'abuse', 'noreply', 'security', 'marketing', 'team', 'hello', 'office', 'privacy'
]);


export const getDomainFromEmail = (email: string): string | null => {
    if (typeof email !== 'string' || !email.includes('@')) {
        return null;
    }
    return email.split('@')[1].toLowerCase();
};

export const getPrefixFromEmail = (email: string): string | null => {
    if (typeof email !== 'string' || !email.includes('@')) {
        return null;
    }
    return email.split('@')[0].toLowerCase();
}

export const validate = async (
    rows: Record<string, any>[], 
    emailColumn: string,
    onProgress: (progress: { good: number, risky: number, bad: number, total: number, data: Record<string, any>[] }) => void
) => {
    let good = 0;
    let risky = 0;
    let bad = 0;
    const total = rows.length;
    const validatedData = [];

    // Step 1: Basic syntax validation and collect all unique domains
    const syntaxCheckedRows: { row: Record<string, any>; email: string; domain: string | null; status: 'Good' | 'Bad' | 'Risky'; notes: string }[] = [];
    const domainsToValidate = new Set<string>();

    for (const row of rows) {
        const email = String(row[emailColumn] || '').trim();
        if (!email) {
            bad++;
            validatedData.push({ ...row, Status: 'Bad', Notes: 'Missing email' });
            continue;
        }

        if (!EMAIL_REGEX.test(email)) {
            bad++;
            validatedData.push({ ...row, Status: 'Bad', Notes: 'Invalid syntax' });
            continue;
        }

        const domain = getDomainFromEmail(email);
        if (domain) {
            syntaxCheckedRows.push({ row, email, domain, status: 'Good', notes: '' });
            domainsToValidate.add(domain);
        } else {
            bad++;
            validatedData.push({ ...row, Status: 'Bad', Notes: 'Invalid domain' });
        }
    }
    
    // Step 2: Batch validate domains via API
    let domainValidationMap: Record<string, boolean> = {};
    if (domainsToValidate.size > 0) {
        try {
            const response = await fetch('/api/validate-domains', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ domains: Array.from(domainsToValidate) }),
            });
            if (response.ok) {
                const result = await response.json();
                domainValidationMap = result.validationMap;
            } else {
                 throw new Error('Domain validation API failed');
            }
        } catch (error) {
             console.error("MX validation failed for all domains:", error);
             // If API fails, mark all as bad to be safe
             syntaxCheckedRows.forEach(item => {
                item.status = 'Bad';
                item.notes = 'Domain check failed';
             });
        }
    }

    // Step 3: Final classification
    for (const { row, email, domain, status, notes } of syntaxCheckedRows) {
        let currentStatus: 'Good' | 'Risky' | 'Bad' = status;
        let currentNotes = notes;

        if (currentStatus !== 'Bad') {
            if (!domain || domainValidationMap[domain] === false) {
                currentStatus = 'Bad';
                currentNotes = 'No MX Record';
            } else {
                const prefix = getPrefixFromEmail(email);
                if (DISPOSABLE_DOMAINS.has(domain)) {
                    currentStatus = 'Risky';
                    currentNotes = 'Disposable domain';
                } else if (prefix && ROLE_BASED_PREFIXES.has(prefix)) {
                    currentStatus = 'Risky';
                    currentNotes = 'Role-based email';
                }
            }
        }
        
        if (currentStatus === 'Good') good++;
        else if (currentStatus === 'Risky') risky++;
        else bad++;

        validatedData.push({ ...row, Status: currentStatus, Notes: currentNotes });
        
        // Report progress periodically
        if ((good + risky + bad) % 10 === 0 || (good + risky + bad) === total) {
            onProgress({ good, risky, bad, total, data: validatedData });
        }
    }

    // Final progress report
    onProgress({ good, risky, bad, total, data: validatedData });

    return { good, risky, bad, total, data: validatedData };
};
