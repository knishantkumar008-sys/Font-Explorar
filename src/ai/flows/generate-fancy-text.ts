'use server';

/**
 * @fileOverview A flow to generate fancy text styles from input text.
 *
 * - generateFancyText - A function that generates stylized text.
 * - GenerateFancyTextInput - The input type for the generateFancyText function.
 * - GenerateFancyTextOutput - The return type for the generateFancyText function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateFancyTextInputSchema = z.object({
  text: z.string().describe('The text to be converted into fancy styles.'),
});
export type GenerateFancyTextInput = z.infer<typeof GenerateFancyTextInputSchema>;

const GenerateFancyTextOutputSchema = z.object({
  fancyTexts: z
    .array(z.object({ style: z.string().describe('The name of the style.'), text: z.string().describe('The stylized text.') }))
    .describe('An array of objects, each containing a fancy text style and the corresponding stylized text.'),
});
export type GenerateFancyTextOutput = z.infer<typeof GenerateFancyTextOutputSchema>;

export async function generateFancyText(input: GenerateFancyTextInput): Promise<GenerateFancyTextOutput> {
  return generateFancyTextFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateFancyTextPrompt',
  input: {schema: GenerateFancyTextInputSchema},
  output: {schema: GenerateFancyTextOutputSchema},
  prompt: `You are a "Fancy Text" generator. Your task is to take the user's input text and convert it into at least 10 different, creative, and visually distinct styles using a variety of Unicode characters.

For each style, provide a descriptive name (e.g., "Cursive", "Gothic", "Monospace", "Bubbles", "Squares").

Input text: {{{text}}}

Generate a JSON object containing an array of 'fancyTexts', where each object has a 'style' and 'text' property.
`,
});

const generateFancyTextFlow = ai.defineFlow(
  {
    name: 'generateFancyTextFlow',
    inputSchema: GenerateFancyTextInputSchema,
    outputSchema: GenerateFancyTextOutputSchema,
  },
  async input => {
    if (!input.text) {
      return {fancyTexts: []};
    }
    const {output} = await prompt(input);
    return output!;
  }
);
