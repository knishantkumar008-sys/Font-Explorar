"use client";

import { useState, useMemo, ChangeEvent } from 'react';
import { useToast } from "@/hooks/use-toast"
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Copy, Heart } from 'lucide-react';
import { fancyStyles, fontCategories } from '@/lib/fonts';

export default function FontExplorer() {
  const [inputText, setInputText] = useState('Font Changer');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const { toast } = useToast();

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: 'Copied!',
      description: 'The text has been copied to your clipboard.',
    });
  };
  
  function convertToFancy(text: string, styleName: string): string {
    const style = fancyStyles.find(s => s.name === styleName);
    if (!style) return text;
  
    const { mapping, isDecorator, prefix, suffix, perChar } = style;
    if (isDecorator) {
      if (perChar) {
        return text.split('').map(char => `${prefix}${char}${suffix}`).join('');
      }
      return `${prefix || ''}${text}${suffix || ''}`;
    }
  
    if (style.name === 'Flipped') {
      return text.split('').reverse().map(char => (mapping as Record<string, string>)[char.toLowerCase()] || char).join('');
    }
    return text.split('').map(char => (mapping as Record<string, string>)[char] || char).join('');
  }

  const handleCategoryClick = (category: string) => {
    if (category === 'All') {
      setSelectedCategory('All');
      return;
    }
    setSelectedCategory(category);
    const firstStyleInCategory = fancyStyles.find(style => style.categories?.includes(category));
    if (firstStyleInCategory) {
      const convertedText = convertToFancy(inputText, firstStyleInCategory.name);
      // This state update might not be needed if we don't want to change the input text itself
    }
  };

  const fancyTextResults = useMemo(() => {
    if (!inputText) return [];
    
    const stylesToRender = selectedCategory === 'All'
      ? fancyStyles
      : fancyStyles.filter(style => style.categories?.includes(selectedCategory));

    return stylesToRender.map(style => ({
      style: style.name,
      text: convertToFancy(inputText, style.name),
    }));
  }, [inputText, selectedCategory]);


  return (
    <>
      <Card className="shadow-2xl rounded-2xl">
        <CardContent className="p-6">
          <h2 className="text-2xl font-bold text-center mb-4">Font Style</h2>
          <div className="relative p-1 bg-gradient-to-r from-pink-500 via-yellow-500 to-cyan-500 rounded-lg">
             <textarea
                value={inputText}
                onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setInputText(e.target.value)}
                placeholder="Type your text here..."
                className="w-full resize-none border-0 text-lg shadow-inner focus:ring-0 focus-visible:ring-0 rounded-md p-4"
                rows={2}
              />
          </div>
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 mt-4 text-sm">
            <Heart className="h-5 w-5 text-primary" />
            {fontCategories.map(cat => (
              <button 
                key={cat} 
                onClick={() => handleCategoryClick(cat)} 
                className={`hover:underline ${selectedCategory === cat ? 'font-bold text-primary' : ''}`}
              >
                {cat}
              </button>
            ))}
          </div>

        </CardContent>
      </Card>
      
      <div className="mt-6 space-y-4">
          {fancyTextResults.map((result) => (
             <div key={result.style} className="rounded-lg border bg-white/80 backdrop-blur-sm text-card-foreground shadow-lg cursor-pointer hover:shadow-xl transition-shadow" onClick={() => copyToClipboard(result.text)}>
             <div className="flex items-center justify-between p-4">
               <p className="text-xl font-mono flex-grow pr-4">{result.text}</p>
               <span className="text-xs text-muted-foreground">{result.style}</span>
             </div>
           </div>
          ))}
      </div>
    </>
  );
}
