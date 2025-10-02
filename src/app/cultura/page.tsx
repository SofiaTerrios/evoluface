'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Layers } from 'lucide-react';
import LayeredGallery from '@/components/LayeredGallery';
import { CULTURAL_LAYERS } from '@/lib/layers';

export default function CulturaPage() {
  return (
    <div className="relative min-h-screen bg-background">
      <header className="sticky top-0 z-20 w-full bg-background/80 backdrop-blur-sm">
        <div className="container mx-auto flex items-center p-4">
          <Button asChild variant="outline" size="icon" className="mr-4">
            <Link href="/">
              <ArrowLeft />
              <span className="sr-only">Volver al Menú</span>
            </Link>
          </Button>
          <h1 className="text-2xl md:text-3xl font-headline font-bold tracking-tight text-primary flex items-center gap-2">
            <Layers />
            Galería por Capas
          </h1>
        </div>
      </header>
      <main>
        <LayeredGallery layers={CULTURAL_LAYERS} />
      </main>
    </div>
  );
}
