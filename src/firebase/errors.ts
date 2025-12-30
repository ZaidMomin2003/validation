
export type SecurityRuleContext = {
  path: string;
  operation: 'get' | 'list' | 'create' | 'update' | 'delete';
  requestResourceData?: any;
};

export class FirestorePermissionError extends Error {
  context: SecurityRuleContext;

  constructor(context: SecurityRuleContext) {
    const message = `FirestoreError: Missing or insufficient permissions: The following request was denied by Firestore Security Rules:\n${JSON.stringify(
      {
        context: context,
      },
      null,
      2
    )}`;
    super(message);
    this.name = 'FirestorePermissionError';
    this.context = context;
    
    // This is to make the error visible in the Next.js dev overlay
    if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
        setTimeout(() => {
            const event = new ErrorEvent('error', { error: this });
            window.dispatchEvent(event);
        }, 0);
    }
  }
}
