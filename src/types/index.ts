
export type User = {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  providerId: string;
  plan: 'Trial' | 'Lifetime';
  trialEndsAt: number; // Timestamp
};

export interface List {
  id?: string;
  name: string;
  createdAt: number;
  emailCount: number;
  userId: string;
  data: Record<string, any>[];
}
