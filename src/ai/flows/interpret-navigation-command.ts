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


const navigationPrompt = ai.definePrompt({
    name: 'interpretNavigationPrompt',
    input: { schema: NAV_COMMAND_INPUT_SCHEMA },
    output: { schema: NAV_COMMAND_OUTPUT_SCHEMA },
    prompt: `You are an expert voice command interpreter for a web application about human evolution. Your task is to quickly and accurately determine the user's intent from their voice command. The intent can be to navigate to a page or to search.

      The available pages are:
      - Main Menu: "/" (commands: "menú principal", "inicio", "home", "main menu")
      - EvoluFace: "/evoluface" (commands: "evoluface", "ver rostros", "face evolution")
      - Timeline: "/timeline" (commands: "línea de tiempo", "timeline", "ver cronología")
      - Culture Gallery: "/cultura" (commands: "cultura", "galería", "videos")
      - Discoveries Table: "/hominids" (commands: "descubrimientos", "hallazgos", "discoveries")
      - Archeology Table: "/archeology" (commands: "arqueología", "artefactos", "archeology")
      - Search Page: "/search" (commands: "buscar", "encontrar", "search")

      Analyze the user's command: "{{command}}"

      1.  **Navigation**: If the command clearly matches one of the pages (e.g., "go to timeline", "open main menu", "muéstrame la línea de tiempo", "quiero ver los descubrimientos"), set action to "navigate" and path to the corresponding page path (e.g., "/timeline"). Be flexible with phrasing.

      2.  **Search**: If the command implies a search (e.g., "search for homo sapiens", "show me neanderthal", "buscar bifaz", "encuentra a lucy"), set action to "search" and path to the core search term (e.g., "homo sapiens", "neanderthal", "bifaz", "lucy").

      3.  **Default**: If the command is ambiguous or doesn't fit, default to navigating to the main menu. Set action to "navigate" and path to "/".

      Respond ONLY with the JSON object. Be fast and precise.`
});


const interpretNavigationCommandFlow = ai.defineFlow(
  {
    name: 'interpretNavigationCommandFlow',
    inputSchema: NAV_COMMAND_INPUT_SCHEMA,
    outputSchema: NAV_COMMAND_OUTPUT_SCHEMA,
  },
  async (input) => {
    try {
      const { output } = await navigationPrompt(input);
      return output!;
    } catch (error) {
      console.error(
        'Error interpreting voice command:',
        error
      );
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
