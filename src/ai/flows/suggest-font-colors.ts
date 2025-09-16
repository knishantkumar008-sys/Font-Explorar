'use server';

/**
 * @fileOverview A flow to suggest font color combinations based on the selected font and background color.
 *
 * - suggestFontColors - A function that suggests font color combinations.
 * - SuggestFontColorsInput - The input type for the suggestFontColors function.
 * - SuggestFontColorsOutput - The return type for the suggestFontColors function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestFontColorsInputSchema = z.object({
  fontName: z.string().describe('The name of the selected font.'),
  backgroundColor: z.string().describe('The background color in hexadecimal format (e.g., #E8EAF6).'),
});
export type SuggestFontColorsInput = z.infer<typeof SuggestFontColorsInputSchema>;

const SuggestFontColorsOutputSchema = z.object({
  suggestedColors: z
    .array(z.string())
    .describe(
      'An array of suggested font colors in hexadecimal format that complement the background color and font.'
    ),
});
export type SuggestFontColorsOutput = z.infer<typeof SuggestFontColorsOutputSchema>;

export async function suggestFontColors(input: SuggestFontColorsInput): Promise<SuggestFontColorsOutput> {
  return suggestFontColorsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestFontColorsPrompt',
  input: {schema: SuggestFontColorsInputSchema},
  output: {schema: SuggestFontColorsOutputSchema},
  prompt: `You are a color palette expert. Given a font name and a background color, suggest three font colors that would complement them well.

Font Name: {{{fontName}}}
Background Color: {{{backgroundColor}}}

Return the suggested colors as a JSON array of hexadecimal color codes.
`,
});

const suggestFontColorsFlow = ai.defineFlow(
  {
    name: 'suggestFontColorsFlow',
    inputSchema: SuggestFontColorsInputSchema,
    outputSchema: SuggestFontColorsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
