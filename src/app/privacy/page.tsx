
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function PrivacyPolicyPage() {
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
      <div className="grid gap-4 md:gap-8">
        <div className="mx-auto w-full max-w-4xl">
            <h1 className="text-3xl font-bold tracking-tight text-center">
                Privacy Policy
            </h1>
            <p className="text-muted-foreground text-center mt-2">
                Last updated: December 21, 2025
            </p>
        </div>
        <Card className="w-full max-w-4xl mx-auto bg-card/5 border-white/10 text-white">
          <CardContent className="p-8 space-y-6 text-sm text-foreground/80">
            <p>
              This page informs you of our policies regarding the collection, use, and disclosure of personal data when you use our Service and the choices you have associated with that data.
            </p>

            <div className="space-y-2">
              <h2 className="text-xl font-semibold text-foreground">1. Information Collection and Use</h2>
              <p>
                We collect several different types of information for various purposes to provide and improve our Service to you.
              </p>
              <ul className="list-disc list-inside space-y-1 pl-4">
                <li>
                  <strong>Personal Data:</strong> While using our Service, we may ask you to provide us with certain personally identifiable information that can be used to contact or identify you ("Personal Data"). This includes, but is not limited to: email address, first name and last name, and usage data.
                </li>
                <li>
                  <strong>Uploaded Data:</strong> We collect the email lists you upload for the sole purpose of performing the validation and cleaning services you request. We treat this data as confidential and do not share it with third parties.
                </li>
              </ul>
            </div>

            <div className="space-y-2">
              <h2 className="text-xl font-semibold text-foreground">2. Use of Data</h2>
              <p>
                Cleanmails uses the collected data for various purposes:
              </p>
               <ul className="list-disc list-inside space-y-1 pl-4">
                <li>To provide and maintain our Service</li>
                <li>To notify you about changes to our Service</li>
                <li>To allow you to participate in interactive features of our Service when you choose to do so</li>
                <li>To provide customer support</li>
                <li>To gather analysis or valuable information so that we can improve our Service</li>
                <li>To monitor the usage of our Service</li>
                <li>To detect, prevent and address technical issues</li>
              </ul>
            </div>

            <div className="space-y-2">
              <h2 className="text-xl font-semibold text-foreground">3. Data Storage and Security</h2>
              <p>
                The security of your data is important to us. Your uploaded lists are stored securely using Firebase Firestore and are protected by security rules that restrict access to only your authenticated account. While we strive to use commercially acceptable means to protect your Personal Data, we cannot guarantee its absolute security.
              </p>
            </div>

            <div className="space-y-2">
              <h2 className="text-xl font-semibold text-foreground">4. Data Retention</h2>
              <p>
                We will retain your Personal Data only for as long as is necessary for the purposes set out in this Privacy Policy. We will retain and use your data to the extent necessary to comply with our legal obligations, resolve disputes, and enforce our legal agreements and policies. Your uploaded email lists and the results can be deleted by you from your account at any time.
              </p>
            </div>
            
            <div className="space-y-2">
              <h2 className="text-xl font-semibold text-foreground">5. Service Providers</h2>
              <p>
                We may employ third-party companies and individuals to facilitate our Service ("Service Providers"), to provide the Service on our behalf, to perform Service-related services or to assist us in analyzing how our Service is used. These third parties have access to your Personal Data only to perform these tasks on our behalf and are obligated not to disclose or use it for any other purpose.
              </p>
            </div>
            
            <div className="space-y-2">
              <h2 className="text-xl font-semibold text-foreground">6. Children's Privacy</h2>
              <p>
                Our Service does not address anyone under the age of 18 ("Children"). We do not knowingly collect personally identifiable information from anyone under the age of 18.
              </p>
            </div>

            <div className="space-y-2">
              <h2 className="text-xl font-semibold text-foreground">7. Changes to This Privacy Policy</h2>
              <p>
                We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page. You are advised to review this Privacy Policy periodically for any changes.
              </p>
            </div>

            <div className="space-y-2">
              <h2 className="text-xl font-semibold text-foreground">8. Contact Us</h2>
              <p>
                If you have any questions about this Privacy Policy, please contact us at:{" "}
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
