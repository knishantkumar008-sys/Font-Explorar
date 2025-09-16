"use client";

import { useState, useTransition, useMemo, ChangeEvent, CSSProperties } from 'react';
import type { FontData } from '@/lib/fonts';
import { fonts } from '@/lib/fonts';
import { suggestFontColors } from '@/ai/flows/suggest-font-colors';
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

// Character mappings for fancy text styles
const fancyStyles = [
  { name: 'Cursive', mapping: { a: '𝒶', b: '𝒷', c: '𝒸', d: '𝒹', e: '𝑒', f: '𝒻', g: '𝑔', h: '𝒽', i: '𝒾', j: '𝒿', k: '𝓀', l: '𝓁', m: '𝓂', n: '𝓃', o: '𝑜', p: '𝓅', q: '𝓆', r: '𝓇', s: '𝓈', t: '𝓉', u: '𝓊', v: '𝓋', w: '𝓌', x: '𝓍', y: '𝓎', z: '𝓏', A: '𝒜', B: '𝐵', C: '𝒞', D: '𝒟', E: '𝐸', F: '𝐹', G: '𝒢', H: '𝐻', I: '𝐼', J: '𝒥', K: '𝒦', L: '𝐿', M: '𝑀', N: '𝒩', O: '𝒪', P: '𝒫', Q: '𝒬', R: '𝑅', S: '𝒮', T: '𝒯', U: '𝒰', V: '𝒱', W: '𝒲', X: '𝒳', Y: '𝒴', Z: '𝒵' } },
  { name: 'Gothic', mapping: { a: '𝔞', b: '𝔟', c: '𝔠', d: '𝔡', e: '𝔢', f: '𝔣', g: '𝔤', h: '𝔥', i: '𝔦', j: '𝔧', k: '𝔨', l: '𝔩', m: '𝔪', n: '𝔫', o: '𝔬', p: '𝔭', q: '𝔮', r: '𝔯', s: '𝔰', t: '𝔱', u: '𝔲', v: '𝔳', w: '𝔴', x: '𝔵', y: '𝔶', z: '𝔷', A: '𝔄', B: '𝔅', C: 'ℭ', D: '𝔇', E: '𝔈', F: '𝔉', G: '𝔊', H: 'ℌ', I: 'ℑ', J: '𝔍', K: '𝔎', L: '𝔏', M: '𝔐', N: '𝔑', O: '𝔒', P: '𝔓', Q: '𝔔', R: 'ℜ', S: '𝔖', T: '𝔗', U: '𝔘', V: '𝔙', W: '𝔚', X: '𝔛', Y: '𝔜', Z: 'ℨ' } },
  { name: 'Monospace', mapping: { a: '𝚊', b: '𝚋', c: '𝚌', d: '𝚍', e: '𝚎', f: '𝚏', g: '𝚐', h: '𝚑', i: '𝚒', j: '𝚓', k: '𝚔', l: '𝚕', m: '𝚖', n: '𝚗', o: '𝚘', p: '𝚙', q: '𝚚', r: '𝚛', s: '𝚜', t: '𝚝', u: '𝚞', v: '𝚟', w: '𝚠', x: '𝚡', y: '𝚢', z: '𝚣', A: '𝙰', B: '𝙱', C: '𝙲', D: '𝙳', E: '𝙴', F: '𝙵', G: '𝙶', H: '𝙷', I: '𝙸', J: '𝙹', K: '𝙺', L: '𝙻', M: '𝙼', N: '𝙽', O: '𝙾', P: '𝙿', Q: '𝚀', R: '𝚁', S: '𝚂', T: '𝚃', U: '𝚄', V: '𝚅', W: '𝚆', X: '𝚇', Y: '𝚈', Z: '𝚉' } },
  { name: 'Bubbles', mapping: { a: 'ⓐ', b: 'ⓑ', c: 'ⓒ', d: 'ⓓ', e: 'ⓔ', f: 'ⓕ', g: 'ⓖ', h: 'ⓗ', i: 'ⓘ', j: 'ⓙ', k: 'ⓚ', l: 'ⓛ', m: 'ⓜ', n: 'ⓝ', o: 'ⓞ', p: 'ⓟ', q: 'ⓠ', r: 'ⓡ', s: 'ⓢ', t: 'ⓣ', u: 'ⓤ', v: 'ⓥ', w: 'ⓦ', x: 'ⓧ', y: 'ⓨ', z: 'ⓩ', A: 'Ⓐ', B: 'Ⓑ', C: 'Ⓒ', D: 'Ⓓ', E: 'Ⓔ', F: 'Ⓕ', G: 'Ⓖ', H: 'Ⓗ', I: 'Ⓘ', J: 'Ⓙ', K: 'Ⓚ', L: 'Ⓛ', M: 'Ⓜ', N: 'Ⓝ', O: 'Ⓞ', P: 'Ⓟ', Q: 'Ⓠ', R: 'Ⓡ', S: 'Ⓢ', T: 'Ⓣ', U: 'Ⓤ', V: 'Ⓥ', W: 'Ⓦ', X: 'Ⓧ', Y: 'Ⓨ', Z: 'Ⓩ' } },
  { name: 'Squares', mapping: { a: '🅰', b: '🅱', c: '🅲', d: '🅳', e: '🅴', f: '🅵', g: '🅶', h: '🅷', i: '🅸', j: '🅹', k: '🅺', l: '🅻', m: '🅼', n: '🅽', o: '🅾', p: '🅿', q: '🆀', r: '🆁', s: '🆂', t: '🆃', u: '🆄', v: '🆅', w: '🆆', x: '🆇', y: '🆈', z: '🆉' } },
  { name: 'Bold', mapping: { a: '𝗮', b: '𝗯', c: '𝗰', d: '𝗱', e: '𝗲', f: '𝗳', g: '𝗴', h: '𝗵', i: '𝗶', j: '𝗷', k: '𝗸', l: '𝗹', m: '𝗺', n: '𝗻', o: '𝗼', p: '𝗽', q: '𝗾', r: '𝗿', s: '𝘀', t: '𝘁', u: '𝘂', v: '𝘃', w: '𝘄', x: '𝘅', y: '𝘆', z: '𝘇', A: '𝗔', B: '𝗕', C: '𝗖', D: '𝗗', E: '𝗘', F: '𝗙', G: '𝗚', H: '𝗛', I: '𝗜', J: '𝗝', K: '𝗞', L: '𝗟', M: '𝗠', N: '𝗡', O: '𝗢', P: '𝗣', Q: '𝗤', R: '𝗥', S: '𝗦', T: '𝗧', U: '𝗨', V: '𝗩', W: '𝗪', X: '𝗫', Y: '𝗬', Z: '𝗭' } },
  { name: 'Upside Down', mapping: { a: 'ɐ', b: 'q', c: 'ɔ', d: 'p', e: 'ǝ', f: 'ɟ', g: 'ƃ', h: 'ɥ', i: 'ı', j: 'ɾ', k: 'ʞ', l: 'l', m: 'ɯ', n: 'u', o: 'o', p: 'd', q: 'b', r: 'ɹ', s: 's', t: 'ʇ', u: 'n', v: 'ʌ', w: 'ʍ', x: 'x', y: 'ʎ', z: 'z', A: '∀', B: '𐐒', C: 'Ɔ', D: 'ᗡ', E: 'Ǝ', F: 'Ⅎ', G: 'פ', H: 'H', I: 'I', J: 'ſ', K: 'ʞ', L: '˥', M: 'W', N: 'N', O: 'O', P: 'Ԁ', Q: 'Q', R: 'ᴚ', S: 'S', T: '⊥', U: '∩', V: 'Λ', W: 'M', X: 'X', Y: '⅄', Z: 'Z', ' ': ' ' } },
];

function convertToFancy(text: string, mapping: Record<string, string>): string {
  return text.split('').map(char => mapping[char] || char).join('');
}

export default function FontExplorer() {
  const [previewText, setPreviewText] = useState('The quick brown fox jumps over the lazy dog.');
  const [selectedFont, setSelectedFont] = useState<FontData>(fonts[0]);
  const [fontSize, setFontSize] = useState(48);
  const [fontWeight, setFontWeight] = useState('400');
  const [textColor, setTextColor] = useState('#10161A');
  const [backgroundColor, setBackgroundColor] = useState('#E8EAF6');
  const [suggestedColors, setSuggestedColors] = useState<string[]>([]);
  const [fancyText, setFancyText] = useState('Insta Fonts');
  
  const [isSuggestingColors, startSuggestingColors] = useTransition();
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

  const fancyTextResults = useMemo(() => {
    if (!fancyText) return [];
    return fancyStyles.map(style => ({
      style: style.name,
      text: convertToFancy(fancyText, style.mapping),
    }));
  }, [fancyText]);


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
