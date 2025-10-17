'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Mic } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import 'regenerator-runtime/runtime';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

const VoiceControl = () => {
  const router = useRouter();
  const { toast } = useToast();
  const [isListening, setIsListening] = useState(false);
  const { transcript, listening, browserSupportsSpeechRecognition, resetTranscript } = useSpeechRecognition();
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const commands = [
    { command: ['ir a evoluface', 'abrir evoluface'], path: '/evoluface' },
    { command: ['ir a línea de tiempo', 'abrir línea de tiempo'], path: '/timeline' },
    { command: ['ir a videos', 'abrir videos', 'ir a cultura'], path: '/cultura' },
    { command: ['ir a descubrimientos', 'abrir descubrimientos', 'ir a mesa de descubrimientos'], path: '/hominids' },
    { command: ['ir a arqueología', 'abrir arqueología', 'ir a mesa de arqueología'], path: '/archeology' },
    { command: ['ir al menú', 'volver al menú', 'ir a inicio'], path: '/' },
  ];

  useEffect(() => {
    if (!browserSupportsSpeechRecognition) {
      toast({
        variant: 'destructive',
        title: 'Navegador no compatible',
        description: 'El control por voz no está disponible en este navegador.',
      });
      return;
    }
  }, [browserSupportsSpeechRecognition, toast]);

  useEffect(() => {
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
        }, 1500); 
    }
  }, [listening, transcript]);

  const handleVoiceCommand = (command: string) => {
    const foundCommand = commands.find(c => c.command.some(cmd => command.includes(cmd)));

    if (foundCommand) {
      toast({
        title: 'Comando reconocido',
        description: `Navegando a ${foundCommand.path}`,
      });
      router.push(foundCommand.path);
    } else {
      toast({
        variant: 'destructive',
        title: 'Comando no reconocido',
        description: `No se encontró una acción para: "${command}"`,
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

  if (!browserSupportsSpeechRecognition) {
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
