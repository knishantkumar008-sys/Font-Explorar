"use client"

import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { textArtCategories } from "@/lib/text-art";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { generateTextArt } from "@/ai/flows/text-art-flow";
import { Loader } from "lucide-react";

export default function TextArtPage() {
  const { toast } = useToast();
  const [prompt, setPrompt] = useState("");
  const [generatedArt, setGeneratedArt] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [dailyLimit, setDailyLimit] = useState(0);

  const copyToClipboard = (art: string) => {
    navigator.clipboard.writeText(art);
    toast({
      title: "Copied!",
      description: `Text art has been copied to clipboard.`,
    });
  };

  const handleGenerate = async () => {
    if (!prompt) {
      setError("Please enter a description for the text art.");
      return;
    }
    if (dailyLimit >= 12) {
      setError("You have reached your daily limit of 12 generations.");
      toast({
        title: "Daily Limit Reached",
        description: "You can generate more text art after 24 hours.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    setError("");
    setGeneratedArt("");

    try {
      const result = await generateTextArt(prompt);
      if (result) {
        setGeneratedArt(result);
        const newLimit = dailyLimit + 1;
        setDailyLimit(newLimit);
        // Store the new limit and timestamp in local storage
        const now = new Date().getTime();
        localStorage.setItem('textArtLimit', JSON.stringify({ count: newLimit, timestamp: now }));

      } else {
        setError("Could not generate text art. Please try again.");
      }
    } catch (e) {
      setError("An error occurred. Please try again later.");
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useState(() => {
    const savedLimit = localStorage.getItem('textArtLimit');
    if (savedLimit) {
      const { count, timestamp } = JSON.parse(savedLimit);
      const now = new Date().getTime();
      const hoursPassed = (now - timestamp) / (1000 * 60 * 60);
      if (hoursPassed > 24) {
        localStorage.removeItem('textArtLimit');
        setDailyLimit(0);
      } else {
        setDailyLimit(count);
      }
    }
  });


  return (
    <div className="p-4 md:p-6 space-y-8">

      <Card className="shadow-lg rounded-2xl">
        <CardHeader>
          <CardTitle>AI Text Art Generator</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">
            Describe the text art you want to create. For example, "a rose", "a cat sitting", or "a heart with wings". You can generate up to 12 images per day.
          </p>
          <div className="space-y-2">
            <Textarea
              placeholder="e.g., a cute cat"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
            />
            <Button onClick={handleGenerate} disabled={loading || dailyLimit >= 12}>
              {loading && <Loader className="mr-2 h-4 w-4 animate-spin" />}
              Generate
            </Button>
            <p className="text-sm text-muted-foreground">
              Generations left today: {12 - dailyLimit}
            </p>
          </div>
          {error && <p className="text-sm font-medium text-destructive">{error}</p>}
          {loading && (
            <div className="flex items-center justify-center p-8">
              <Loader className="h-8 w-8 animate-spin text-primary" />
            </div>
          )}
          {generatedArt && (
            <Card onClick={() => copyToClipboard(generatedArt)} className="cursor-pointer hover:bg-accent transition-colors">
              <CardContent className="p-4">
                <pre className="text-sm text-center whitespace-pre-wrap">{generatedArt}</pre>
              </CardContent>
            </Card>
          )}
        </CardContent>
      </Card>


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
