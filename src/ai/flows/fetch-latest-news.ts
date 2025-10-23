'use server';

import { ai } from '@/ai/genkit';
import { z } from 'zod';
import { googleAI } from '@genkit-ai/google-genai';

const FetchLatestNewsInputSchema = z.object({
  hominidName: z.string().describe('The name of the hominid species.'),
});
export type FetchLatestNewsInput = z.infer<typeof FetchLatestNewsInputSchema>;

const FetchLatestNewsOutputSchema = z.object({
  news: z
    .string()
    .describe(
      'A short, engaging news-style paragraph about a recent discovery, interesting fact, or relevant update about the specified hominid. Should be written as if by a science journalist.'
    ),
});
export type FetchLatestNewsOutput = z.infer<typeof FetchLatestNewsOutputSchema>;

const fetchLatestNewsFlow = ai.defineFlow(
  {
    name: 'fetchLatestNewsFlow',
    inputSchema: FetchLatestNewsInputSchema,
    outputSchema: FetchLatestNewsOutputSchema,
  },
  async (input) => {
    const prompt = `Actúa como un periodista científico. Escribe un único párrafo de estilo noticioso, corto y atractivo (no más de 3-4 frases) sobre un descubrimiento reciente, un hecho interesante y poco conocido, o una actualización científica relevante sobre ${input.hominidName}. Céntrate en una sola pieza de información convincente.`;
    
    try {
      const { output } = await ai.generate({
        prompt: prompt,
        model: googleAI.model('gemini-1.5-flash-latest'),
        output: {
          schema: FetchLatestNewsOutputSchema,
        },
      });
      return output!;
    } catch (error) {
      console.error('Error generating news with gemini-1.5-flash-latest:', error);
      // If the primary model fails, we could try a fallback, but for now we just re-throw or handle it.
      // For simplicity, we'll let it fail and be handled by the client.
      // A more robust solution could involve a retry or a different model.
      throw new Error('Failed to generate news content.');
    }
  }
);

export async function fetchLatestNews(
  input: FetchLatestNewsInput
): Promise<FetchLatestNewsOutput> {
  return await fetchLatestNewsFlow(input);
}
