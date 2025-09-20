'use server';
/**
 * @fileOverview A flow for generating text art.
 *
 * - generateTextArt - A function that generates text art from a prompt.
 */
import {ai} from '@/ai/genkit';

const prompt = ai.definePrompt({
  name: 'textArtPrompt',
  prompt: `Generate text art based on the following description.
Only output the text art, with no other text or explanation.

Description: {{{prompt}}}`,
});

export async function generateTextArt(promptText: string): Promise<string> {
  const llmResponse = await prompt({
    prompt: promptText,
  });
  return llmResponse.text;
}
