'use client';

import { useState, useRef, useEffect } from 'react';
import { answerEvolutionQuestion } from '@/ai/flows/answer-evolution-question';
import { z } from 'zod';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Mic, Send, Bot, User, Loader2 } from 'lucide-react';

interface ChatProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
}

type Message = {
  id: string;
  role: 'user' | 'bot';
  text: string;
  audio?: string;
};

const AnswerEvolutionQuestionInputSchema = z.object({
  question: z.string().describe('La pregunta sobre la evolución humana.'),
});

type AnswerEvolutionQuestionInput = z.infer<
  typeof AnswerEvolutionQuestionInputSchema
>;

const AnswerEvolutionQuestionOutputSchema = z.object({
  answer: z.string().describe('La respuesta a la pregunta.'),
  audio: z
    .string()
    .optional()
    .describe('La respuesta en formato de audio (data URI).'),
});

type AnswerEvolutionQuestionOutput = z.infer<
  typeof AnswerEvolutionQuestionOutputSchema
>;

export function Chat({ isOpen, onOpenChange }: ChatProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (scrollAreaRef.current) {
      const scrollableView = scrollAreaRef.current.querySelector('div');
      if (scrollableView) {
        scrollableView.scrollTop = scrollableView.scrollHeight;
      }
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() && audioChunksRef.current.length === 0) return;

    let userMessageText = input;

    if (audioChunksRef.current.length > 0) {
      // For now, if there is audio, let's use a placeholder.
      // A more advanced version could handle audio transcription.
      if (!userMessageText) {
        userMessageText = '... (pregunta de audio)';
      }
    }

    const userMessageId = `user-${Date.now()}`;
    const botMessageId = `bot-${Date.now()}`;

    const newUserMessage: Message = {
      id: userMessageId,
      role: 'user',
      text: userMessageText,
    };

    setMessages(prev => [
      ...prev,
      newUserMessage,
      { id: botMessageId, role: 'bot', text: '' }, // Add empty bot message
    ]);

    setInput('');
    setIsLoading(true);
    audioChunksRef.current = [];

    try {
      await answerEvolutionQuestion({ question: userMessageText }, chunk => {
        setMessages(prev =>
          prev.map(msg =>
            msg.id === botMessageId
              ? { ...msg, text: chunk.answer, audio: chunk.audio }
              : msg
          )
        );
        if (
          chunk.audio &&
          audioRef.current &&
          audioRef.current.src !== chunk.audio
        ) {
          audioRef.current.src = chunk.audio;
          audioRef.current.play();
        }
      });
    } catch (error) {
      console.error('Error al obtener respuesta:', error);
      setMessages(prev =>
        prev.map(msg =>
          msg.id === botMessageId
            ? {
                ...msg,
                text: 'Lo siento, no pude procesar tu pregunta en este momento.',
              }
            : msg
        )
      );
    } finally {
      setIsLoading(false);
    }
  };

  const startRecording = async () => {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: true,
        });
        mediaRecorderRef.current = new MediaRecorder(stream);
        audioChunksRef.current = [];

        mediaRecorderRef.current.ondataavailable = event => {
          audioChunksRef.current.push(event.data);
        };

        mediaRecorderRef.current.onstop = () => {
          setInput('... (pregunta de audio, transcríbela)');
          setIsRecording(false);
        };

        mediaRecorderRef.current.start();
        setIsRecording(true);
      } catch (err) {
        console.error('Error starting recording:', err);
        // You could show a toast to the user here
      }
    }
  };

  const stopRecording = () => {
    if (
      mediaRecorderRef.current &&
      mediaRecorderRef.current.state === 'recording'
    ) {
      mediaRecorderRef.current.stop();
    }
  };

  const toggleRecording = () => {
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  };

  useEffect(() => {
    if (!isOpen) {
      setInput('');
      setIsLoading(false);
      if (isRecording) {
        stopRecording();
      }
    }
  }, [isOpen, isRecording]);

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent className="flex flex-col w-full sm:max-w-lg">
        <SheetHeader>
          <SheetTitle>Chatea con un experto en evolución</SheetTitle>
          <SheetDescription>
            Haz cualquier pregunta sobre la evolución humana.
          </SheetDescription>
        </SheetHeader>
        <ScrollArea className="flex-grow my-4 pr-4" ref={scrollAreaRef}>
          <div className="space-y-4">
            {messages.map(message => (
              <div
                key={message.id}
                className={`flex items-start gap-3 ${
                  message.role === 'user' ? 'justify-end' : ''
                }`}
              >
                {message.role === 'bot' && (
                  <div className="bg-primary rounded-full p-2">
                    <Bot className="text-primary-foreground h-5 w-5" />
                  </div>
                )}
                <div
                  className={`rounded-lg px-4 py-2 max-w-[80%] ${
                    message.role === 'user'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted'
                  }`}
                >
                  {message.text ? (
                    <p className="text-sm">{message.text}</p>
                  ) : (
                    <Loader2 className="h-5 w-5 animate-spin" />
                  )}
                </div>
                {message.role === 'user' && (
                  <div className="bg-muted rounded-full p-2">
                    <User className="h-5 w-5" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </ScrollArea>
        <SheetFooter>
          <div className="flex w-full items-center space-x-2">
            <Input
              type="text"
              placeholder={
                isRecording ? 'Grabando...' : 'Escribe tu pregunta...'
              }
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyPress={e => e.key === 'Enter' && handleSend()}
              disabled={isLoading || isRecording}
            />
            <Button
              type="button"
              size="icon"
              onClick={toggleRecording}
              variant={isRecording ? 'destructive' : 'outline'}
              disabled={isLoading}
            >
              <Mic className="h-5 w-5" />
            </Button>
            <Button
              type="submit"
              size="icon"
              onClick={handleSend}
              disabled={
                isLoading ||
                (!input.trim() &&
                  !isRecording &&
                  audioChunksRef.current.length === 0)
              }
            >
              <Send className="h-5 w-5" />
            </Button>
          </div>
        </SheetFooter>
        <audio ref={audioRef} className="hidden" />
      </SheetContent>
    </Sheet>
  );
}
