
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function PrivacyPage() {
  return (
    <div className="p-4 md:p-6 space-y-6">
      <div className="space-y-2 text-center">
        <h1 className="text-4xl font-bold">Privacy Policy</h1>
        <p className="text-muted-foreground">Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
      </div>

      <Card>
        <CardHeader><CardTitle>Introduction</CardTitle></CardHeader>
        <CardContent className="space-y-4 text-card-foreground">
          <p>Welcome to Fancy Text Generator ("we," "our," or "us"). We are committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website. Please read this privacy policy carefully. If you do not agree with the terms of this privacy policy, please do not access the site.</p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader><CardTitle>Information We Collect</CardTitle></CardHeader>
        <CardContent className="space-y-4 text-card-foreground">
          <p>We may collect information about you in a variety of ways. The information we may collect on the Site includes:</p>
          <h3 className="font-semibold">Log and Usage Data</h3>
          <p>Log and usage data is service-related, diagnostic, usage, and performance information our servers automatically collect when you access or use our Site and which we record in log files. This data may include your IP address, browser type, operating system, referring URLs, pages visited, and timestamps.</p>
          <h3 className="font-semibold">Cookies and Tracking Technologies</h3>
          <p>We may use cookies and other tracking technologies to collect and store your information. We use this information for purposes such as analyzing site traffic, understanding user preferences, and improving our service. Our partners, including Google AdSense, may also use cookies to serve ads based on a user's prior visits to our website or other websites.</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle>How We Use Your Information</CardTitle></CardHeader>
        <CardContent className="space-y-4 text-card-foreground">
          <p>Having accurate information permits us to provide you with a smooth, efficient, and customized experience. Specifically, we may use information collected about you via the Site to:</p>
          <ul className="list-disc list-inside space-y-2">
            <li>Analyze usage and trends to improve our website and services.</li>
            <li>Deliver targeted advertising to you.</li>
            <li>Monitor and prevent security threats, fraud, and other illegal activities.</li>
            <li>Compile anonymous statistical data for use internally or with third parties.</li>
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle>Third-Party Advertising</CardTitle></CardHeader>
        <CardContent className="space-y-4 text-card-foreground">
          <p>We may use third-party advertising companies to serve ads when you visit the Site. These companies may use information about your visits to our Site and other websites that are contained in web cookies in order to provide advertisements about goods and services of interest to you.</p>
          <p>We use Google AdSense as our advertising partner. Google's use of advertising cookies enables it and its partners to serve ads to our users based on their visit to our sites and/or other sites on the Internet. You may opt out of personalized advertising by visiting <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Ads Settings</a>.</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle>Your Privacy Rights</CardTitle></CardHeader>
        <CardContent className="space-y-4 text-card-foreground">
          <p>You have the right to control your data. Most web browsers are set to accept cookies by default. You can usually choose to set your browser to remove cookies and to reject cookies. If you choose to remove or reject cookies, this could affect certain features of our Site.</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle>Contact Us</CardTitle></CardHeader>
        <CardContent className="space-y-4 text-card-foreground">
          <p>If you have questions or comments about this Privacy Policy, please contact us through our contact page.</p>
        </CardContent>
      </Card>
    </div>
  );
}
