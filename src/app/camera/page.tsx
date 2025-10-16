'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { ArrowLeft, CameraOff } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"

export default function CameraPage() {
  const [hasCameraPermission, setHasCameraPermission] = useState<boolean | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    const getCameraPermission = async () => {
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
        const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
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

    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [toast]);

  return (
    <div className="relative min-h-screen bg-background flex flex-col items-center justify-center p-4">
       <header className="absolute top-0 left-0 w-full p-4 z-20 flex">
          <Button asChild variant="outline" size="icon">
            <Link href="/">
              <ArrowLeft />
              <span className="sr-only">Volver al Menú</span>
            </Link>
          </Button>
      </header>

      <h1 className="text-4xl md:text-5xl font-headline font-bold tracking-tight text-primary mb-8">
        Vista de Cámara
      </h1>
      
      <Card className="w-full max-w-md md:max-w-lg overflow-hidden shadow-2xl bg-card">
        <CardContent className="p-4">
             <div className="aspect-video w-full h-auto rounded-lg overflow-hidden bg-muted flex items-center justify-center">
                 {hasCameraPermission === null && <p className="text-muted-foreground">Esperando permiso de cámara...</p>}
                 {hasCameraPermission === true && (
                    <video
                        ref={videoRef}
                        className="w-full h-full object-cover"
                        autoPlay
                        muted
                        playsInline
                    />
                 )}
                 {hasCameraPermission === false && (
                    <div className='p-4'>
                        <CameraOff className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                        <Alert variant="destructive">
                            <AlertTitle>Acceso a la Cámara Requerido</AlertTitle>
                            <AlertDescription>
                                Por favor, permite el acceso a la cámara en tu navegador para utilizar esta función. Es posible que necesites recargar la página.
                            </AlertDescription>
                        </Alert>
                    </div>
                 )}
             </div>
        </CardContent>
      </Card>

    </div>
  );
}
