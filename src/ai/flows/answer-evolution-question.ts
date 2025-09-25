'use server';

/**
 * @fileOverview Este archivo define un flujo de Genkit para responder preguntas sobre la evolución humana.
 *
 * - answerEvolutionQuestion - Una función que responde preguntas sobre la evolución humana.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';
import wav from 'wav';

const AnswerEvolutionQuestionInputSchema = z.object({
  question: z.string().describe('La pregunta sobre la evolución humana.'),
});

export type AnswerEvolutionQuestionInput = z.infer<
  typeof AnswerEvolutionQuestionInputSchema
>;

const AnswerEvolutionQuestionOutputSchema = z.object({
  answer: z.string().describe('La respuesta a la pregunta.'),
  audio: z.string().optional().describe('La respuesta en formato de audio (data URI).'),
});

export type AnswerEvolutionQuestionOutput = z.infer<
  typeof AnswerEvolutionQuestionOutputSchema
>;

export async function answerEvolutionQuestion(
  input: AnswerEvolutionQuestionInput,
  onChange: (chunk: AnswerEvolutionQuestionOutput) => void
): Promise<void> {
  const { stream } = answerEvolutionQuestionFlow(input);

  for await (const chunk of stream) {
    onChange(chunk);
  }
}

const prompt = `Eres un experto en evolución humana y paleoantropología. Responde la siguiente pregunta de forma clara y concisa.`;

const answerEvolutionQuestionFlow = ai.defineFlow(
  {
    name: 'answerEvolutionQuestionFlow',
    inputSchema: AnswerEvolutionQuestionInputSchema,
    outputSchema: AnswerEvolutionQuestionOutputSchema,
  },
  async ({ question }) => {
    const { stream, response } = await ai.generateStream({
      prompt: `${prompt}\n\nPregunta: ${question}`,
    });

    // Stream the text response
    (async () => {
      for await (const chunk of stream) {
        if (chunk.text) {
          answerEvolutionQuestionFlow.stream({ answer: chunk.text });
        }
      }
    })();

    // Wait for the full text response to generate audio
    const fullResponse = await response;
    const answer = fullResponse.text;

    const { media } = await ai.generate({
      model: 'googleai/gemini-2.5-flash-preview-tts',
      config: {
        responseModalities: ['AUDIO'],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: { voiceName: 'Algenib' },
          },
        },
      },
      prompt: answer,
    });

    if (media) {
      const audioBuffer = Buffer.from(
        media.url.substring(media.url.indexOf(',') + 1),
        'base64'
      );
      const audioBase64 = await toWav(audioBuffer);
      answerEvolutionQuestionFlow.stream({ answer, audio: `data:audio/wav;base64,${audioBase64}` });
    } else {
        answerEvolutionQuestionFlow.stream({ answer });
    }

    return answerEvolutionQuestionFlow.output();
  }
);

async function toWav(
  pcmData: Buffer,
  channels = 1,
  rate = 24000,
  sampleWidth = 2
): Promise<string> {
  return new Promise((resolve, reject) => {
    const writer = new wav.Writer({
      channels,
      sampleRate: rate,
      bitDepth: sampleWidth * 8,
    });

    const bufs: any[] = [];
    writer.on('error', reject);
    writer.on('data', function (d) {
      bufs.push(d);
    });
    writer.on('end', function () {
      resolve(Buffer.concat(bufs).toString('base64'));
    });

    writer.write(pcmData);
    writer.end();
  });
}
