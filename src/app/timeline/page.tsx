'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { HOMINID_STAGES } from '@/lib/hominids';
import SpiralTimeline from '@/components/SpiralTimeline';

export default function TimelinePage() {
  
  return (
    <div className="bg-background min-h-screen text-foreground overflow-hidden">
        <header className="container mx-auto px-4 pt-8 sm:px-8 w-full z-10">
            <div className="flex items-center mb-2">
            <Button asChild variant="outline" size="icon" className="mr-4">
                <Link href="/">
                <ArrowLeft />
                <span className="sr-only">Volver al Menú</span>
                </Link>
            </Button>
            <div className="text-left flex-grow">
                <h1 className="text-3xl md:text-4xl font-headline font-bold tracking-tight text-primary">
                Línea de Tiempo Evolutiva
                </h1>
                <p className="text-muted-foreground mt-1 text-sm">
                Un viaje en espiral a través de nuestra historia.
                </p>
            </div>
            </div>
      </header>
      <main className="w-full h-full flex items-center justify-center">
        <SpiralTimeline stages={HOMINID_STAGES} />
      </main>
    </div>
  );
}
