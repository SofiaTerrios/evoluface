'use server';
/**
 * @fileoverview A flow that generates an informative label for a given subject.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';

const GenerateInformativeLabelsInputSchema = z.object({
  name: z.string().describe('The name of the subject (e.g., a hominid species).'),
  facialFeatures: z.string().describe('A description of the subject\'s facial features.'),
  type: z.enum(['face', 'cranium']).describe('The type of image being described.'),
});

const GenerateInformativeLabelsOutputSchema = z.object({
  label: z.string().describe('A short, engaging, and informative label for the subject, suitable for a museum exhibit. The label should be in Spanish and no longer than 20 words.'),
});

export type GenerateInformativeLabelsInput = z.infer<typeof GenerateInformativeLabelsInputSchema>;
export type GenerateInformativeLabelsOutput = z.infer<typeof GenerateInformativeLabelsOutputSchema>;

export async function generateInformativeLabels(
  input: GenerateInformativeLabelsInput
): Promise<GenerateInformativeLabelsOutput> {
  return generateInformativeLabelsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateInformativeLabelsPrompt',
  input: { schema: GenerateInformativeLabelsInputSchema },
  output: { schema: GenerateInformativeLabelsOutputSchema },
  prompt: `Generate a short, engaging, and informative label for a museum exhibit based on the following information. The label must be in Spanish and should not exceed 20 words.

Subject Name: {{{name}}}
Key Features: {{{facialFeatures}}}
Image Type: {{{type}}}

Focus on creating a label that sparks curiosity and provides a key piece of information about the subject.
`,
});

const generateInformativeLabelsFlow = ai.defineFlow(
  {
    name: 'generateInformativeLabelsFlow',
    inputSchema: GenerateInformativeLabelsInputSchema,
    outputSchema: GenerateInformativeLabelsOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
