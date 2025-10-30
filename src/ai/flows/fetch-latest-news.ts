'use server';

import { ai } from '@/ai/genkit';
import { z } from 'zod';

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


const newsPrompt = ai.definePrompt({
    name: 'fetchNewsPrompt',
    input: { schema: FetchLatestNewsInputSchema },
    output: { schema: FetchLatestNewsOutputSchema },
    prompt: `Actúa como un periodista científico. Escribe un único párrafo de estilo noticioso, corto y atractivo (no más de 3-4 frases) sobre un descubrimiento reciente, un hecho interesante y poco conocido, o una actualización científica relevante sobre {{hominidName}}. Céntrate en una sola pieza de información convincente.`
});


const fetchLatestNewsFlow = ai.defineFlow(
  {
    name: 'fetchLatestNewsFlow',
    inputSchema: FetchLatestNewsInputSchema,
    outputSchema: FetchLatestNewsOutputSchema,
  },
  async (input) => {
    const { output } = await newsPrompt(input);
    return output!;
  }
);

export async function fetchLatestNews(
  input: FetchLatestNewsInput
): Promise<FetchLatestNewsOutput> {
  return await fetchLatestNewsFlow(input);
}
