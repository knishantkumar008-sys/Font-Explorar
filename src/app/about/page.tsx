
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Sparkles, Heart, Rss } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="p-4 md:p-6 space-y-8 text-center">
      <div className="space-y-2">
        <h1 className="text-4xl font-bold tracking-tight">About Font Explorer</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Welcome to Font Explorer, your creative partner for discovering and experimenting with the world of typography.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6 text-left">
        <Card className="shadow-lg rounded-2xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-6 w-6 text-primary" />
              Our Mission
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-card-foreground">
            <p>
              Our mission is to provide designers, developers, and typography enthusiasts with a powerful and intuitive tool to explore, preview, and customize fonts for their projects. We believe that finding the perfect font should be an inspiring and seamless experience.
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-lg rounded-2xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="h-6 w-6 text-primary" />
              What We Offer
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-card-foreground">
            <p>
              Font Explorer offers a comprehensive suite of tools including real-time font previews, style adjustments for weight and size, and color customization for both text and background. Our goal is to give you a complete picture of how a font will look and feel in your design.
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-lg rounded-2xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Heart className="h-6 w-6 text-primary" />
              Our Commitment
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-card-foreground">
            <p>
              We are dedicated to providing a high-quality, user-friendly experience. Our platform is designed to be fast, responsive, and accessible on any device. We are constantly working to expand our font library and improve our tools to meet your creative needs.
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid md:grid-cols-1 gap-6 text-left">
        <Card className="shadow-lg rounded-2xl">
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Rss className="h-6 w-6 text-primary" />
                    Stay Tuned!
                </CardTitle>
            </CardHeader>
            <CardContent>
                <p  className="text-card-foreground">
                    We're excited to announce that we'll soon be launching a blog! It will be your go-to resource for typography tips, design inspiration, font pairing guides, and interviews with industry professionals. Keep an eye out for updates!
                </p>
            </CardContent>
        </Card>
      </div>

       <div className="pt-8">
          <h2 className="text-2xl font-bold mb-4">Thank You for Visiting!</h2>
          <p className="text-muted-foreground max-w-3xl mx-auto">
            We're thrilled to have you here and hope you enjoy exploring the endless possibilities with Font Explorer. Happy designing!
          </p>
        </div>
    </div>
  );
}
