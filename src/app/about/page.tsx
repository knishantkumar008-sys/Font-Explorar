
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Sparkles, Heart } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="p-4 md:p-6 space-y-8 text-center">
      <div className="space-y-2">
        <h1 className="text-4xl font-bold tracking-tight">About Fancy Text Generator</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Welcome to the ultimate destination for transforming your plain text into eye-catching, stylish, and fun fonts!
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
              In a world saturated with digital content, standing out is more important than ever. Our mission is simple: to provide you with the easiest and most creative way to express yourself online. We believe that your words deserve to be as unique as you are.
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
              Our tool offers a vast collection of fancy text styles, from elegant cursive and bold gothic to cute and weird symbol-based fonts. Whether you're looking to spice up your social media bio, make your posts pop, or add a unique touch to your messages, we've got a style for every mood and occasion.
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
              We are dedicated to providing a user-friendly experience. Our website is designed to be fast, intuitive, and accessible on any device. We are constantly updating our collection with new and exciting font styles, so there's always something fresh to discover.
            </p>
          </CardContent>
        </Card>
      </div>

       <div className="pt-8">
          <h2 className="text-2xl font-bold mb-4">Thank You for Visiting!</h2>
          <p className="text-muted-foreground max-w-3xl mx-auto">
            We're thrilled to have you here and hope you have fun exploring all the creative possibilities. Go ahead, type something in, and see your words come to life in ways you never imagined!
          </p>
        </div>
    </div>
  );
}
