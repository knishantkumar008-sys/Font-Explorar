
"use client"

import { useToast } from "@/hooks/use-toast";
import { Card, CardContent } from "@/components/ui/card";
import { textArtCategories } from "@/lib/text-art";

export default function TextArtPage() {
  const { toast } = useToast();

  const copyToClipboard = (art: string) => {
    navigator.clipboard.writeText(art);
    toast({
      title: "Copied!",
      description: `Text art has been copied to clipboard.`,
    });
  };

  return (
    <div className="p-4 md:p-6 space-y-8">
      <div className="space-y-4 text-center">
        <h1 className="text-4xl font-bold tracking-tight">Text Art & ASCII Art</h1>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          Copy and paste stunning text art for your social media posts, comments, and bios. Explore our collection of ASCII art to make your content stand out.
        </p>
      </div>

      <div className="space-y-6">
        {textArtCategories.map((category) => (
          <div key={category.name}>
            <h2 className="text-2xl font-bold mb-4">{category.name}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {category.arts.map((art, index) => (
                <Card key={index} onClick={() => copyToClipboard(art)} className="cursor-pointer hover:bg-accent transition-colors">
                  <CardContent className="p-4">
                    <pre className="text-sm text-center whitespace-pre-wrap">{art}</pre>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
