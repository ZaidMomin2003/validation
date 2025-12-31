
import type { Metadata } from 'next';
import ForgotPasswordClient from './ForgotPasswordClient';

export const metadata: Metadata = {
  title: 'Forgot Password | Cleanmails',
  description: 'Reset your password for your Cleanmails account. Enter your email to receive a reset link.',
};

export default function ForgotPasswordPage() {
    return <ForgotPasswordClient />;
}
