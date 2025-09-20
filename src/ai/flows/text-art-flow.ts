/**
 * @fileOverview A Genkit flow for generating text art.
 *
 * This file defines the `generateTextArt` flow, which takes a text prompt
 * and uses an AI model to generate multiple ASCII art variations.
 */
'use server';

import {ai} from '@/ai/genkit';
import {z} from 'zod';

// Define the schema for the flow's output
const TextArtOutputSchema = z.object({
  art: z.array(z.string()).describe('An array of 3 different ASCII art creations based on the prompt.'),
});

/**
 * The main exported function that clients will call.
 * It takes a prompt and returns a promise of the generated text art.
 * @param {string} prompt - The text prompt to generate art from.
 * @returns {Promise<z.infer<typeof TextArtOutputSchema>>} A promise that resolves to the generated art.
 */
export async function generateTextArt(
  prompt: string
): Promise<z.infer<typeof TextArtOutputSchema>> {
  return generateTextArtFlow(prompt);
}

// Define the Genkit prompt for the AI model
const textArtPrompt = ai.definePrompt({
  name: 'textArtPrompt',
  input: {schema: z.string()},
  output: {schema: TextArtOutputSchema},
  prompt: `You are an expert ASCII art generator.
    Create 3 distinct and creative ASCII art designs based on the following prompt: {{prompt}}
    
    RULES:
    - Only output ASCII characters.
    - Do not include any other text or explanation.
    - Ensure the art is clearly recognizable.`,
});

// Define the Genkit flow
const generateTextArtFlow = ai.defineFlow(
  {
    name: 'generateTextArtFlow',
    inputSchema: z.string(),
    outputSchema: TextArtOutputSchema,
  },
  async prompt => {
    // Run the prompt with the given input
    const result = await textArtPrompt(prompt);
    const output = result.output();

    // If there's no output, return an empty array
    if (!output) {
      return {art: []};
    }
    // Return the generated art
    return output;
  }
);
