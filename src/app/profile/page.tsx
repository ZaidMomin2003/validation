
'use client';

import React, { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { updateProfile, updatePassword, deleteUser, reauthenticateWithCredential, EmailAuthProvider } from 'firebase/auth';
import { auth } from '@/firebase/firebaseClient';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';

export default function ProfilePage() {
  const { user, loading: authLoading } = useAuth();
  const { toast } = useToast();
  const router = useRouter();

  const [displayName, setDisplayName] = useState(user?.displayName || '');
  const [newPassword, setNewPassword] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  
  const [isUpdatingName, setIsUpdatingName] = useState(false);
  const [isUpdatingPassword, setIsUpdatingPassword] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const [showReauthDialog, setShowReauthDialog] = useState(false);
  const [reauthPassword, setReauthPassword] = useState('');
  const [pendingAction, setPendingAction] = useState<(() => Promise<void>) | null>(null);


  const handleUpdateName = async () => {
    if (!user) return;
    setIsUpdatingName(true);
    try {
      await updateProfile(user, { displayName });
      toast({
        title: 'Success',
        description: 'Your name has been updated.',
      });
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Error updating name',
        description: error.message,
      });
    } finally {
      setIsUpdatingName(false);
    }
  };

  const performPasswordChange = async () => {
    if (!user) return;
    setIsUpdatingPassword(true);
    try {
      await updatePassword(user, newPassword);
      toast({
        title: 'Success',
        description: 'Your password has been changed.',
      });
      setNewPassword('');
    } catch (error: any) {
       if (error.code === 'auth/requires-recent-login') {
            toast({
                variant: 'destructive',
                title: 'Action requires recent login',
                description: 'Please re-authenticate to change your password.',
            });
            setPendingAction(() => performPasswordChange);
            setShowReauthDialog(true);
        } else {
            toast({
                variant: 'destructive',
                title: 'Error changing password',
                description: error.message,
            });
        }
    } finally {
      setIsUpdatingPassword(false);
    }
  };

  const performDeleteAccount = async () => {
    if (!user) return;
    setIsDeleting(true);
    try {
      await deleteUser(user);
      toast({
        title: 'Account Deleted',
        description: 'Your account has been successfully deleted.',
      });
      router.push('/auth');
    } catch (error: any) {
       if (error.code === 'auth/requires-recent-login') {
            toast({
                variant: 'destructive',
                title: 'Action requires recent login',
                description: 'Please re-authenticate to delete your account.',
            });
            setPendingAction(() => performDeleteAccount);
            setShowReauthDialog(true);
        } else {
            toast({
                variant: 'destructive',
                title: 'Error deleting account',
                description: error.message,
            });
        }
    } finally {
      setIsDeleting(false);
    }
  };

  const handleReauthenticate = async () => {
    if (!user || !user.email || !pendingAction) return;

    try {
        const credential = EmailAuthProvider.credential(user.email, reauthPassword);
        await reauthenticateWithCredential(user, credential);
        setShowReauthDialog(false);
        setReauthPassword('');
        await pendingAction();
        setPendingAction(null);
    } catch (error: any) {
        toast({
            variant: 'destructive',
            title: 'Authentication Failed',
            description: 'The password you entered is incorrect. Please try again.',
        });
    }
  };


  if (authLoading) {
    return (
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div className="grid gap-4 md:gap-8">
          <div className="flex items-center justify-center">
            <Loader2 className="h-12 w-12 animate-spin" />
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
      <div className="grid gap-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Profile</h1>
          <p className="text-muted-foreground">Manage your profile settings.</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Profile Information</CardTitle>
            <CardDescription>Update your display name and email address.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="displayName">Display Name</Label>
              <Input
                id="displayName"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" value={user?.email ?? ''} disabled />
            </div>
          </CardContent>
          <div className="border-t p-6 flex justify-end">
            <Button onClick={handleUpdateName} disabled={isUpdatingName || user?.displayName === displayName}>
              {isUpdatingName && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Save Changes
            </Button>
          </div>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Change Password</CardTitle>
            <CardDescription>Enter a new password to update your account.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="newPassword">New Password</Label>
              <Input
                id="newPassword"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="••••••••••••"
              />
            </div>
          </CardContent>
          <div className="border-t p-6 flex justify-end">
            <Button onClick={performPasswordChange} disabled={isUpdatingPassword || !newPassword}>
              {isUpdatingPassword && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Update Password
            </Button>
          </div>
        </Card>

        <Card className="border-destructive">
          <CardHeader>
            <CardTitle className="text-destructive">Danger Zone</CardTitle>
            <CardDescription>These actions are irreversible. Please proceed with caution.</CardDescription>
          </CardHeader>
          <CardContent className="flex justify-between items-center">
            <p className="font-medium">Delete your account</p>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive" disabled={isDeleting}>
                    {isDeleting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Delete Account
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete your account and remove your data from our servers.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={performDeleteAccount} className="bg-destructive hover:bg-destructive/90">
                    Yes, delete my account
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </CardContent>
        </Card>

        <Dialog open={showReauthDialog} onOpenChange={setShowReauthDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Re-authentication Required</DialogTitle>
              <DialogDescription>
                For your security, please enter your current password to continue.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="reauth-password">Current Password</Label>
                <Input
                  id="reauth-password"
                  type="password"
                  value={reauthPassword}
                  onChange={(e) => setReauthPassword(e.target.value)}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => {
                  setShowReauthDialog(false);
                  setPendingAction(null);
                  setReauthPassword('');
              }}>Cancel</Button>
              <Button onClick={handleReauthenticate}>Confirm</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

      </div>
    </main>
  );
}
