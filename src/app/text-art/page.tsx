"use client"

import { useToast } from "@/hooks/use-toast";
import { Card, CardContent } from "@/components/ui/card";

const textArtCategories = [
  {
    name: "Cool",
    arts: [
      "( ͡° ͜ʖ ͡°)",
      "¯\\_(ツ)_/¯",
      "(づ｡◕‿‿◕｡)づ",
      "̿̿ ̿̿ ̿̿ ̿'̿'\\̵͇̿̿\\з= ( ▀ ͜͞ʖ▀) =ε/̵͇̿̿/’̿’̿ ̿ ̿̿ ̿̿ ̿̿",
      "ಠ_ಠ",
      "༼ つ ◕_◕ ༽つ",
    ],
  },
  {
    name: "Happy",
    arts: [
      "(. ❛ ᴗ ❛.)",
      "╰( ´・ω・)つ──☆✿✿✿✿✿✿",
      "ヽ(〃＾▽＾〃)ﾉ",
      "(* ^ ω ^)",
      "(\\/) (․ ․) (\\/)",
      "(ﾉ◕ヮ◕)ﾉ*:･ﾟ✧ ✧ﾟ･: *ヽ(◕ヮ◕ヽ)",
    ],
  },
  {
    name: "Sad",
    arts: [
      "(｡•́︿•̀｡)",
      "(ಥ﹏ಥ)",
      "o(╥﹏╥)o",
      "(;´༎ຶД༎ຶ`)",
      "（；´д｀）ゞ",
      "｡ﾟ( ﾟஇ‸இﾟ)ﾟ｡",
    ],
  },
   {
    name: "Animals",
    arts: [
      "╱|、\n(˚ˎ 。7  \n|、˜〵          \nじしˍ,)ノ",
      " /\\_/\\\n( o.o )\n > ^ <",
      "  /\\_/\\  \n ( o.o ) \n  > ^ <  ",
      " _,-=._              /)\n \\_!_/)_         ,.' / \n   \"\"'\"\"\"  ____.' (  \n            \\ \"\"\"\"\" \\ \n             \\      / \n",
      "       __\n      /  \\\n     @|  |\n      \\__/    \n     /____\\",
    ],
  },
];

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
