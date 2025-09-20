
"use client"

import { useToast } from "@/hooks/use-toast";
import { Card, CardContent } from "@/components/ui/card";
import { textArtCategories } from "@/lib/text-art";
import { useState, useEffect, useTransition } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { generateTextArt } from '@/ai/flows/text-art-flow';
import { Loader } from 'lucide-react';

const DAILY_LIMIT = 12;

export default function TextArtPage() {
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();
  const [prompt, setPrompt] = useState('');
  const [generatedArt, setGeneratedArt] = useState<string[]>([]);
  const [limit, setLimit] = useState({ count: DAILY_LIMIT, timestamp: new Date().getTime() });

  useEffect(() => {
    const savedLimit = localStorage.getItem('textArtLimit');
    if (savedLimit) {
      const { count, timestamp } = JSON.parse(savedLimit);
      const now = new Date().getTime();
      const hoursPassed = (now - timestamp) / (1000 * 60 * 60);

      if (hoursPassed > 24) {
        setLimit({ count: DAILY_LIMIT, timestamp: now });
        localStorage.setItem('textArtLimit', JSON.stringify({ count: DAILY_LIMIT, timestamp: now }));
      } else {
        setLimit({ count, timestamp });
      }
    } else {
       const now = new Date().getTime();
       setLimit({ count: DAILY_LIMIT, timestamp: now });
       localStorage.setItem('textArtLimit', JSON.stringify({ count: DAILY_LIMIT, timestamp: now }));
    }
  }, []);

  const copyToClipboard = (art: string) => {
    navigator.clipboard.writeText(art);
    toast({
      title: "Copied!",
      description: `Text art has been copied to clipboard.`,
    });
  };

  const handleGenerate = () => {
    if (limit.count <= 0) {
      toast({
        title: "Daily limit reached",
        description: "You have reached your daily limit for generating text art.",
        variant: "destructive",
      });
      return;
    }

    startTransition(async () => {
      try {
        const result = await generateTextArt(prompt);
        setGeneratedArt(result.art);

        const newCount = limit.count - 1;
        const newLimit = { ...limit, count: newCount };
        setLimit(newLimit);
        localStorage.setItem('textArtLimit', JSON.stringify(newLimit));

      } catch (error) {
        toast({
          title: 'Error generating art',
          description: 'There was an error generating the text art. Please try again.',
          variant: 'destructive'
        });
      }
    });
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleGenerate();
    }
  };

  return (
    <div className="p-4 md:p-6 space-y-8">
      <div className="space-y-4 text-center">
        <h1 className="text-4xl font-bold tracking-tight">Text Art & ASCII Art</h1>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          Unleash your creativity with our AI Text Art Generator or explore our collection of classic ASCII art to make your content stand out.
        </p>
      </div>

      <Card className="shadow-lg rounded-2xl">
        <CardContent className="p-6 space-y-4">
          <div className="flex justify-between items-center">
             <h2 className="text-2xl font-bold">AI Text Art Generator</h2>
             <p className="text-sm text-muted-foreground">{limit.count}/{DAILY_LIMIT} generations left</p>
          </div>
          <div className="flex gap-2 items-center">
            <Input
              type="text"
              placeholder="Enter a prompt, e.g., 'a happy cat'"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-grow"
              disabled={isPending}
            />
            <Button onClick={handleGenerate} disabled={isPending || !prompt}>
              {isPending ? <Loader className="animate-spin" /> : 'Generate'}
            </Button>
          </div>
        </CardContent>
      </Card>
      
      {isPending && (
        <div className="text-center">
          <Loader className="animate-spin inline-block" />
          <p className="text-muted-foreground">Generating your art...</p>
        </div>
      )}

      {generatedArt.length > 0 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Generated Art</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {generatedArt.map((art, index) => (
                <Card key={index} onClick={() => copyToClipboard(art)} className="cursor-pointer hover:bg-accent transition-colors">
                  <CardContent className="p-4">
                    <pre className="text-sm text-center whitespace-pre-wrap">{art}</pre>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

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
