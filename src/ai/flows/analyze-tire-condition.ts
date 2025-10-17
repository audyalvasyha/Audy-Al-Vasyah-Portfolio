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
    .enum(['Baik', 'Aus', 'Rusak', 'Tidak Diketahui'])
    .describe('Kondisi keseluruhan ban.'),
  wearLevel: z
    .string()
    .describe('Deskripsi singkat tentang tingkat keausan tapak ban (misalnya, "Keausan Normal", "Keausan Parah", "Keausan Tidak Merata").'),
  detectedDamage: z
    .string()
    .describe('Deskripsi kerusakan yang terdeteksi seperti sobekan, benjolan, atau tusukan. "Tidak ada" jika tidak ditemukan kerusakan.'),
  recommendation: z
    .string()
    .describe('Rekomendasi singkat untuk ban (misalnya, "Lanjutkan penggunaan", "Perlu segera diganti", "Pantau dengan cermat").'),
});
export type AnalyzeTireConditionOutput = z.infer<
  typeof AnalyzeTireConditionOutputSchema
>;

const prompt = ai.definePrompt({
  name: 'analyzeTireConditionPrompt',
  input: {schema: AnalyzeTireConditionInputSchema},
  output: {schema: AnalyzeTireConditionOutputSchema},
  prompt: `Anda adalah seorang inspektur ban profesional. Analisis gambar ban kendaraan yang disediakan.

Berdasarkan gambar, tentukan kondisi keseluruhan ban, tingkat keausan tapak, dan identifikasi kerusakan yang terlihat (sobekan, benjolan, tusukan, dll.).

Berikan penilaian yang ringkas, profesional, dan rekomendasi yang jelas dalam Bahasa Indonesia.

Gambar Ban: {{media url=photoDataUri}}`,
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
