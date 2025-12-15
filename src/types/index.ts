export type User = {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  providerId: string;
};

export interface List {
  id?: string;
  name: string;
  createdAt: number;
  progress: number;
  emailCount: number;
  good: number;
  risky: number;
  bad: number;
  userId: string;
}
