'use server';

/**
 * @fileOverview An AI-powered tool to forecast potential improvements in delivery and warehouse times.
 *
 * - efficiencyPredictionTool - A function that handles the efficiency prediction process.
 * - EfficiencyPredictionInput - The input type for the efficiencyPredictionTool function.
 * - EfficiencyPredictionOutput - The return type for the efficiencyPredictionTool function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const EfficiencyPredictionInputSchema = z.object({
  currentDeliveryTime: z
    .number()
    .describe('The current average delivery time in hours.'),
  currentWarehouseTime: z
    .number()
    .describe('The current average warehouse processing time in hours.'),
  automationStrategy: z
    .string()
    .describe(
      'A description of the automation strategies and/or AI deployment being considered.'
    ),
});
export type EfficiencyPredictionInput = z.infer<
  typeof EfficiencyPredictionInputSchema
>;

const EfficiencyPredictionOutputSchema = z.object({
  predictedDeliveryTime: z
    .number()
    .describe('The predicted average delivery time in hours after automation.'),
  predictedWarehouseTime: z
    .number()
    .describe(
      'The predicted average warehouse processing time in hours after automation.'
    ),
  reasoning: z
    .string()
    .describe(
      'The reasoning behind the predicted changes in delivery and warehouse times.'
    ),
});
export type EfficiencyPredictionOutput = z.infer<
  typeof EfficiencyPredictionOutputSchema
>;

export async function efficiencyPredictionTool(
  input: EfficiencyPredictionInput
): Promise<EfficiencyPredictionOutput> {
  return efficiencyPredictionFlow(input);
}

const prompt = ai.definePrompt({
  name: 'efficiencyPredictionPrompt',
  input: {schema: EfficiencyPredictionInputSchema},
  output: {schema: EfficiencyPredictionOutputSchema},
  prompt: `You are an expert in logistics and supply chain efficiency. Based on the current delivery and warehouse times, and the proposed automation strategy, you will predict the new delivery and warehouse times after the automation is implemented.\n\nCurrent Delivery Time: {{currentDeliveryTime}} hours\nCurrent Warehouse Time: {{currentWarehouseTime}} hours\nAutomation Strategy: {{automationStrategy}}\n\nProvide a reasoning for your prediction. Return the predicted delivery and warehouse times in hours.
\nOutput:
`,
});

const efficiencyPredictionFlow = ai.defineFlow(
  {
    name: 'efficiencyPredictionFlow',
    inputSchema: EfficiencyPredictionInputSchema,
    outputSchema: EfficiencyPredictionOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
