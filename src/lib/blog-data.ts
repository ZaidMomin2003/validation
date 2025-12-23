
'use client';

export interface BlogPost {
  id: number;
  title: string;
  description: string;
  author: string;
  authorAvatar: string;
  date: string;
  imageUrl: string;
  imageHint: string;
  tags: string[];
}

const generateDate = (daysAgo: number): string => {
    const date = new Date('2025-12-23T12:00:00Z');
    date.setDate(date.getDate() - daysAgo);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
};

export const blogPosts: BlogPost[] = [
    {
        id: 1,
        title: 'The Ultimate Guide to Email Deliverability in 2026',
        description: 'Navigate the complexities of email deliverability. Learn how to avoid spam folders and ensure your messages reach the inbox every time.',
        author: 'Jane Doe',
        authorAvatar: '',
        date: generateDate(1),
        imageUrl: 'https://picsum.photos/seed/blog1/1200/630',
        imageHint: 'email inbox',
        tags: ['Deliverability', 'Strategy'],
    },
    {
        id: 2,
        title: 'Why Cleaning Your Email List Is Non-Negotiable',
        description: 'Discover the hidden costs of a dirty email list, from high bounce rates to a damaged sender reputation, and learn how regular cleaning can boost your ROI.',
        author: 'John Smith',
        authorAvatar: '',
        date: generateDate(2),
        imageUrl: 'https://picsum.photos/seed/blog2/1200/630',
        imageHint: 'data cleaning',
        tags: ['Data Hygiene', 'Best Practices'],
    },
    {
        id: 3,
        title: '5 Common Mistakes That Are Destroying Your Sender Reputation',
        description: "Are you making these critical errors? We break down the top five mistakes that hurt your sender score and provide actionable steps to fix them.",
        author: 'Alice Johnson',
        authorAvatar: '',
        date: generateDate(4),
        imageUrl: 'https://picsum.photos/seed/blog3/1200/630',
        imageHint: 'email error',
        tags: ['Reputation', 'Strategy'],
    },
    {
        id: 4,
        title: 'From "Risky" to "Good": Understanding Email Validation Statuses',
        description: 'Valid, risky, or bad? This guide demystifies email validation results, helping you make smarter decisions about which contacts to keep.',
        author: 'Mark Williams',
        authorAvatar: '',
        date: generateDate(6),
        imageUrl: 'https://picsum.photos/seed/blog4/1200/630',
        imageHint: 'data analytics',
        tags: ['Validation', 'Tutorial'],
    },
    {
        id: 5,
        title: 'How to Personalize Emails Without Being Creepy',
        description: 'Personalization is key to engagement, but there\'s a fine line. Learn how to use data effectively to create relevant, welcome messages.',
        author: 'Jane Doe',
        authorAvatar: '',
        date: generateDate(8),
        imageUrl: 'https://picsum.photos/seed/blog5/1200/630',
        imageHint: 'friendly communication',
        tags: ['Engagement', 'Strategy'],
    },
    {
        id: 6,
        title: 'The Impact of AI on Email Marketing and Verification',
        description: 'AI is changing everything, including how we approach email. Explore the latest AI-driven tools and techniques for smarter email campaigns.',
        author: 'John Smith',
        authorAvatar: '',
        date: generateDate(9),
        imageUrl: 'https://picsum.photos/seed/blog6/1200/630',
        imageHint: 'artificial intelligence',
        tags: ['Technology', 'Trends'],
    },
    {
        id: 7,
        title: 'Choosing the Right Email Validation Service for Your Business',
        description: 'Not all validation services are created equal. We outline the essential features to look for to ensure you get the best accuracy and value.',
        author: 'Emily Brown',
        authorAvatar: '',
        date: generateDate(11),
        imageUrl: 'https://picsum.photos/seed/blog7/1200/630',
        imageHint: 'business decision',
        tags: ['Best Practices', 'Review'],
    },
    {
        id: 8,
        title: 'The Beginner\'s Guide to Setting Up Your First Email Campaign',
        description: 'New to email marketing? This step-by-step guide walks you through everything from choosing a platform to sending your first email.',
        author: 'Jane Doe',
        authorAvatar: '',
        date: generateDate(12),
        imageUrl: 'https://picsum.photos/seed/blog8/1200/630',
        imageHint: 'startup launch',
        tags: ['Tutorial', 'Marketing'],
    },
    {
        id: 9,
        title: 'Hard Bounces vs. Soft Bounces: What\'s the Difference?',
        description: 'Bounce rates are a critical health metric for your email list. Understand the difference between hard and soft bounces and how to handle them.',
        author: 'Alice Johnson',
        authorAvatar: '',
        date: generateDate(14),
        imageUrl: 'https://picsum.photos/seed/blog9/1200/630',
        imageHint: 'data analysis',
        tags: ['Deliverability', 'Technical'],
    },
    {
        id: 10,
        title: 'Unlocking ROI: How Clean Data Leads to Better Conversions',
        description: 'Connect the dots between a clean email list and your bottom line. We explore case studies showing how data hygiene directly impacts conversion rates.',
        author: 'John Smith',
        authorAvatar: '',
        date: generateDate(15),
        imageUrl: 'https://picsum.photos/seed/blog10/1200/630',
        imageHint: 'financial growth',
        tags: ['Strategy', 'ROI'],
    },
];
