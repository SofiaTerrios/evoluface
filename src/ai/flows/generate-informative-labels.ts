'use server';

/**
 * @fileOverview Este archivo define un flujo de Genkit para generar etiquetas informativas
 * que describen cambios evolutivos clave en los rasgos faciales durante las transformaciones de los homínidos.
 *
 * - generateInformativeLabels - Una función que genera etiquetas para las transformaciones faciales.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateInformativeLabelsInputSchema = z.object({
  hominidStage: z
    .string()
    .describe('La etapa actual del homínido (por ejemplo, Homo habilis, Homo erectus).'),
  facialFeatures: z
    .string()
    .describe(
      'Descripción de los rasgos faciales en la etapa actual del homínido.'
    ),
});
export type GenerateInformativeLabelsInput = z.infer<typeof GenerateInformativeLabelsInputSchema>;

const GenerateInformativeLabelsOutputSchema = z.object({
  label: z
    .string()
    .describe(
      'Una etiqueta informativa que describe un cambio evolutivo clave en los rasgos faciales para la etapa actual del homínido.'
    ),
});

export async function generateInformativeLabels(
  input: GenerateInformativeLabelsInput
): Promise<z.infer<typeof GenerateInformativeLabelsOutputSchema>> {
  return generateInformativeLabelsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateInformativeLabelsPrompt',
  input: {schema: GenerateInformativeLabelsInputSchema},
  output: {schema: GenerateInformativeLabelsOutputSchema},
  prompt: `Eres un experto en evolución humana. Generarás una etiqueta informativa en español que describa un cambio evolutivo clave en los rasgos faciales para una etapa de homínido dada. La descripción debe ser diferente cada vez.

Etapa del Homínido: {{{hominidStage}}}
Rasgos Faciales: {{{facialFeatures}}}

Etiqueta Informativa:`,
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
