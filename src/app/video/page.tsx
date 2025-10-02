'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Film, Smartphone } from 'lucide-react';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { AspectRatio } from '@/components/ui/aspect-ratio';

const longVideos = [
  { id: 1, title: 'El Origen del Hombre' },
  { id: 2, title: 'La Odisea de la Especie' },
  { id: 3, title: 'Neandertales: Nuestro Primos Lejanos' },
];

const shortVideos = [
  { id: 1, title: '¿Sabías que compartimos ADN con los neandertales?' },
  { id: 2, title: 'La primera herramienta de piedra' },
  { id: 3, title: 'Evolución del cerebro en 30s' },
  { id: 4, title: '¿Por qué caminamos erguidos?' },
  { id: 5, title: 'El arte rupestre más antiguo' },
  { id: 6, title: 'Lucy: El ícono del Australopithecus' },
];

export default function VideoPage() {
  return (
    <main className="container mx-auto p-4 sm:p-8">
      <div className="flex items-center mb-8">
        <Button asChild variant="outline" size="icon" className="mr-4">
          <Link href="/">
            <ArrowLeft />
            <span className="sr-only">Volver al Menú</span>
          </Link>
        </Button>
        <h1 className="text-4xl md:text-5xl font-headline font-bold tracking-tight text-primary">
          Videoteca Evolutiva
        </h1>
      </div>

      {/* Sección de Videos Largos */}
      <section className="mb-16">
        <h2 className="text-3xl font-headline font-bold text-foreground mb-6 flex items-center gap-3">
          <Film className="h-8 w-8 text-primary" />
          Videos Largos
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {longVideos.map(video => (
            <Card key={video.id} className="overflow-hidden shadow-lg bg-card hover:shadow-xl transition-shadow">
              <CardContent className="p-0">
                <AspectRatio ratio={16 / 9}>
                  <div className="w-full h-full bg-muted flex items-center justify-center">
                     <Film className="h-12 w-12 text-muted-foreground" />
                  </div>
                </AspectRatio>
              </CardContent>
              <CardFooter className="p-4">
                <p className="font-semibold text-card-foreground">{video.title}</p>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>

      {/* Sección de Videos Cortos */}
      <section>
        <h2 className="text-3xl font-headline font-bold text-foreground mb-6 flex items-center gap-3">
          <Smartphone className="h-8 w-8 text-primary" />
          Videos Cortos
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {shortVideos.map(video => (
            <Card key={video.id} className="overflow-hidden shadow-lg bg-card hover:shadow-xl transition-shadow">
               <CardContent className="p-0">
                <AspectRatio ratio={9 / 16}>
                   <div className="w-full h-full bg-muted flex items-center justify-center">
                     <Smartphone className="h-12 w-12 text-muted-foreground" />
                  </div>
                </AspectRatio>
               </CardContent>
                <CardFooter className="p-3">
                    <p className="font-semibold text-card-foreground text-sm truncate">{video.title}</p>
                </CardFooter>
            </Card>
          ))}
        </div>
      </section>
    </main>
  );
}
