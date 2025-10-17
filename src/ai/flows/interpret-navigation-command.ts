'use server';

import { ai } from '@/ai/genkit';
import { z } from 'zod';

const NAV_COMMAND_INPUT_SCHEMA = z.object({
  command: z.string().describe('The voice command spoken by the user.'),
});
export type NavigateCommandInput = z.infer<typeof NAV_COMMAND_INPUT_SCHEMA>;

const NAV_COMMAND_OUTPUT_SCHEMA = z.object({
  path: z
    .string()
    .describe(
      'The destination path to navigate to. Should be one of the available paths.'
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
    const { output } = await ai.generate({
      prompt: `You are a voice command interpreter for a web application about human evolution. Your task is to determine the user's desired navigation destination from their voice command.

      The available pages and their paths are:
      - Main Menu: "/"
      - EvoluFace (face evolution): "/evoluface"
      - Timeline: "/timeline"
      - Layered Videos / Culture: "/cultura"
      - Discoveries Table: "/hominids"
      - Archeology Table: "/archeology"
      
      Analyze the user's command: "${input.command}"
      
      Based on the command, determine which path the user wants to navigate to. Respond with ONLY the path. For example, if the user says "take me to the timeline", you should determine the path is "/timeline". If they say "main menu", the path is "/". If the command is unclear or doesn't match any page, determine the path as "/".`,
      model: 'googleai/gemini-2.5-flash',
      output: {
        schema: NAV_COMMAND_OUTPUT_SCHEMA,
      },
    });
    return output!;
  }
);

export async function interpretNavigationCommand(
  input: NavigateCommandInput
): Promise<NavigateCommandOutput> {
  return await interpretNavigationCommandFlow(input);
}
