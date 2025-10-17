'use client';

import { useState, useRef } from 'react';
import { Button } from './ui/button';
import { Volume2, LoaderCircle } from 'lucide-react';
import {
  textToSpeech,
  type TextToSpeechInput,
} from '@/ai/flows/text-to-speech';

interface TextToSpeechButtonProps {
  textToRead: string;
}

export default function TextToSpeechButton({
  textToRead,
}: TextToSpeechButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handlePlayAudio = async () => {
    if (isPlaying) {
      audioRef.current?.pause();
      audioRef.current!.currentTime = 0;
      setIsPlaying(false);
      return;
    }

    if (audioRef.current && !audioRef.current.src.startsWith('data:')) {
        // Audio has been generated, just play it
        audioRef.current.play();
        setIsPlaying(true);
        return;
    }
    
    setIsLoading(true);
    try {
      const input: TextToSpeechInput = { text: textToRead };
      const result = await textToSpeech(input);
      const audio = new Audio(result.audio);
      audioRef.current = audio;
      
      audio.play();
      setIsPlaying(true);

      audio.onended = () => {
        setIsPlaying(false);
      };
    } catch (error) {
      console.error('Error generating speech:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={handlePlayAudio}
      disabled={isLoading}
      className="ml-2 h-6 w-6"
    >
      {isLoading ? (
        <LoaderCircle className="animate-spin" />
      ) : (
        <Volume2 className={isPlaying ? 'text-primary' : ''} />
      )}
      <span className="sr-only">Leer texto en voz alta</span>
    </Button>
  );
}
