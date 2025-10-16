'use client';

import { useState, useEffect, useRef } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export default function CameraView() {
  const [hasCameraPermission, setHasCameraPermission] = useState<boolean | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    const getCameraPermission = async () => {
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
  }, [toast]);

  return (
    <div className="w-full">
      <div className="aspect-video w-full rounded-md overflow-hidden border bg-muted">
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          autoPlay
          muted
          playsInline // Important for iOS
        />
      </div>

      {hasCameraPermission === false && (
        <Alert variant="destructive" className="mt-4">
          <AlertTitle>Se requiere acceso a la cámara</AlertTitle>
          <AlertDescription>
            Por favor, permite el acceso a la cámara para utilizar esta función.
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
}
