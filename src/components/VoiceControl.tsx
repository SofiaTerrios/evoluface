'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Mic } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import 'regenerator-runtime/runtime';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { interpretNavigationCommand } from '@/ai/flows/interpret-navigation-command';

const VoiceControl = () => {
  const router = useRouter();
  const { toast } = useToast();
  const [isListening, setIsListening] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const { transcript, listening, browserSupportsSpeechRecognition, resetTranscript } = useSpeechRecognition();
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

   useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    if (!browserSupportsSpeechRecognition) {
      toast({
        variant: 'destructive',
        title: 'Navegador no compatible',
        description: 'El control por voz no está disponible en este navegador.',
      });
      return;
    }
  }, [isMounted, browserSupportsSpeechRecognition, toast]);

  useEffect(() => {
    if (!isMounted) return;

    if (listening !== isListening) {
      setIsListening(listening);
    }
    
    if (transcript) {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
        
        timeoutRef.current = setTimeout(() => {
            handleVoiceCommand(transcript.toLowerCase());
            resetTranscript();
            SpeechRecognition.stopListening();
        }, 1000); 
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [listening, transcript, isMounted]);

  const handleVoiceCommand = async (command: string) => {
    if (!command) return;

    try {
      const result = await interpretNavigationCommand({ command });
      const path = result.path;

      if (path && path !== router.pathname) {
        router.push(path);
      } else {
         toast({
            variant: 'destructive',
            title: 'Comando no reconocido',
            description: `No se encontró una acción para: "${command}"`,
        });
      }
    } catch (error) {
        console.error("Error interpreting command:", error);
        toast({
            variant: 'destructive',
            title: 'Error de IA',
            description: 'No se pudo interpretar el comando de voz.',
        });
    }
  };
  
  const handleToggleListening = () => {
    if (listening) {
      SpeechRecognition.stopListening();
    } else {
      resetTranscript();
      SpeechRecognition.startListening({ continuous: false, language: 'es-ES' });
    }
  };

  if (!isMounted || !browserSupportsSpeechRecognition) {
    return null;
  }

  return (
    <motion.div
      className="fixed bottom-8 right-8 z-50"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ delay: 1, duration: 0.5 }}
    >
      <button
        onClick={handleToggleListening}
        className={`relative flex h-16 w-16 items-center justify-center rounded-full text-white shadow-lg transition-colors duration-300 ${
          isListening ? 'bg-red-500' : 'bg-primary'
        }`}
        aria-label="Activar control por voz"
      >
        {isListening && (
          <motion.div
            className="absolute inset-0 rounded-full border-4 border-red-300"
            animate={{
              scale: [1, 1.4, 1],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
            }}
          />
        )}
        <Mic size={28} />
      </button>
    </motion.div>
  );
};

export default VoiceControl;
