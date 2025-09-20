
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function TermsPage() {
  return (
    <div className="p-4 md:p-6 space-y-6">
      <div className="space-y-2 text-center">
        <h1 className="text-4xl font-bold">Terms and Conditions</h1>
        <p className="text-muted-foreground">Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
      </div>

      <Card>
        <CardHeader><CardTitle>1. Introduction</CardTitle></CardHeader>
        <CardContent className="space-y-4 text-card-foreground">
          <p>Welcome to Font Explorer ("we," "our," or "us"). These Terms and Conditions govern your use of our website. By accessing or using our website, you agree to be bound by these Terms and Conditions. If you disagree with any part of the terms, then you may not access the website.</p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader><CardTitle>2. Use of Our Service</CardTitle></CardHeader>
        <CardContent className="space-y-4 text-card-foreground">
          <p>Font Explorer provides a service to generate fancy text styles using Unicode characters. You are free to copy and paste the generated text for personal and commercial use, such as in social media profiles, posts, and messages.</p>
          <p>You agree not to use the service for any unlawful purpose or in any way that could damage, disable, overburden, or impair the website.</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle>3. Intellectual Property</CardTitle></CardHeader>
        <CardContent className="space-y-4 text-card-foreground">
          <p>The website and its original content, features, and functionality are owned by Font Explorer and are protected by international copyright, trademark, and other intellectual property laws. The generated font styles are based on Unicode characters, which are in the public domain.</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle>4. Limitation of Liability</CardTitle></CardHeader>
        <CardContent className="space-y-4 text-card-foreground">
          <p>In no event shall Font Explorer, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the service.</p>
          <p>We do not warrant that all generated font styles will be compatible with all platforms or devices. Some characters may not render correctly on certain systems.</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle>5. Changes to Terms</CardTitle></CardHeader>
        <CardContent className="space-y-4 text-card-foreground">
          <p>We reserve the right, at our sole discretion, to modify or replace these Terms at any time. We will provide notice of any changes by posting the new Terms and Conditions on this page. Your continued use of the website after any such changes constitutes your acceptance of the new Terms and Conditions.</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle>6. Contact Us</CardTitle></CardHeader>
        <CardContent className="space-y-4 text-card-foreground">
          <p>If you have any questions about these Terms, please contact us through our contact page.</p>
        </CardContent>
      </Card>
    </div>
  );
}
