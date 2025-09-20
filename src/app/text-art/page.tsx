
"use client"

import { useToast } from "@/hooks/use-toast";
import { textArtCategories } from "@/lib/text-art";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Copy } from "lucide-react";

export default function TextArtPage() {
  const { toast } = useToast();

  const copyToClipboard = (art: string) => {
    navigator.clipboard.writeText(art);
    toast({
      title: "Copied!",
      description: "The text art has been copied to your clipboard.",
    });
  };

  return (
    <div className="p-4 md:p-6 space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold tracking-tight">Text Art</h1>
        <p className="text-lg text-muted-foreground mt-2 max-w-2xl mx-auto">
          Browse and copy cool text art made from symbols. Perfect for comments, posts, and social media!
        </p>
      </div>
      
      {textArtCategories.map((category) => (
        <div key={category.name}>
          <h2 className="text-2xl font-bold mb-4">{category.name}</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {category.arts.map((art, index) => (
                <Card key={`${category.name}-${index}`} className="shadow-lg rounded-2xl flex flex-col justify-between">
                    <CardContent className="p-4">
                        <pre className="text-sm font-mono whitespace-pre-wrap break-words text-center">
                            {art}
                        </pre>
                    </CardContent>
                    <div className="p-2 text-center">
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => copyToClipboard(art)}
                        >
                            <Copy className="h-4 w-4 mr-2" />
                            Copy
                        </Button>
                    </div>
                </Card>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
