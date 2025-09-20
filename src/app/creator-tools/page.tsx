
"use client"

import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState, useTransition } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Loader, Copy } from 'lucide-react';
import { generateCaptions } from '@/ai/flows/caption-generator-flow';
import { generateHashtags } from '@/ai/flows/hashtag-generator-flow';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function CreatorToolsPage() {
  const { toast } = useToast();
  const [isCaptionPending, startCaptionTransition] = useTransition();
  const [isHashtagPending, startHashtagTransition] = useTransition();

  const [captionTopic, setCaptionTopic] = useState('');
  const [captionTone, setCaptionTone] = useState('Casual');
  const [generatedCaptions, setGeneratedCaptions] = useState<string[]>([]);

  const [hashtagTopic, setHashtagTopic] = useState('');
  const [generatedHashtags, setGeneratedHashtags] = useState<string[]>([]);

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied!",
      description: `The ${type} has been copied to your clipboard.`,
    });
  };

  const handleGenerateCaptions = () => {
    startCaptionTransition(async () => {
      try {
        const result = await generateCaptions(captionTopic, captionTone);
        setGeneratedCaptions(result.captions);
        if (result.captions.length === 0) {
            toast({
              title: 'No captions generated',
              description: 'The AI could not generate captions for this topic. Please try a different one.',
              variant: 'destructive'
            });
        }
      } catch (error) {
        toast({
          title: 'Error generating captions',
          description: 'There was an error generating captions. Please try again.',
          variant: 'destructive'
        });
      }
    });
  };

  const handleGenerateHashtags = () => {
    startHashtagTransition(async () => {
      try {
        const result = await generateHashtags(hashtagTopic);
        setGeneratedHashtags(result.hashtags);
         if (result.hashtags.length === 0) {
            toast({
              title: 'No hashtags generated',
              description: 'The AI could not generate hashtags for this topic. Please try a different one.',
              variant: 'destructive'
            });
        }
      } catch (error) {
        toast({
          title: 'Error generating hashtags',
          description: 'There was an error generating hashtags. Please try again.',
          variant: 'destructive'
        });
      }
    });
  };

  return (
    <div className="p-4 md:p-6 space-y-8">
      <div className="space-y-4 text-center">
        <h1 className="text-4xl font-bold tracking-tight">AI Creator Tools</h1>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          Supercharge your social media workflow. Generate creative captions and discover trending hashtags in seconds.
        </p>
      </div>

      {/* AI Caption Generator */}
      <Card className="shadow-lg rounded-2xl">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">AI Caption Generator</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Textarea
                placeholder="Describe your post... e.g., 'My dog playing fetch at the beach'"
                value={captionTopic}
                onChange={(e) => setCaptionTopic(e.target.value)}
                className="md:col-span-2"
                rows={2}
                disabled={isCaptionPending}
              />
            <div className="space-y-2">
                <Select value={captionTone} onValueChange={setCaptionTone} disabled={isCaptionPending}>
                    <SelectTrigger>
                        <SelectValue placeholder="Select a tone" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="Casual">Casual</SelectItem>
                        <SelectItem value="Professional">Professional</SelectItem>
                        <SelectItem value="Funny">Funny</SelectItem>
                        <SelectItem value="Inspirational">Inspirational</SelectItem>
                        <SelectItem value="Excited">Excited</SelectItem>
                    </SelectContent>
                </Select>
                 <Button onClick={handleGenerateCaptions} disabled={isCaptionPending || !captionTopic} className="w-full">
                  {isCaptionPending ? <Loader className="animate-spin" /> : 'Generate Captions'}
                </Button>
            </div>
          </div>
          {isCaptionPending && (
            <div className="text-center py-4">
              <Loader className="animate-spin inline-block" />
              <p className="text-muted-foreground">Generating your captions...</p>
            </div>
          )}
          {generatedCaptions.length > 0 && (
            <div className="space-y-4 pt-4">
              <h3 className="text-xl font-semibold">Generated Captions:</h3>
              {generatedCaptions.map((caption, index) => (
                <Card key={index} className="bg-muted/50">
                  <CardContent className="p-4 flex items-start justify-between gap-4">
                    <p className="text-sm whitespace-pre-wrap flex-grow">{caption}</p>
                    <Button variant="ghost" size="icon" onClick={() => copyToClipboard(caption, 'caption')} aria-label="Copy caption">
                      <Copy className="h-5 w-5" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
      
      {/* AI Hashtag Generator */}
      <Card className="shadow-lg rounded-2xl">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">AI Hashtag Generator</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-4 items-center">
            <Input
              type="text"
              placeholder="Enter a topic... e.g., 'travel photography'"
              value={hashtagTopic}
              onChange={(e) => setHashtagTopic(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleGenerateHashtags()}
              className="flex-grow"
              disabled={isHashtagPending}
            />
            <Button onClick={handleGenerateHashtags} disabled={isHashtagPending || !hashtagTopic}>
              {isHashtagPending ? <Loader className="animate-spin" /> : 'Generate Hashtags'}
            </Button>
          </div>
           {isHashtagPending && (
            <div className="text-center py-4">
              <Loader className="animate-spin inline-block" />
              <p className="text-muted-foreground">Generating your hashtags...</p>
            </div>
          )}
          {generatedHashtags.length > 0 && (
            <div className="space-y-4 pt-4">
              <h3 className="text-xl font-semibold">Generated Hashtags:</h3>
              <Card className="bg-muted/50">
                  <CardContent className="p-4">
                    <div className="flex flex-wrap gap-2">
                        {generatedHashtags.map((tag, index) => (
                            <span key={index} className="text-primary font-medium bg-primary/10 px-2 py-1 rounded-md cursor-pointer hover:bg-primary/20" onClick={() => copyToClipboard(tag, 'hashtag')}>
                                {tag}
                            </span>
                        ))}
                    </div>
                     <div className="flex justify-end mt-4">
                        <Button variant="ghost" onClick={() => copyToClipboard(generatedHashtags.join(' '), 'all hashtags')}>
                            <Copy className="h-5 w-5 mr-2" />
                            Copy All
                        </Button>
                    </div>
                  </CardContent>
                </Card>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

    