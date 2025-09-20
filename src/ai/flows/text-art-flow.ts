/**
 * @fileOverview A Genkit flow for generating text art.
 *
 * This file defines the `generateTextArt` function, which takes a text prompt
 * and uses an AI model to generate multiple ASCII art variations.
 */
'use server';

import {ai} from '@/ai/genkit';

/**
 * The main exported function that clients will call.
 * It takes a prompt and returns a promise of the generated text art.
 * @param {string} prompt - The text prompt to generate art from.
 * @returns {Promise<{ art: string[] }>} A promise that resolves to the generated art.
 */
export async function generateTextArt(
  prompt: string
): Promise<{ art: string[] }> {
  try {
    const fullPrompt = `You are an expert ASCII art generator.
      Create 3 distinct and creative ASCII art designs based on the following prompt: "{{prompt}}"
      
      RULES:
      - Separate each of the 3 art pieces with the exact separator: <ART>
      - Only output ASCII characters.
      - Do not include any other text, explanation, or numbering.
      - Ensure the art is clearly recognizable.`;

    const result = await ai.generate({
      prompt: fullPrompt,
      input: { prompt: prompt },
    });

    const rawOutput = result.text;

    if (!rawOutput) {
      console.error("AI response was empty or did not contain text.");
      return {art: []};
    }

    const artPieces = rawOutput.split('<ART>').map(art => art.trim()).filter(art => art.length > 0);
    
    return { art: artPieces };

  } catch (error) {
    console.error("Error generating text art in flow:", error);
    // In case of an error in the flow, return an empty array to prevent crashing the client.
    return { art: [] };
  }
}
