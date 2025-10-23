'use server';

import { ai } from '@/ai/genkit';
import { z } from 'zod';
import { googleAI } from '@genkit-ai/google-genai';

const NAV_COMMAND_INPUT_SCHEMA = z.object({
  command: z.string().describe('The voice command spoken by the user.'),
});
export type NavigateCommandInput = z.infer<typeof NAV_COMMAND_INPUT_SCHEMA>;

const NAV_COMMAND_OUTPUT_SCHEMA = z.object({
  action: z
    .enum(['navigate', 'search'])
    .describe('The action to perform: navigate to a page or perform a search.'),
  path: z
    .string()
    .describe(
      'The destination path or search query. If action is "navigate", this is a path. If action is "search", this is the search term.'
    ),
});
export type NavigateCommandOutput = z.infer<typeof NAV_COMMAND_OUTPUT_SCHEMA>;

const interpretNavigationCommandFlow = ai.defineFlow(
  {
    name: 'interpretNavigationCommandFlow',
    inputSchema: NAV_COMMAND_INPUT_SCHEMA,
    outputSchema: NAV_COMMAND_OUTPUT_SCHEMA,
  },
  async (input) => {
    const prompt = `You are a voice command interpreter for a web application about human evolution. Your task is to determine the user's intent from their voice command. The intent can be either to navigate to a specific page or to search for content.

      The available pages for navigation are:
      - Main Menu: "/"
      - EvoluFace (face evolution): "/evoluface"
      - Timeline: "/timeline"
      - Layered Videos / Culture: "/cultura"
      - Discoveries Table: "/hominids"
      - Archeology Table: "/archeology"
      - Search Page: "/search"

      Analyze the user's command: "${input.command}"

      1.  If the command clearly matches one of the navigation pages (e.g., "go to timeline", "open main menu", "muéstrame la línea de tiempo"), set the action to "navigate" and the path to the corresponding page path (e.g., "/timeline").

      2.  If the command implies a search (e.g., "search for homo sapiens", "show me neanderthal", "buscar bifaz", "muestra homo sapiens"), set the action to "search" and the path to the search term (e.g., "homo sapiens", "neanderthal", "bifaz").

      3.  If the command is ambiguous or doesn't match any page or a clear search intent, default to navigating to the main menu. Set action to "navigate" and path to "/".

      Respond with ONLY the JSON object matching the output schema.`;

    try {
      const { output } = await ai.generate({
        prompt: prompt,
        model: googleAI.model('gemini-1.5-flash-latest'),
        output: {
          schema: NAV_COMMAND_OUTPUT_SCHEMA,
        },
      });
      return output!;
    } catch (error) {
       console.error('Error interpreting voice command with gemini-1.5-flash-latest:', error);
       // A more robust solution could involve a retry or a different model.
       // For now, we throw an error to be caught by the client.
       throw new Error('Failed to interpret voice command.');
    }
  }
);

export async function interpretNavigationCommand(
  input: NavigateCommandInput
): Promise<NavigateCommandOutput> {
  return await interpretNavigationCommandFlow(input);
}
