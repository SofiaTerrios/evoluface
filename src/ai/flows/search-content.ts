'use server';

import { ai } from '@/ai/genkit';
import { z } from 'zod';
import { getAllSearchableData, type SearchableItem } from '@/lib/searchable-data';

const SearchContentInputSchema = z.object({
  query: z.string().describe('The user\'s search query.'),
});
export type SearchContentInput = z.infer<typeof SearchContentInputSchema>;

const SearchContentOutputSchema = z.object({
  results: z.array(
    z.object({
      id: z.string(),
      title: z.string(),
      description: z.string(),
      type: z.string(),
      path: z.string(),
    })
  ),
});
export type SearchContentOutput = z.infer<typeof SearchContentOutputSchema>;


const searchContentFlow = ai.defineFlow(
  {
    name: 'searchContentFlow',
    inputSchema: SearchContentInputSchema,
    outputSchema: SearchContentOutputSchema,
  },
  async ({ query }) => {
    const allData = getAllSearchableData();
    const lowerCaseQuery = query.toLowerCase();

    const filteredData = allData.filter(
      (item) =>
        item.title.toLowerCase().includes(lowerCaseQuery) ||
        item.description.toLowerCase().includes(lowerCaseQuery) ||
        (item.tags && item.tags.some(t => t.toLowerCase().includes(lowerCaseQuery)))
    );

    return {
      results: filteredData,
    };
  }
);


export async function searchContent(
  input: SearchContentInput
): Promise<SearchContentOutput> {
  return await searchContentFlow(input);
}
