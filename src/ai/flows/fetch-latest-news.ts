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

const fetchLatestNewsFlow = ai.defineFlow(
  {
    name: 'fetchLatestNewsFlow',
    inputSchema: FetchLatestNewsInputSchema,
    outputSchema: FetchLatestNewsOutputSchema,
  },
  async (input) => {
    const { output } = await ai.generate({
      prompt: `Act as a science journalist. Write a single, short, and engaging news-style paragraph (no more than 3-4 sentences) about a recent discovery, an interesting and little-known fact, or a relevant scientific update concerning ${input.hominidName}. Focus on a single, compelling piece of information.`,
      model: 'googleai/gemini-2.5-flash',
      output: {
        schema: FetchLatestNewsOutputSchema,
      },
    });
    return output!;
  }
);

export async function fetchLatestNews(
  input: FetchLatestNewsInput
): Promise<FetchLatestNewsOutput> {
  return await fetchLatestNewsFlow(input);
}
