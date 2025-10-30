'use server';
/**
 * @fileOverview Flow to identify content from an image and return a navigation path.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';

const IdentifyContentInputSchema = z.object({
  imageDataUri: z
    .string()
    .describe(
      "A photo of an object, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type IdentifyContentInput = z.infer<typeof IdentifyContentInputSchema>;

const IdentifyContentOutputSchema = z.object({
  path: z
    .string()
    .describe(
      'The destination path corresponding to the identified content. If no content is identified, this will be an empty string.'
    ),
});
export type IdentifyContentOutput = z.infer<
  typeof IdentifyContentOutputSchema
>;

const identificationPrompt = ai.definePrompt({
  name: 'identifyContentPrompt',
  input: { schema: IdentifyContentInputSchema },
  output: { schema: IdentifyContentOutputSchema },
  prompt: `You are a visual guide for a museum exhibit on human evolution. Your task is to identify the subject in the user's photo and provide the correct navigation path within the web app.

The available content and their paths are:
- An Australopithecus (face or skull): /evoluface
- A Homo Habilis (face or skull): /evoluface
- A Homo Erectus (face or skull): /evoluface
- A Homo Heidelbergensis (face or skull): /evoluface
- A Neanderthal (face or skull): /evoluface
- A Homo Sapiens (face or skull): /evoluface
- Ancient footprints like Laetoli: /hominids
- Oldowan or Acheulean stone tools (like a biface or hand axe): /archeology
- Cave paintings or ancient art: /cultura
- A fossil dig site or excavation: /hominids

Analyze the user's image: {{media url=imageDataUri}}

1.  **Identify the main subject.** Is it a hominid skull? A stone tool? A painting?
2.  **Match it to a path.** Based on your identification, determine the single most relevant path from the list above.
3.  **If it is a hominid face or skull**, the correct path is always /evoluface.
4.  **If it's a tool**, the path is /archeology.
5.  **If you cannot confidently identify the subject** or it doesn't match anything in the list, return an empty string for the path.

Respond ONLY with the JSON object. Be fast and precise.`,
});

const identifyContentFlow = ai.defineFlow(
  {
    name: 'identifyContentFlow',
    inputSchema: IdentifyContentInputSchema,
    outputSchema: IdentifyContentOutputSchema,
  },
  async (input) => {
    const { output } = await identificationPrompt(input);
    return output!;
  }
);

export async function identifyContentFromImage(
  input: IdentifyContentInput
): Promise<IdentifyContentOutput> {
  return await identifyContentFlow(input);
}
