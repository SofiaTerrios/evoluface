'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Camera, LoaderCircle, AlertTriangle, ArrowLeft, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { useToast } from '@/hooks/use-toast';
import UserProfile from '@/components/UserProfile';
import Link from 'next/link';
import { identifyContentFromImage } from '@/ai/flows/identify-content-from-image';
import { cn } from '@/lib/utils';

export default function CameraPage() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [hasCameraPermission, setHasCameraPermission] = useState<boolean | null>(null);
  const [isFlashlightOn, setIsFlashlightOn] = useState(false);
  const [isFlashlightSupported, setIsFlashlightSupported] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    let stream: MediaStream;

    const getCameraPermission = async () => {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        setHasCameraPermission(false);
        toast({
            variant: 'destructive',
            title: 'Cámara no soportada',
            description: 'Tu navegador no soporta el acceso a la cámara.',
        });
        return;
      }

      try {
        stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: 'environment' },
        });
        setHasCameraPermission(true);
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }

        // Check for flashlight support
        const track = stream.getVideoTracks()[0];
        const capabilities = track.getCapabilities();
        if (capabilities.torch) {
          setIsFlashlightSupported(true);
        }

      } catch (error) {
        console.error('Error al acceder a la cámara:', error);
        setHasCameraPermission(false);
        toast({
          variant: 'destructive',
          title: 'Acceso a la cámara denegado',
          description: 'Por favor, habilita los permisos de la cámara en tu navegador para usar esta función.',
        });
      }
    };

    getCameraPermission();

    return () => {
      // Cleanup: stop video stream when component unmounts
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    }
  }, [toast]);

  const handleCapture = async () => {
    if (!videoRef.current || !canvasRef.current) return;

    setIsLoading(true);
    const video = videoRef.current;
    const canvas = canvasRef.current;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const context = canvas.getContext('2d');
    context?.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);

    const dataUri = canvas.toDataURL('image/jpeg');

    try {
      const result = await identifyContentFromImage({ imageDataUri: dataUri });
      if (result && result.path) {
        toast({
          title: 'Contenido identificado',
          description: `Redirigiendo a ${result.path}`,
        });
        router.push(result.path);
      } else {
        toast({
          variant: 'destructive',
          title: 'No se pudo identificar',
          description: 'No se encontró contenido relevante para esta imagen.',
        });
      }
    } catch (error) {
      console.error('Error identificando imagen:', error);
      toast({
        variant: 'destructive',
        title: 'Error de IA',
        description: 'No se pudo procesar la imagen.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggleFlashlight = async () => {
    if (!videoRef.current || !videoRef.current.srcObject || !isFlashlightSupported) return;

    const stream = videoRef.current.srcObject as MediaStream;
    const track = stream.getVideoTracks()[0];
    const newFlashlightState = !isFlashlightOn;

    try {
      await track.applyConstraints({
        advanced: [{ torch: newFlashlightState }],
      });
      setIsFlashlightOn(newFlashlightState);
    } catch (error) {
      console.error('Error al controlar la linterna:', error);
      toast({
        variant: 'destructive',
        title: 'Error de la linterna',
        description: 'No se pudo cambiar el estado de la linterna.',
      });
    }
  };


  return (
    <main className="container mx-auto p-4 sm:p-8 h-screen w-screen flex flex-col items-center relative">
      <header className="absolute top-0 left-0 w-full p-4 sm:p-8 z-20 flex justify-between items-center">
        <div className="flex items-center">
          <Button asChild variant="outline" size="icon" className="mr-4">
            <Link href="/">
              <ArrowLeft />
              <span className="sr-only">Volver al Menú</span>
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl md:text-4xl font-headline font-bold tracking-tight text-primary">
              Cámara IA
            </h1>
            <p className="text-muted-foreground mt-1 text-sm">
              Escanea una imagen para descubrir su historia.
            </p>
          </div>
        </div>
        <UserProfile />
      </header>

      <div className="w-full max-w-md flex-grow flex flex-col items-center justify-center">
        <div className="relative w-full aspect-[3/4] bg-muted rounded-xl overflow-hidden shadow-2xl border">
          <video
            ref={videoRef}
            className="w-full h-full object-cover"
            autoPlay
            playsInline
            muted
          />
          <canvas ref={canvasRef} className="hidden" />

          {hasCameraPermission === false && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-background/80 p-4 text-center">
              <AlertTriangle className="h-12 w-12 text-destructive mb-4" />
              <AlertTitle className="text-xl font-bold">Cámara no disponible</AlertTitle>
              <AlertDescription>
                Revisa los permisos de tu navegador o asegúrate de estar en un entorno seguro (HTTPS).
              </AlertDescription>
            </div>
          )}
           {hasCameraPermission === null && (
            <div className="absolute inset-0 flex items-center justify-center bg-background/80">
                <LoaderCircle className="h-10 w-10 animate-spin text-primary" />
            </div>
           )}

            <div className="absolute inset-0 bg-black/30 flex items-center justify-center pointer-events-none">
                <div className="w-3/4 h-1/2 border-4 border-dashed border-white/50 rounded-lg"></div>
            </div>

            {isFlashlightSupported && (
               <div className="absolute top-4 right-4">
                <Button 
                    size="icon" 
                    onClick={handleToggleFlashlight}
                    className={cn("rounded-full transition-colors", isFlashlightOn ? "bg-amber-400 text-amber-900 hover:bg-amber-500" : "bg-black/50 text-white hover:bg-black/70")}
                >
                    <Zap className="h-5 w-5" />
                    <span className="sr-only">Toggle Flashlight</span>
                </Button>
            </div>
            )}
        </div>

        <motion.div
          className="mt-8"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.5, type: 'spring' }}
        >
          <Button
            size="lg"
            className="h-16 w-16 rounded-full shadow-lg"
            onClick={handleCapture}
            disabled={isLoading || hasCameraPermission !== true}
          >
            {isLoading ? (
              <LoaderCircle className="h-8 w-8 animate-spin" />
            ) : (
              <Camera className="h-8 w-8" />
            )}
            <span className="sr-only">Capturar Imagen</span>
          </Button>
        </motion.div>
      </div>
    </main>
  );
}
