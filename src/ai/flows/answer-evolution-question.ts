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

type AnswerEvolutionQuestionInput = z.infer<
  typeof AnswerEvolutionQuestionInputSchema
>;

const AnswerEvolutionQuestionOutputSchema = z.object({
  answer: z.string().describe('La respuesta a la pregunta.'),
  audio: z.string().optional().describe('La respuesta en formato de audio (data URI).'),
});

type AnswerEvolutionQuestionOutput = z.infer<
  typeof AnswerEvolutionQuestionOutputSchema
>;

export async function answerEvolutionQuestion(
  input: AnswerEvolutionQuestionInput,
  onChange: (chunk: AnswerEvolutionQuestionOutput) => void
): Promise<void> {
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

    let fullAnswer = '';
    // Stream the text response
    for await (const chunk of stream) {
      if (chunk.text) {
        fullAnswer += chunk.text;
        onChange({ answer: fullAnswer });
      }
    }
    
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
        prompt: fullAnswer,
    });

    if (media) {
        const audioBuffer = Buffer.from(
            media.url.substring(media.url.indexOf(',') + 1),
            'base64'
        );
        const audioBase64 = await toWav(audioBuffer);
        onChange({ answer: fullAnswer, audio: `data:audio/wav;base64,${audioBase64}` });
    } else {
        onChange({ answer: fullAnswer });
    }
  }
);
  await answerEvolutionQuestionFlow(input);
}

const prompt = `Eres un experto en evolución humana y paleoantropología. Responde la siguiente pregunta de forma clara y concisa.`;

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
