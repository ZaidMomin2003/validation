# **App Name**: VeriFlow

## Core Features:

- Firebase Authentication: Secure user authentication using Firebase Auth (Email/Password + Google).
- CSV Upload & Parsing: Upload CSV file of email addresses and parse it for verification.
- Verification Mode Selection: Allow users to select one of three verification modes: Easy, Targeted, and Ultra-Targeted, each explained clearly.
- Easy Check (Fast, Zero Network): Perform local checks: RFC syntax, normalization, duplicate, disposable and role-based detection; free vs business classification.
- Targeted Check (DNS Level): Includes Easy checks, plus domain/MX existence check with DNS timeout handling and retry logic. Catch-all detection.
- Ultra-Targeted Check (SMTP Level): Includes Targeted checks, plus SMTP mailbox probing using TCP sockets and EHLO/MAIL FROM/RCPT TO commands. Per-domain rate limiting and greylisting handling.
- Progress Monitoring & Reporting: Show progress bar, live counts per status, estimated time remaining, and export results as CSV. Uses Firestore for progress updates.

## Style Guidelines:

- Primary color: Deep Indigo (#4F46E5) to convey trust and reliability.
- Background color: Very light gray (#F9FAFB), nearly white, for a clean, uncluttered look.
- Accent color: Soft Teal (#38BDF8) to add a touch of energy and call attention to key CTAs.
- Body and headline font: 'Inter', sans-serif, for a modern, clean, and highly readable interface.
- Clean SaaS layout with clear sections for CSV upload, mode selection, progress display, and results export. Light and dark mode support.
- Simple, clear icons to represent each verification mode and status. Minimalist style to match the overall aesthetic.
- Subtle progress bar animation and loading indicators during the verification process.