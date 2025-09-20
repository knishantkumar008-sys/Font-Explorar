/**
 * @fileOverview Genkit initialization and configuration.
 *
 * This file initializes the Genkit AI instance with the Google AI plugin.
 * It ensures that the AI capabilities are available throughout the application.
 */

import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/googleai';

export const ai = genkit({
  plugins: [
    googleAI(),
  ],
  enableTracingAndMetrics: true,
});
