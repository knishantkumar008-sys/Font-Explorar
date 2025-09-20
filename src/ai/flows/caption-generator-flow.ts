/**
 * @fileOverview A Genkit flow for generating social media captions.
 */
'use server';

import {ai} from '@/ai/genkit';
import { z } from 'zod';


const CaptionRequestSchema = z.object({
  topic: z.string().describe('The topic or a brief description of the post.'),
  tone: z.string().describe('The desired tone for the captions (e.g., "Funny", "Inspirational", "Professional").'),
});

/**
 * The main exported function that clients will call.
 * It takes a topic and tone, and returns a promise of generated captions.
 * @param {string} topic - The topic of the post.
 * @param {string} tone - The desired tone.
 * @returns {Promise<{ captions: string[] }>} A promise that resolves to an array of generated captions.
 */
export async function generateCaptions(
  topic: string,
  tone: string
): Promise<{ captions: string[] }> {
  try {
    const fullPrompt = `You are an expert social media copywriter.
      Generate 3 distinct and creative social media captions based on the following topic and tone.
      
      Topic: "${topic}"
      Tone: "${tone}"
      
      RULES:
      - Separate each of the 3 captions with the exact separator: <CAPTION>
      - Do not include any other text, explanation, or numbering.
      - Each caption should be ready to copy and paste.
      - Include relevant emojis where appropriate.`;

    const result = await ai.generate({
      prompt: fullPrompt,
    });

    const rawOutput = result.text;

    if (!rawOutput) {
      console.error("AI response for captions was empty.");
      return {captions: []};
    }

    const captions = rawOutput.split('<CAPTION>').map(c => c.trim()).filter(c => c.length > 0);
    
    return { captions };

  } catch (error) {
    console.error("Error generating captions in flow:", error);
    return { captions: [] };
  }
}
