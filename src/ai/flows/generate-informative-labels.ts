'use server';

/**
 * @fileOverview This file defines a Genkit flow for generating informative labels
 *  describing key evolutionary changes in facial features during hominid transformations.
 *
 * - generateInformativeLabels - A function that generates labels for facial transformations.
 * - GenerateInformativeLabelsInput - The input type for the generateInformativeLabels function.
 * - GenerateInformativeLabelsOutput - The return type for the generateInformativeLabels function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateInformativeLabelsInputSchema = z.object({
  hominidStage: z
    .string()
    .describe('The current hominid stage (e.g., Homo habilis, Homo erectus).'),
  facialFeatures: z
    .string()
    .describe(
      'Description of the facial features in the current hominid stage.'
    ),
});
export type GenerateInformativeLabelsInput = z.infer<
  typeof GenerateInformativeLabelsInputSchema
>;

const GenerateInformativeLabelsOutputSchema = z.object({
  label: z
    .string()
    .describe(
      'An informative label describing a key evolutionary change in facial features for the current hominid stage.'
    ),
});
export type GenerateInformativeLabelsOutput = z.infer<
  typeof GenerateInformativeLabelsOutputSchema
>;

export async function generateInformativeLabels(
  input: GenerateInformativeLabelsInput
): Promise<GenerateInformativeLabelsOutput> {
  return generateInformativeLabelsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateInformativeLabelsPrompt',
  input: {schema: GenerateInformativeLabelsInputSchema},
  output: {schema: GenerateInformativeLabelsOutputSchema},
  prompt: `You are an expert in human evolution. You will generate an informative label describing a key evolutionary change in facial features for a given hominid stage.

Hominid Stage: {{{hominidStage}}}
Facial Features: {{{facialFeatures}}}

Informative Label:`,
});

const generateInformativeLabelsFlow = ai.defineFlow(
  {
    name: 'generateInformativeLabelsFlow',
    inputSchema: GenerateInformativeLabelsInputSchema,
    outputSchema: GenerateInformativeLabelsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
