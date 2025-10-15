'use server';
/**
 * @fileOverview AI-based Tire Inspection App Display Flow.
 *
 * This file defines a Genkit flow to display details about the Mitra Armada AI project, focusing on AI-powered tire inspection and the supervisor dashboard.
 *
 * @module ai/flows/ai-based-tire-inspection-app-display
 *
 * @interface AiBasedTireInspectionAppDisplayInput - Input type for the aiBasedTireInspectionAppDisplay function.
 * @interface AiBasedTireInspectionAppDisplayOutput - Output type for the aiBasedTireInspectionAppDisplay function, containing project details.
 * @function aiBasedTireInspectionAppDisplay - A function that retrieves and formats the AI-based tire inspection app details.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AiBasedTireInspectionAppDisplayInputSchema = z.object({
  projectName: z.string().describe('The name of the project.'),
});
export type AiBasedTireInspectionAppDisplayInput = z.infer<typeof AiBasedTireInspectionAppDisplayInputSchema>;

const AiBasedTireInspectionAppDisplayOutputSchema = z.object({
  title: z.string().describe('Title of the project.'),
  features: z.array(z.string()).describe('List of key features of the project.'),
  description: z.string().describe('A brief description of the project.'),
});

export type AiBasedTireInspectionAppDisplayOutput = z.infer<typeof AiBasedTireInspectionAppDisplayOutputSchema>;

export async function aiBasedTireInspectionAppDisplay(
  input: AiBasedTireInspectionAppDisplayInput
): Promise<AiBasedTireInspectionAppDisplayOutput> {
  return aiBasedTireInspectionAppDisplayFlow(input);
}

const aiBasedTireInspectionAppDisplayPrompt = ai.definePrompt({
  name: 'aiBasedTireInspectionAppDisplayPrompt',
  input: {
    schema: AiBasedTireInspectionAppDisplayInputSchema,
  },
  output: {
    schema: AiBasedTireInspectionAppDisplayOutputSchema,
  },
  prompt: `You are a project description generator. Generate a brief description, title, and a list of key features for the following project:

Project Name: {{{projectName}}}

Description should be 2 sentences. The title should be less than 10 words.
The list of features should be 2 items, and each item should be less than 15 words.

Make it sound professional and engaging for a portfolio website.
`,
});

const aiBasedTireInspectionAppDisplayFlow = ai.defineFlow(
  {
    name: 'aiBasedTireInspectionAppDisplayFlow',
    inputSchema: AiBasedTireInspectionAppDisplayInputSchema,
    outputSchema: AiBasedTireInspectionAppDisplayOutputSchema,
  },
  async input => {
    const {output} = await aiBasedTireInspectionAppDisplayPrompt(input);
    return output!;
  }
);
