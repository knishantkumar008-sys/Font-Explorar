
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Sparkles, Heart, Rss } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function AboutPage() {
  return (
    <div className="p-4 md:p-6 space-y-8 text-center">
      <div className="space-y-2">
        <h1 className="text-4xl font-bold tracking-tight">About Font Explorer</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Welcome to Font Explorer, your creative partner for discovering and experimenting with the world of typography.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6 text-left">
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
              Font Explorer offers a comprehensive suite of tools including real-time font previews, style adjustments for weight and size, and color customization. Our goal is to give you a complete picture of how a font will look and feel in your design.
            </p>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid md:grid-cols-1 gap-6 text-left">
        <Card className="shadow-lg rounded-2xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Rss className="h-6 w-6 text-primary" />
              Explore Our Blog
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-card-foreground">
            <p>
              Visit our blog for typography tips, design inspiration, font pairing guides, and interviews with industry professionals. It's your go-to resource for staying creative and informed in the world of design.
            </p>
            <Button asChild>
                <Link href="/blog">Read The Blog</Link>
            </Button>
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
