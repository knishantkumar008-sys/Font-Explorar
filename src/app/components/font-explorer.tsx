"use client";

import { useState, useMemo, ChangeEvent } from 'react';
import { useToast } from "@/hooks/use-toast"
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Copy, Heart, Settings, Sun, Layers } from 'lucide-react';
import { fancyStyles, fontCategories, categoryDescriptions } from '@/lib/fonts';

const ITEMS_PER_PAGE = 30;

export default function FontExplorer() {
  const [inputText, setInputText] = useState('Font Style');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
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
    setSelectedCategory(category);
    setCurrentPage(1); // Reset to first page on category change
  };

  const { paginatedResults, totalPages } = useMemo(() => {
    if (!inputText) return { paginatedResults: [], totalPages: 0 };
    
    const stylesToRender = selectedCategory === 'All'
      ? fancyStyles
      : fancyStyles.filter(style => style.categories?.includes(selectedCategory));

    const totalPages = selectedCategory === 'All' ? Math.ceil(stylesToRender.length / ITEMS_PER_PAGE) : 1;

    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;

    const paginatedStyles = selectedCategory === 'All' ? stylesToRender.slice(startIndex, endIndex) : stylesToRender;

    const results = paginatedStyles.map(style => ({
      style: style.name,
      text: convertToFancy(inputText, style.name),
    }));

    return { paginatedResults: results, totalPages };
  }, [inputText, selectedCategory, currentPage]);

  const currentDescription = categoryDescriptions[selectedCategory];


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
          {paginatedResults.map((result) => (
            <div key={result.style} className="rounded-lg border bg-white/80 backdrop-blur-sm text-card-foreground shadow-lg">
              <div className="flex items-center justify-between p-4">
                <p className="text-xl font-mono flex-grow pr-4">{result.text}</p>
                <div className="flex items-center space-x-1">
                  <Button variant="ghost" size="icon" onClick={() => copyToClipboard(result.text)} aria-label="Copy text">
                    <Copy className="h-5 w-5" />
                  </Button>
                  <Button variant="ghost" size="icon" aria-label="Like font">
                    <Heart className="h-5 w-5" />
                  </Button>
                </div>
              </div>
              <div className="px-4 pb-2">
                <span className="text-xs text-muted-foreground">{result.style}</span>
              </div>
            </div>
          ))}
      </div>

      {currentDescription && (
        <Card className="mt-6 shadow-lg rounded-2xl">
          <CardContent className="p-6">
            <h3 className="text-xl font-bold mb-2">{currentDescription.title}</h3>
            <p className="text-muted-foreground whitespace-pre-wrap">{currentDescription.content}</p>
          </CardContent>
        </Card>
      )}

      {totalPages > 1 && (
        <div className="flex justify-center items-center space-x-2 mt-6">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            Previous
          </Button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
            <Button
              key={page}
              variant={currentPage === page ? 'default' : 'outline'}
              size="sm"
              onClick={() => setCurrentPage(page)}
            >
              {page}
            </Button>
          ))}
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            Next
          </Button>
        </div>
      )}
      <div className="mt-8 space-y-8 text-center text-card-foreground bg-white/80 backdrop-blur-sm p-6 md:p-8 rounded-2xl shadow-lg">
        <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-4">About Our Fonts</h2>
            <p className="text-muted-foreground">
                Welcome to our fonts generator! You can easily copy and paste these fonts into your social media bio. Our website is designed to generate cool symbols and fancy text, perfect for making your profile more professional and appealing. You can transform your traditional text into stylish fonts, including cursive, bold, italics, and over 100 other styles. We use Unicode characters to generate text symbols that are supported across all major social media platforms and games.
            </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 text-left">
            <div className="space-y-2">
                <div className="flex justify-center mb-4">
                    <div className="bg-primary/10 text-primary p-4 rounded-full">
                       <Layers className="h-8 w-8" />
                    </div>
                </div>
                <h3 className="text-xl font-bold text-center">Copy & Paste Fonts</h3>
                <p className="text-muted-foreground text-center">
                    We are the #1 source for stylish fonts and text symbols for your social media bio. We can generate over 100 unique font styles using special characters and Unicode.
                </p>
            </div>
            <div className="space-y-2">
                 <div className="flex justify-center mb-4">
                    <div className="bg-primary/10 text-primary p-4 rounded-full">
                       <Settings className="h-8 w-8" />
                    </div>
                </div>
                <h3 className="text-xl font-bold text-center">How It Works</h3>
                <ol className="list-decimal list-inside text-muted-foreground space-y-1">
                    <li>Type your text into the input box.</li>
                    <li>We automatically generate stylish fonts.</li>
                    <li>Copy the font you like.</li>
                    <li>Paste it into your bio or name.</li>
                </ol>
            </div>
            <div className="space-y-2">
                 <div className="flex justify-center mb-4">
                    <div className="bg-primary/10 text-primary p-4 rounded-full">
                       <Sun className="h-8 w-8" />
                    </div>
                </div>
                <h3 className="text-xl font-bold text-center">Free Stylish Fonts</h3>
                <p className="text-muted-foreground text-center">
                    Our generator can produce many font styles at once. Just enter your text and experience the magic of Unicode symbols. Discover a range of font styles like Fancy, Glitch, and Aesthetic on our website.
                </p>
            </div>
        </div>
      </div>
    </>
  );
}
