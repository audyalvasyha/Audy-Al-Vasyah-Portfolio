'use server';
/**
 * @fileOverview An AI-powered tool to analyze tire condition from an image.
 *
 * - analyzeTireCondition - A function that handles the tire analysis process.
 * - AnalyzeTireConditionInput - The input type for the analyzeTireCondition function.
 * - AnalyzeTireConditionOutput - The return type for the analyzeTireCondition function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnalyzeTireConditionInputSchema = z.object({
  photoDataUri: z
    .string()
    .describe(
      "A photo of a single tire, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'"
    ),
});
export type AnalyzeTireConditionInput = z.infer<
  typeof AnalyzeTireConditionInputSchema
>;

const AnalyzeTireConditionOutputSchema = z.object({
  condition: z
    .enum(['Good', 'Worn', 'Damaged', 'Unknown'])
    .describe('The overall condition of the tire.'),
  wearLevel: z
    .string()
    .describe('A brief description of the tire tread wear level (e.g., "Normal Wear", "Severe Wear", "Uneven Wear").'),
  detectedDamage: z
    .string()
    .describe('Description of any detected damage like cuts, bulges, or punctures. "None" if no damage is found.'),
  recommendation: z
    .string()
    .describe('A brief recommendation for the tire (e.g., "Continue use", "Requires immediate replacement", "Monitor closely").'),
});
export type AnalyzeTireConditionOutput = z.infer<
  typeof AnalyzeTireConditionOutputSchema
>;

const prompt = ai.definePrompt({
  name: 'analyzeTireConditionPrompt',
  input: {schema: AnalyzeTireConditionInputSchema},
  output: {schema: AnalyzeTireConditionOutputSchema},
  prompt: `You are a professional tire inspector. Analyze the provided image of a single vehicle tire.

Based on the image, determine the tire's overall condition, tread wear level, and identify any visible damage (cuts, bulges, punctures, etc.).

Provide a concise, professional assessment and a clear recommendation.

Tire Image: {{media url=photoDataUri}}`,
});

const analyzeTireConditionFlow = ai.defineFlow(
  {
    name: 'analyzeTireConditionFlow',
    inputSchema: AnalyzeTireConditionInputSchema,
    outputSchema: AnalyzeTireConditionOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);


export async function analyzeTireCondition(
  input: AnalyzeTireConditionInput
): Promise<AnalyzeTireConditionOutput> {
  return analyzeTireConditionFlow(input);
}