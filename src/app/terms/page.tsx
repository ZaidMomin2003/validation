
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function TermsOfServicePage() {
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
      <div className="grid gap-4 md:gap-8">
        <div className="mx-auto w-full max-w-4xl">
            <h1 className="text-3xl font-bold tracking-tight text-center">
                Terms and Conditions
            </h1>
            <p className="text-muted-foreground text-center mt-2">
                Last updated: December 21, 2025
            </p>
        </div>
        <Card className="w-full max-w-4xl mx-auto bg-card/5 border-white/10 text-white">
          <CardContent className="p-8 space-y-6 text-sm text-foreground/80">
            <p>
              Welcome to Cleanmails! These Terms and Conditions ("Terms") govern
              your use of our website and services (collectively, the "Service"). Please read these Terms
              carefully before using our Service.
            </p>

            <div className="space-y-2">
              <h2 className="text-xl font-semibold text-foreground">1. Acceptance of Terms</h2>
              <p>
                By accessing or using the Service, you agree to be bound by
                these Terms. If you disagree with any part of the terms, then
                you may not access the Service.
              </p>
            </div>

            <div className="space-y-2">
              <h2 className="text-xl font-semibold text-foreground">2. Description of Service</h2>
              <p>
                Cleanmails provides email list cleaning and validation services. This
                includes, but is not limited to, syntax checking, domain/MX record
                verification, disposable email detection, and role-based account
                detection.
              </p>
            </div>

            <div className="space-y-2">
              <h2 className="text-xl font-semibold text-foreground">3. User Accounts</h2>
              <p>
                When you create an account with us, you must provide us with
                information that is accurate, complete, and current at all times.
                Failure to do so constitutes a breach of the Terms, which may
                result in immediate termination of your account on our Service.
                You are responsible for safeguarding the password that you use to
                access the Service and for any activities or actions under your
                password.
              </p>
            </div>

            <div className="space-y-2">
              <h2 className="text-xl font-semibold text-foreground">4. User Data and Privacy</h2>
              <p>
                We are committed to protecting your privacy. The data you upload
                to our Service remains your property. We will not use your data
                for any purpose other than providing the Service to you. Our use
                of your data is governed by our Privacy Policy, which is
                incorporated into these Terms by reference.
              </p>
            </div>

            <div className="space-y-2">
              <h2 className="text-xl font-semibold text-foreground">5. Prohibited Uses</h2>
              <p>
                You agree not to use the Service for any unlawful purpose or in
                any way that could damage, disable, overburden, or impair the
                Service. You agree not to upload any data that you do not have
                the legal right to possess and process.
              </p>
            </div>

            <div className="space-y-2">
              <h2 className="text-xl font-semibold text-foreground">6. Payments and Refunds</h2>
              <p>
                Certain aspects of the Service may be provided for a fee. All
                payments are due upon purchase. Due to the nature of our digital
                service and the costs associated with processing email lists, we
                adhere to a strict no-refund policy. All purchases are final and
                non-refundable. We will, however, make our best effort to provide
                the highest quality of service and address any issues you may
                encounter.
              </p>
            </div>

             <div className="space-y-2">
              <h2 className="text-xl font-semibold text-foreground">7. Limitation of Liability</h2>
              <p>
                In no event shall Cleanmails, nor its directors, employees, partners,
                agents, suppliers, or affiliates, be liable for any indirect,
                incidental, special, consequential or punitive damages, including
                without limitation, loss of profits, data, use, goodwill, or
                other intangible losses, resulting from your access to or use of
                or inability to access or use the Service.
              </p>
            </div>

            <div className="space-y-2">
              <h2 className="text-xl font-semibold text-foreground">8. Changes to Terms</h2>
              <p>
                We reserve the right, at our sole discretion, to modify or
                replace these Terms at any time. We will provide notice of any
                changes by posting the new Terms on this page. Your continued use
                of the Service after any such changes constitutes your acceptance
                of the new Terms.
              </p>
            </div>

            <div className="space-y-2">
              <h2 className="text-xl font-semibold text-foreground">9. Contact Us</h2>
              <p>
                If you have any questions about these Terms, please contact us at:{" "}
                <a href="mailto:hii@talxify.space" className="text-primary hover:underline">
                  hii@talxify.space
                </a>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
