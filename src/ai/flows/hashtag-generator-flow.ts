/**
 * @fileOverview A Genkit flow for generating social media hashtags.
 */
'use server';

import {ai} from '@/ai/genkit';
import { z } from 'zod';

const HashtagRequestSchema = z.object({
  topic: z.string().describe('The topic or a brief description of the post.'),
});

/**
 * The main exported function that clients will call.
 * It takes a topic and returns a promise of generated hashtags.
 * @param {string} topic - The topic of the post.
 * @returns {Promise<{ hashtags: string[] }>} A promise that resolves to an array of generated hashtags.
 */
export async function generateHashtags(
  topic: string,
): Promise<{ hashtags: string[] }> {
  try {
    const fullPrompt = `You are an expert social media strategist.
      Generate a list of 20-30 relevant and trending hashtags for a post about the following topic: "${topic}".
      
      RULES:
      - Separate each hashtag with a space.
      - Start each hashtag with the # symbol.
      - Do not include any other text, explanation, or numbering.
      - Provide a mix of broad, niche, and community-specific hashtags.
      - Output should be a single block of text containing all hashtags.`;

    const result = await ai.generate({
      prompt: fullPrompt,
    });

    const rawOutput = result.text;

    if (!rawOutput) {
      console.error("AI response for hashtags was empty.");
      return {hashtags: []};
    }

    const hashtags = rawOutput.split(' ').map(h => h.trim()).filter(h => h.startsWith('#'));
    
    return { hashtags };

  } catch (error) {
    console.error("Error generating hashtags in flow:", error);
    return { hashtags: [] };
  }
}
