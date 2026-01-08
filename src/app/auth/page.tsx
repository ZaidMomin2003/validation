
import type { Metadata } from 'next';
import AuthClient from './AuthClient';

export const metadata: Metadata = {
  title: 'Sign In | Cleanmails',
  description: 'Access your Cleanmails account with Google. Start validating your email lists in seconds.',
};

export default function AuthPage() {
    return <AuthClient />;
}
