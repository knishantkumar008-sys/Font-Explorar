
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Sparkles, Heart, Rss } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function AboutPage() {
  return (
    <div className="p-4 md:p-6 space-y-8">
      <div className="space-y-4 text-center">
        <h1 className="text-4xl font-bold tracking-tight">About Font Explorer</h1>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          Welcome to Font Explorer, your creative partner for discovering, generating, and experimenting with a universe of beautiful fonts and text styles.
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
              Our mission is to empower creators, designers, and social media enthusiasts with a powerful and intuitive tool to explore, preview, and apply unique fonts. We believe that finding the perfect text style should be an inspiring, seamless, and enjoyable experience.
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
             Font Explorer offers a rich suite of tools, including real-time previews with our fancy text generator, a vast library of copy-and-paste symbols, and a collection of text art. Our goal is to give you a complete playground to see how fonts and styles will elevate your digital presence.
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
              Dive into our blog for typography tips, design inspiration, font-pairing guides, and articles on the latest trends in the digital world. It's your go-to resource for staying creative and informed.
            </p>
            <Button asChild>
                <Link href="/blog">Read The Blog</Link>
            </Button>
          </CardContent>
        </Card>
      </div>

       <div className="pt-8 text-center">
          <h2 className="text-2xl font-bold mb-4">A Word From Our Team</h2>
          <p className="text-muted-foreground max-w-3xl mx-auto">
            We are passionate about design and technology, and we built Font Explorer to share that passion with you. We're thrilled to have you here and hope you enjoy exploring the endless possibilities. Thank you for being part of our community. Happy designing!
          </p>
        </div>
    </div>
  );
}
