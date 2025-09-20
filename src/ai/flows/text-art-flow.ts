'use server';
/**
 * @fileOverview An AI-powered text art generator.
 *
 * - generateTextArt - A function that handles the text art generation process.
 * - GenerateTextArtInput - The input type for the generateTextArt function.
 * - GenerateTextArtOutput - The return type for the generateTextArt function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const GenerateTextArtInputSchema = z.object({
  prompt: z.string().describe('The user\'s prompt for the text art to generate.'),
});
export type GenerateTextArtInput = z.infer<typeof GenerateTextArtInputSchema>;

const GenerateTextArtOutputSchema = z.object({
  textArt: z.string().describe('The generated text art.'),
});
export type GenerateTextArtOutput = z.infer<typeof GenerateTextArtOutputSchema>;


export async function generateTextArt(input: GenerateTextArtInput): Promise<GenerateTextArtOutput> {
  return textArtFlow(input);
}

const textArtFlow = ai.defineFlow(
  {
    name: 'textArtFlow',
    inputSchema: GenerateTextArtInputSchema,
    outputSchema: GenerateTextArtOutputSchema,
  },
  async (input) => {
    const llmResponse = await ai.generate({
      prompt: `You are an expert ASCII/Unicode artist. Create a piece of text art based on the following prompt: "${input.prompt}". Respond only with the text art and nothing else. Do not use code blocks.`,
      config: {
        temperature: 0.7,
      },
    });

    return {
      textArt: llmResponse.text,
    };
  }
);
