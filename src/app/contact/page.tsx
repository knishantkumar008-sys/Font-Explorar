
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, MessageCircle, Share2 } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="p-4 md:p-6 space-y-8">
      <div className="space-y-4 text-center">
        <h1 className="text-4xl font-bold tracking-tight">Contact Us</h1>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          We’d love to hear from you! Whether you have questions, feedback, or suggestions, please don’t hesitate to get in touch.
        </p>
      </div>

      <div className="grid md:grid-cols-1 gap-6 text-left">
        <Card className="shadow-lg rounded-2xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mail className="h-6 w-6 text-primary" />
              General Inquiries
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-card-foreground">
            <p>
              For general questions, partnership opportunities, or other inquiries, please email us at:
            </p>
            <a href="mailto:contact@fontexplorer.com" className="text-primary font-semibold hover:underline">
              contact@fontexplorer.com
            </a>
            <p>
              We do our best to respond to all emails within 48 hours.
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-lg rounded-2xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageCircle className="h-6 w-6 text-primary" />
              Feedback & Suggestions
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-card-foreground">
            <p>
              Have an idea for a new font style or a suggestion to improve our website? We are always looking for ways to make Font Explorer better. Share your thoughts with us!
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-lg rounded-2xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Share2 className="h-6 w-6 text-primary" />
              Follow Us
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-card-foreground">
            <p>
              Stay updated with the latest font styles, blog posts, and announcements by following us on our social media channels (coming soon).
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
