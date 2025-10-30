'use client';

import { useState, useEffect, useRef } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Mic } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import 'regenerator-runtime/runtime';
import SpeechRecognition, {
  useSpeechRecognition,
} from 'react-speech-recognition';
import { interpretNavigationCommand } from '@/ai/flows/interpret-navigation-command';

const VoiceControl = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { toast } = useToast();
  const [isMounted, setIsMounted] = useState(false);
  const {
    transcript,
    listening,
    browserSupportsSpeechRecognition,
    resetTranscript,
  } = useSpeechRecognition();
  
  const lastProcessedTranscript = useRef('');

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    // Stop listening when navigating to a new page
    if (listening) {
      SpeechRecognition.stopListening();
    }
     // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

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


  const handleVoiceCommand = async (command: string) => {
    if (!command || command === lastProcessedTranscript.current) return;

    lastProcessedTranscript.current = command;

    try {
      const result = await interpretNavigationCommand({ command });

      if (!result) {
        throw new Error('No result from AI');
      }

      if (result.action === 'navigate') {
        if (result.path && result.path !== router.pathname) {
          router.push(result.path);
        }
      } else if (result.action === 'search') {
        router.push(`/search?q=${encodeURIComponent(result.path)}`);
      } else {
        toast({
          variant: 'destructive',
          title: 'Comando no reconocido',
          description: `No se encontró una acción para: "${command}"`,
        });
      }
    } catch (error) {
      console.error('Error interpreting command:', error);
      toast({
        variant: 'destructive',
        title: 'Error de IA',
        description: 'No se pudo interpretar el comando de voz.',
      });
    } finally {
        resetTranscript();
    }
  };

  const handleToggleListening = () => {
    if (listening) {
      SpeechRecognition.stopListening();
      if(transcript) {
        handleVoiceCommand(transcript.toLowerCase());
      }
    } else {
      lastProcessedTranscript.current = '';
      resetTranscript();
      SpeechRecognition.startListening({ continuous: true, language: 'es-ES' });
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
          listening ? 'bg-red-500' : 'bg-primary'
        }`}
        aria-label="Activar control por voz"
      >
        {listening && (
          <motion.div
            className="absolute inset-0 rounded-full border-4 border-red-300"
            animate={{
              scale: [1, 1.6, 1],
              opacity: [0.7, 1, 0.7],
            }}
            transition={{
              duration: 1.2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        )}
        <Mic size={28} />
      </button>
    </motion.div>
  );
};

export default VoiceControl;
