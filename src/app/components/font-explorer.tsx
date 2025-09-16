"use client";

import { useState, useTransition, useMemo, ChangeEvent, CSSProperties } from 'react';
import type { FontData } from '@/lib/fonts';
import { fonts } from '@/lib/fonts';
import { suggestFontColors } from '@/ai/flows/suggest-font-colors';
import { generateFancyText, type GenerateFancyTextOutput } from '@/ai/flows/generate-fancy-text';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { SidebarProvider, Sidebar, SidebarTrigger, SidebarContent, SidebarHeader, SidebarInset, SidebarGroup, SidebarGroupLabel, SidebarGroupContent, SidebarFooter } from '@/components/ui/sidebar';
import { Slider } from '@/components/ui/slider';
import { Textarea } from '@/components/ui/textarea';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { useToast } from "@/hooks/use-toast"
import { AppIcon } from '@/app/components/icons';
import { Palette, Download, Loader2, Wand2, Copy } from 'lucide-react';

export default function FontExplorer() {
  const [previewText, setPreviewText] = useState('The quick brown fox jumps over the lazy dog.');
  const [selectedFont, setSelectedFont] = useState<FontData>(fonts[0]);
  const [fontSize, setFontSize] = useState(48);
  const [fontWeight, setFontWeight] = useState('400');
  const [textColor, setTextColor] = useState('#10161A');
  const [backgroundColor, setBackgroundColor] = useState('#E8EAF6');
  const [suggestedColors, setSuggestedColors] = useState<string[]>([]);
  const [fancyText, setFancyText] = useState('');
  const [fancyTextResults, setFancyTextResults] = useState<GenerateFancyTextOutput['fancyTexts']>([]);

  const [isSuggestingColors, startSuggestingColors] = useTransition();
  const [isGeneratingFancyText, startGeneratingFancyText] = useTransition();
  const { toast } = useToast();

  const handleFontChange = (fontName: string) => {
    const newFont = fonts.find(f => f.name === fontName);
    if (newFont) {
      setSelectedFont(newFont);
      if (!newFont.weights.includes(fontWeight)) {
        setFontWeight(newFont.weights.includes('400') ? '400' : newFont.weights[0]);
      }
    }
  };

  const handleGetSuggestedColors = () => {
    startSuggestingColors(async () => {
      try {
        const result = await suggestFontColors({
          fontName: selectedFont.name,
          backgroundColor: backgroundColor,
        });
        setSuggestedColors(result.suggestedColors);
      } catch (error) {
        console.error('Failed to get color suggestions:', error);
        toast({
          variant: "destructive",
          title: "AI Error",
          description: "Could not fetch color suggestions. Please try again.",
        })
      }
    });
  };

  const handleGenerateFancyText = () => {
    startGeneratingFancyText(async () => {
      try {
        const result = await generateFancyText({ text: fancyText });
        setFancyTextResults(result.fancyTexts);
      } catch (error) {
        console.error('Failed to generate fancy text:', error);
        toast({
          variant: 'destructive',
          title: 'AI Error',
          description: 'Could not generate fancy text. Please try again.',
        });
      }
    });
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: 'Copied!',
      description: 'The text has been copied to your clipboard.',
    });
  };

  const previewStyle = useMemo(() => ({
    fontFamily: selectedFont.family,
    fontSize: `${fontSize}px`,
    fontWeight: fontWeight,
    color: textColor,
    lineHeight: 1.5,
  }), [selectedFont, fontSize, fontWeight, textColor]);

  return (
    <SidebarProvider>
      <div className="flex h-screen w-full flex-col">
        <header className="flex h-14 items-center gap-3 border-b bg-card px-4">
          <SidebarTrigger className="lg:hidden" />
          <AppIcon className="h-6 w-6" />
          <h1 className="text-lg font-semibold tracking-tight">Font Explorer</h1>
        </header>
        <div className="flex flex-1 overflow-hidden">
          <Sidebar collapsible="icon" className="min-w-[280px] max-w-[320px]">
            <SidebarContent asChild>
              <ScrollArea className="h-full">
                <div className="flex flex-col gap-4 p-4">

                  <SidebarGroup>
                    <SidebarGroupLabel>Preview Text</SidebarGroupLabel>
                    <SidebarGroupContent>
                      <Textarea
                        value={previewText}
                        onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setPreviewText(e.target.value)}
                        placeholder="Type something..."
                        className="h-24 resize-none"
                      />
                    </SidebarGroupContent>
                  </SidebarGroup>

                  <SidebarGroup>
                    <SidebarGroupLabel>Fonts</SidebarGroupLabel>
                    <SidebarGroupContent>
                      <Select value={selectedFont.name} onValueChange={handleFontChange}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a font" />
                        </SelectTrigger>
                        <SelectContent>
                          {fonts.map(font => (
                            <SelectItem key={font.name} value={font.name} style={{ fontFamily: font.family }}>
                              {font.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </SidebarGroupContent>
                  </SidebarGroup>

                  <SidebarGroup>
                    <SidebarGroupLabel>Styles</SidebarGroupLabel>
                    <SidebarGroupContent className="space-y-4">
                      <div>
                        <Label htmlFor="font-size" className="mb-2 flex justify-between text-sm">
                          <span>Font Size</span>
                          <span>{fontSize}px</span>
                        </Label>
                        <Slider
                          id="font-size"
                          min={8}
                          max={200}
                          step={1}
                          value={[fontSize]}
                          onValueChange={(value) => setFontSize(value[0])}
                        />
                      </div>
                      <div>
                        <Label htmlFor="font-weight" className="mb-2 block text-sm">Font Weight</Label>
                        <Select value={fontWeight} onValueChange={setFontWeight}>
                          <SelectTrigger id="font-weight">
                            <SelectValue placeholder="Select weight" />
                          </SelectTrigger>
                          <SelectContent>
                            {selectedFont.weights.map(weight => (
                              <SelectItem key={weight} value={weight}>
                                {weight}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </SidebarGroupContent>
                  </SidebarGroup>

                  <SidebarGroup>
                    <SidebarGroupLabel>Colors</SidebarGroupLabel>
                    <SidebarGroupContent className="space-y-4">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="text-color">Text</Label>
                        <div className="relative h-8 w-8 overflow-hidden rounded-md border">
                          <input
                            id="text-color"
                            type="color"
                            value={textColor}
                            onChange={(e) => setTextColor(e.target.value)}
                            className="absolute -top-2 -left-2 h-12 w-12 cursor-pointer"
                          />
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="bg-color">Background</Label>
                        <div className="relative h-8 w-8 overflow-hidden rounded-md border">
                          <input
                            id="bg-color"
                            type="color"
                            value={backgroundColor}
                            onChange={(e) => setBackgroundColor(e.target.value)}
                            className="absolute -top-2 -left-2 h-12 w-12 cursor-pointer"
                          />
                        </div>
                      </div>
                      <div>
                        <Button onClick={handleGetSuggestedColors} disabled={isSuggestingColors} className="w-full">
                          {isSuggestingColors ? <Loader2 className="animate-spin" /> : <Palette />}
                          Suggest Text Colors with AI
                        </Button>
                        {suggestedColors.length > 0 && (
                          <div className="mt-2 flex justify-center gap-2">
                            {suggestedColors.map(color => (
                              <Tooltip key={color}>
                                <TooltipTrigger asChild>
                                  <button
                                    onClick={() => setTextColor(color)}
                                    className="h-8 w-8 rounded-full border-2 transition-transform hover:scale-110"
                                    style={{ backgroundColor: color, borderColor: color === textColor ? 'hsl(var(--primary))' : 'transparent' }}
                                    aria-label={`Set text color to ${color}`}
                                  />
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>{color}</p>
                                </TooltipContent>
                              </Tooltip>
                            ))}
                          </div>
                        )}
                      </div>
                    </SidebarGroupContent>
                  </SidebarGroup>
                </div>
              </ScrollArea>
            </SidebarContent>
            <SidebarFooter className="p-4">
              <Button asChild>
                <a href={selectedFont.url} target="_blank" rel="noopener noreferrer">
                  <Download />
                  Download Font
                </a>
              </Button>
            </SidebarFooter>
          </Sidebar>

          <SidebarInset>
            <main className="flex-1 overflow-auto p-4 md:p-8" style={{ backgroundColor }}>
              <div className="grid grid-rows-[auto,1fr] gap-8 h-full">
                <Textarea
                  value={previewText}
                  onChange={(e) => setPreviewText(e.target.value)}
                  style={previewStyle as CSSProperties}
                  className="h-full min-h-48 w-full resize-none border-0 bg-transparent p-0 text-4xl shadow-none ring-0 focus-visible:ring-0"
                  placeholder="Type here to preview..."
                />

                <Card>
                  <CardHeader>
                    <CardTitle>Fancy Text Generator</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Textarea
                      value={fancyText}
                      onChange={(e) => setFancyText(e.target.value)}
                      placeholder="Enter text for fancy styles..."
                      className="resize-y"
                    />
                    <Button onClick={handleGenerateFancyText} disabled={isGeneratingFancyText || !fancyText}>
                      {isGeneratingFancyText ? <Loader2 className="animate-spin" /> : <Wand2 />}
                      Generate Fancy Text
                    </Button>
                    
                    {isGeneratingFancyText && <div className="text-center">Generating styles...</div>}

                    {fancyTextResults.length > 0 && (
                      <ScrollArea className="h-96">
                        <div className="space-y-4 pr-4">
                          {fancyTextResults.map((result) => (
                            <Card key={result.style}>
                              <CardHeader className="flex flex-row items-center justify-between p-4">
                                <CardTitle className="text-lg">{result.style}</CardTitle>
                                <Button variant="ghost" size="icon" onClick={() => copyToClipboard(result.text)}>
                                  <Copy className="h-4 w-4" />
                                </Button>
                              </CardHeader>
                              <CardContent className="p-4 pt-0">
                                <p className="text-xl font-mono bg-muted p-3 rounded-md overflow-x-auto">{result.text}</p>
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      </ScrollArea>
                    )}
                  </CardContent>
                </Card>
              </div>
            </main>
          </SidebarInset>
        </div>
      </div>
    </SidebarProvider>
  );
}
