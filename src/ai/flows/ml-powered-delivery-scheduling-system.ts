'use server';
/**
 * @fileOverview An AI agent that provides details about the ML-powered delivery scheduling system.
 *
 * - mlPoweredDeliverySchedulingSystem - A function that returns details about the ML-powered delivery scheduling system.
 * - MlPoweredDeliverySchedulingSystemInput - The input type for the mlPoweredDeliverySchedulingSystem function.
 * - MlPoweredDeliverySchedulingSystemOutput - The return type for the mlPoweredDeliverySchedulingSystem function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const MlPoweredDeliverySchedulingSystemInputSchema = z.object({
  query: z
    .string()
    .describe("A question about the ML-powered delivery scheduling system."),
});
export type MlPoweredDeliverySchedulingSystemInput = z.infer<typeof MlPoweredDeliverySchedulingSystemInputSchema>;

const MlPoweredDeliverySchedulingSystemOutputSchema = z.object({
  details: z.string().describe('Details about the ML-powered delivery scheduling system, including key metrics such as the 44.21% efficiency improvement.'),
});
export type MlPoweredDeliverySchedulingSystemOutput = z.infer<typeof MlPoweredDeliverySchedulingSystemOutputSchema>;

export async function mlPoweredDeliverySchedulingSystem(input: MlPoweredDeliverySchedulingSystemInput): Promise<MlPoweredDeliverySchedulingSystemOutput> {
  return mlPoweredDeliverySchedulingSystemFlow(input);
}

const prompt = ai.definePrompt({
  name: 'mlPoweredDeliverySchedulingSystemPrompt',
  input: {schema: MlPoweredDeliverySchedulingSystemInputSchema},
  output: {schema: MlPoweredDeliverySchedulingSystemOutputSchema},
  prompt: `Anda adalah seorang ahli AI yang menjelaskan sistem penjadwalan pengiriman berbasis ML yang dirancang oleh Audy.

  Sistem ini mencapai peningkatan efisiensi sebesar 44.21%.

  Pertanyaan pengguna: {{{query}}}

  Berikan penjelasan terperinci tentang sistem dan manfaatnya dalam Bahasa Indonesia.
`,
});

const mlPoweredDeliverySchedulingSystemFlow = ai.defineFlow(
  {
    name: 'mlPoweredDeliverySchedulingSystemFlow',
    inputSchema: MlPoweredDeliverySchedulingSystemInputSchema,
    outputSchema: MlPoweredDeliverySchedulingSystemOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
