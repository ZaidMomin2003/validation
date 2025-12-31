
import type { Metadata } from 'next';
import AuthClient from './AuthClient';

export const metadata: Metadata = {
  title: 'Sign In / Sign Up | Cleanmails',
  description: 'Access your Cleanmails account or create a new one for free. Start validating your email lists in minutes.',
};

export default function AuthPage() {
    return <AuthClient />;
}
