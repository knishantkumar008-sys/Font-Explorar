
/**
 * @fileOverview A Genkit flow for generating text art.
 *
 * This file defines the `generateTextArt` flow, which takes a text prompt
 * and uses an AI model to generate multiple ASCII art variations.
 */
'use server';

import {ai} from '@/ai/genkit';
import {z} from 'zod';

/**
 * The main exported function that clients will call.
 * It takes a prompt and returns a promise of the generated text art.
 * @param {string} prompt - The text prompt to generate art from.
 * @returns {Promise<{ art: string[] }>} A promise that resolves to the generated art.
 */
export async function generateTextArt(
  prompt: string
): Promise<{ art: string[] }> {
  return generateTextArtFlow(prompt);
}

// Define the Genkit prompt for the AI model
const textArtPrompt = ai.definePrompt({
  name: 'textArtPrompt',
  input: {schema: z.string()},
  prompt: `You are an expert ASCII art generator.
    Create 3 distinct and creative ASCII art designs based on the following prompt: {{prompt}}
    
    RULES:
    - Separate each of the 3 art pieces with the exact separator: <ART>
    - Only output ASCII characters.
    - Do not include any other text, explanation, or numbering.
    - Ensure the art is clearly recognizable.`,
});

// Define the Genkit flow
const generateTextArtFlow = ai.defineFlow(
  {
    name: 'generateTextArtFlow',
    inputSchema: z.string(),
  },
  async prompt => {
    // Run the prompt with the given input
    const result = await ai.generate({ prompt: textArtPrompt, input: prompt });
    const rawOutput = result.text;

    // If there's no output, return an empty array to prevent crashes
    if (!rawOutput) {
      return {art: []};
    }

    // Split the raw output by the separator to get individual art pieces
    const artPieces = rawOutput.split('<ART>').map(art => art.trim()).filter(art => art.length > 0);
    
    // Return the generated art in the expected object format
    return { art: artPieces };
  }
);
