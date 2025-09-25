'use client';

import { useState, useRef, useEffect } from 'react';
import { answerEvolutionQuestion } from '@/ai/flows/answer-evolution-question';
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
  id: number;
  role: 'user' | 'bot';
  text: string;
  audio?: string;
};

export function Chat({ isOpen, onOpenChange }: ChatProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handleSend = async () => {
    if (!input.trim() && audioChunksRef.current.length === 0) return;
  
    let userMessageText = input;
    let audioBlob: Blob | null = null;
  
    if (audioChunksRef.current.length > 0) {
      audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
      // We will handle transcription later if needed, for now let's assume text input is primary
      // For this implementation, we will prioritize text input if both are present.
      // A more advanced version could handle audio transcription.
      // For now, if there is audio, let's clear the text input and use a placeholder
      if (!userMessageText) {
        userMessageText = '... (pregunta de audio)';
      }
    }
    
    const newUserMessage: Message = {
      id: Date.now(),
      role: 'user',
      text: userMessageText,
    };

    setMessages(prev => [...prev, newUserMessage]);
    setInput('');
    setIsLoading(true);
    audioChunksRef.current = [];

    try {
      const result = await answerEvolutionQuestion({ question: userMessageText });
      const botMessage: Message = {
        id: Date.now() + 1,
        role: 'bot',
        text: result.answer,
        audio: result.audio,
      };
      setMessages(prev => [...prev, botMessage]);
      if (result.audio && audioRef.current) {
        audioRef.current.src = result.audio;
        audioRef.current.play();
      }
    } catch (error) {
      console.error('Error al obtener respuesta:', error);
      const errorMessage: Message = {
        id: Date.now() + 1,
        role: 'bot',
        text: 'Lo siento, no pude procesar tu pregunta en este momento.',
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const startRecording = async () => {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      audioChunksRef.current = [];

      mediaRecorderRef.current.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };

      mediaRecorderRef.current.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        // This is where you would send the audio for transcription
        // For now, we will just use a placeholder text. A full implementation would require a Speech-to-Text service.
        setInput('... (pregunta de audio, transcríbela)'); 
        setIsRecording(false);
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
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
        <ScrollArea className="flex-grow my-4 pr-4">
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
                  <p className="text-sm">{message.text}</p>
                </div>
                {message.role === 'user' && (
                   <div className="bg-muted rounded-full p-2">
                    <User className="h-5 w-5" />
                  </div>
                )}
              </div>
            ))}
            {isLoading && (
              <div className="flex items-start gap-3">
                 <div className="bg-primary rounded-full p-2">
                    <Bot className="text-primary-foreground h-5 w-5" />
                  </div>
                <div className="bg-muted rounded-lg px-4 py-2 flex items-center">
                    <Loader2 className="h-5 w-5 animate-spin" />
                </div>
              </div>
            )}
          </div>
        </ScrollArea>
        <SheetFooter>
          <div className="flex w-full items-center space-x-2">
            <Input
              type="text"
              placeholder={isRecording ? 'Grabando...' : 'Escribe tu pregunta...'}
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
            <Button type="submit" size="icon" onClick={handleSend} disabled={isLoading}>
              <Send className="h-5 w-5" />
            </Button>
          </div>
        </SheetFooter>
      </SheetContent>
      <audio ref={audioRef} className="hidden" />
    </Sheet>
  );
}