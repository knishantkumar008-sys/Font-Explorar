"use client"

import { useToast } from "@/hooks/use-toast";

const symbolCategories = [
  {
    name: "Currency",
    symbols: ["€", "£", "¥", "₹", "₽", "₱", "₩", "฿", "₫", "₴", "₸", "₼", "₿", "¢", "₡", "₢", "₣", "₤", "₥", "₦", "₧", "₨", "₪", "₮", "₯", "₰", "₲", "₳", "₴", "₵", "₶", "₷", "₸", "₹", "₺", "₻", "₼", "₽", "₾", "₿"],
  },
  {
    name: "Math",
    symbols: ["±", "×", "÷", "≠", "≈", "≤", "≥", "√", "∛", "∜", "∞", "∫", "∑", "∏", "∂", "∇", "∆", "∈", "∉", "∋", "⊆", "⊇", "⊂", "⊃", "∪", "∩", "∧", "∨", "¬", "∀", "∃", "‰", "‱"],
  },
  {
    name: "Arrows",
    symbols: ["←", "→", "↑", "↓", "↔", "↕", "↖", "↗", "↘", "↙", "↚", "↛", "↜", "↝", "↞", "↟", "↠", "↡", "↢", "↣", "↤", "↥", "↦", "↧", "↨", "↩", "↪", "↫", "↬", "↭", "↮", "↯", "↰", "↱", "↲", "↳", "↴", "↵", "↶", "↷", "↸", "↹", "↺", "↻", "↼", "↽", "↾", "↿", "⇀", "⇁", "⇂", "⇃", "⇄", "⇅", "⇆", "⇇", "⇈", "⇉", "⇊", "⇋", "⇌", "⇍", "⇎", "⇏", "⇐", "⇑", "⇒", "⇓", "⇔", "⇕", "⇖", "⇗", "⇘", "⇙", "⇚", "⇛", "⇜", "⇝", "⇞", "⇟", "⇠", "⇡", "⇢", "⇣"],
  },
  {
    name: "Stars & Flowers",
    symbols: ["★", "☆", "✦", "✧", "✩", "✪", "✫", "✬", "✭", "✮", "✯", "✰", "✶", "✷", "✸", "✹", "✺", "❂", "❋", "❊", "❉", "✾", "✽", "✼", "✻", "✺", "✹", "✸", "✷", "✶", "✵", "✴", "❄", "❆", "❇", "❈", "❉", "❊", "❋", "☘", "⚘", "⚜", "❂"],
  },
   {
    name: "Hearts",
    symbols: ["❤", "❥", "♡", "♥", "❣", "❦", "❧", "☙", "დ", "ღ", "ও", "❤️", "🧡", "💛", "💚", "💙", "💜", "🖤", "🤍", "🤎", "💔", "❣️", "💕", "💞", "💓", "💗", "💖", "💘", "💝", "💟"],
  },
  {
    name: "Brackets & Quotes",
    symbols: ["【", "】", "〖", "〗", "『", "』", "«", "»", "‹", "›", "「", "」", "﹁", "﹂", "﹃", "﹄", "‘", "’", "“", "”", "„", "‟"],
  },
  {
    name: "Chess & Cards",
    symbols: ["♔", "♕", "♖", "♗", "♘", "♙", "♚", "♛", "♜", "♝", "♞", "♟", "♠", "♡", "♢", "♣", "♤", "♥", "♦", "♧"],
  },
];

export default function SymbolsPage() {
  const { toast } = useToast();

  const copyToClipboard = (symbol: string) => {
    navigator.clipboard.writeText(symbol);
    toast({
      title: "Copied!",
      description: `Symbol "${symbol}" copied to clipboard.`,
    });
  };

  return (
    <div className="p-4 md:p-6 space-y-6">
      {symbolCategories.map((category) => (
        <div key={category.name}>
          <h2 className="text-2xl font-bold mb-4">{category.name}</h2>
          <div className="flex flex-wrap gap-2">
            {category.symbols.map((symbol) => (
              <button
                key={symbol}
                onClick={() => copyToClipboard(symbol)}
                className="flex items-center justify-center w-12 h-12 bg-card border rounded-lg shadow-sm hover:bg-accent transition-colors text-2xl"
              >
                {symbol}
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
