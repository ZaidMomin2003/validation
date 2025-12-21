
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function DeliveryPolicyPage() {
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
      <div className="grid gap-4 md:gap-8">
        <div className="mx-auto w-full max-w-4xl">
            <h1 className="text-3xl font-bold tracking-tight text-center">
                Delivery Policy
            </h1>
            <p className="text-muted-foreground text-center mt-2">
                Last updated: December 21, 2025
            </p>
        </div>
        <Card className="w-full max-w-4xl mx-auto">
          <CardContent className="p-8 space-y-6 text-sm text-foreground/80">
            <p>
              This Delivery Policy outlines how our services are delivered to you upon purchase and use of the Verilist platform.
            </p>

            <div className="space-y-2">
              <h2 className="text-xl font-semibold text-foreground">1. Service Delivery</h2>
              <p>
                Verilist provides a digital service for cleaning and validating email lists. Upon successful file upload and initiation of a validation or cleaning process, our service begins immediately.
              </p>
               <ul className="list-disc list-inside space-y-1 pl-4">
                <li>
                  <strong>Processing:</strong> Your list is processed in the background. You can navigate away from the page and track the progress on your "Lists" dashboard.
                </li>
                <li>
                  <strong>Completion:</strong> Once the process is complete, the status of your list will be updated to "Completed" on your dashboard.
                </li>
              </ul>
            </div>

            <div className="space-y-2">
              <h2 className="text-xl font-semibold text-foreground">2. Access to Results</h2>
              <p>
                Upon completion of the validation or cleaning process, your results will be available for download directly from your user dashboard.
              </p>
              <ul className="list-disc list-inside space-y-1 pl-4">
                <li>
                  <strong>Download Format:</strong> Results are provided in a downloadable CSV (Comma-Separated Values) file.
                </li>
                <li>
                  <strong>Availability:</strong> Your processed lists and their results are stored securely in your account and can be accessed and downloaded at any time, as long as your account is active.
                </li>
              </ul>
            </div>

            <div className="space-y-2">
              <h2 className="text-xl font-semibold text-foreground">3. No Physical Delivery</h2>
              <p>
                As Verilist is a purely digital service, no physical products will be shipped or delivered. All services and results are delivered electronically through our web platform.
              </p>
            </div>
            
            <div className="space-y-2">
              <h2 className="text-xl font-semibold text-foreground">4. Refund Policy</h2>
              <p>
                Due to the immediate, digital, and automated nature of our service, we do not offer refunds once a purchase is made or a validation process has begun. We incur costs for every email processed. All sales are final. We are committed to providing the best possible service and will work with you to resolve any issues you might encounter.
              </p>
            </div>

            <div className="space-y-2">
              <h2 className="text-xl font-semibold text-foreground">5. Contact Us</h2>
              <p>
                If you have any questions about our Delivery Policy or are experiencing issues accessing your results, please contact us at:{" "}
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
