'use server';

/**
 * @fileOverview This file defines a Genkit flow for fetching the latest news
 * and discoveries related to a specific hominid stage.
 *
 * - fetchLatestNews - A function that returns recent news about a hominid.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';

const LatestNewsInputSchema = z.object({
  hominidStage: z
    .string()
    .describe('The hominid stage (e.g., Homo habilis, Homo erectus).'),
});

const LatestNewsOutputSchema = z.object({
  news: z.string().describe('A summary of recent news or discoveries about the hominid, in Spanish.'),
});

export async function fetchLatestNews(
  input: z.infer<typeof LatestNewsInputSchema>
): Promise<z.infer<typeof LatestNewsOutputSchema>> {
  return latestNewsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'latestNewsPrompt',
  input: { schema: LatestNewsInputSchema },
  output: { schema: LatestNewsOutputSchema },
  prompt: `Eres un paleontólogo y divulgador científico. Busca y resume en español las noticias o descubrimientos más recientes y relevantes sobre {{{hominidStage}}}. La respuesta debe ser concisa, interesante y fácil de entender para el público general. Si no hay noticias recientes, proporciona un dato curioso o un resumen de un descubrimiento importante sobre esa especie.`,
});

const latestNewsFlow = ai.defineFlow(
  {
    name: 'latestNewsFlow',
    inputSchema: LatestNewsInputSchema,
    outputSchema: LatestNewsOutputSchema,
  },
  async input => {
    const { output } = await prompt(input);
    return output!;
  }
);
