"use client"

import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent } from "@/components/ui/card";
import { textArtCategories } from "@/lib/text-art";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { generateTextArt } from "@/ai/flows/text-art-flow";
import { Sparkles, Copy, Loader2 } from "lucide-react";

function AiTextArtGenerator() {
  const { toast } = useToast();
  const [prompt, setPrompt] = useState("");
  const [generatedArt, setGeneratedArt] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerate = async () => {
    if (!prompt) {
      toast({
        title: "Prompt is empty",
        description: "Please enter a prompt to generate text art.",
        variant: "destructive",
      });
      return;
    }
    setIsLoading(true);
    setGeneratedArt(null);
    try {
      const result = await generateTextArt({ prompt });
      setGeneratedArt(result.textArt);
    } catch (error) {
      console.error("Error generating text art:", error);
      toast({
        title: "Error",
        description: "Failed to generate text art. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = (art: string) => {
    navigator.clipboard.writeText(art);
    toast({
      title: "Copied!",
      description: "AI text art has been copied to clipboard.",
    });
  };

  return (
    <Card className="shadow-lg rounded-2xl mb-8">
      <CardContent className="p-6">
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <Sparkles className="h-6 w-6 text-primary" />
          AI Text Art Generator
        </h2>
        <p className="text-muted-foreground mb-4">
          Describe what you want to create, and let our AI generate unique text art for you! For example, try "a rocket ship" or "a smiling dog".
        </p>
        <div className="flex gap-2 mb-4">
          <Input
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="e.g., a cat sitting on a moon"
            disabled={isLoading}
          />
          <Button onClick={handleGenerate} disabled={isLoading}>
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              "Generate"
            )}
          </Button>
        </div>

        {isLoading && (
           <Card className="cursor-pointer bg-muted/50 transition-colors">
             <CardContent className="p-4">
                <pre className="text-sm text-center whitespace-pre-wrap text-muted-foreground">Generating your masterpiece...</pre>
             </CardContent>
           </Card>
        )}

        {generatedArt && (
          <Card className="cursor-pointer bg-accent/20 hover:bg-accent/40 transition-colors relative group">
            <CardContent className="p-4" onClick={() => copyToClipboard(generatedArt)}>
              <pre className="text-sm text-center whitespace-pre-wrap">{generatedArt}</pre>
              <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button variant="ghost" size="icon" onClick={(e) => { e.stopPropagation(); copyToClipboard(generatedArt); }}>
                  <Copy className="h-5 w-5" />
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </CardContent>
    </Card>
  );
}


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
    <div className="p-4 md:p-6 space-y-6">
      <AiTextArtGenerator />
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
  );
}
