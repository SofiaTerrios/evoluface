'use client';

import { useState, useEffect, useRef } from 'react';
import { useToast } from '@/hooks/use-toast';
import { CameraOff } from 'lucide-react';

export default function CameraView() {
  const [hasCameraPermission, setHasCameraPermission] = useState<boolean | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    const getCameraPermission = async () => {
      // Check for navigator support
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        console.error('Camera API not supported in this browser.');
        setHasCameraPermission(false);
        toast({
            variant: 'destructive',
            title: 'Cámara no compatible',
            description: 'Tu navegador no es compatible con el acceso a la cámara.',
        });
        return;
      }
      
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        setHasCameraPermission(true);

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (error) {
        console.error('Error accessing camera:', error);
        setHasCameraPermission(false);
        toast({
          variant: 'destructive',
          title: 'Acceso a la cámara denegado',
          description:
            'Por favor, habilita los permisos de la cámara en la configuración de tu navegador para usar esta función.',
        });
      }
    };

    getCameraPermission();

    // Cleanup function to stop the stream
    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [toast]);

  return (
    <div className="fixed bottom-8 left-8 z-50 h-40 w-40 rounded-full overflow-hidden border-4 border-primary shadow-2xl bg-muted flex items-center justify-center">
      {hasCameraPermission ? (
         <video
          ref={videoRef}
          className="w-full h-full object-cover scale-x-[-1]" // Flip video horizontally
          autoPlay
          muted
          playsInline // Important for iOS
        />
      ) : (
        <CameraOff className="h-16 w-16 text-muted-foreground" />
      )}
    </div>
  );
}
