'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Footprints } from 'lucide-react';
import { HOMINID_STAGES } from '@/lib/hominids';
import SpiralTimeline from '@/components/SpiralTimeline';

// Omitting Heidelbergensis for better visual balance in the spiral
const timelineHominids = HOMINID_STAGES.filter(h => h.name !== 'Homo Heidelbergensis');

export default function TimelinePage() {
  return (
    <div className="bg-background min-h-screen text-foreground overflow-hidden">
      <header className="container mx-auto px-4 pt-8 sm:px-8 w-full">
         <div className="flex items-center mb-8 max-w-4xl mx-auto">
          <Button asChild variant="outline" size="icon" className="mr-4">
            <Link href="/">
              <ArrowLeft />
              <span className="sr-only">Volver al Menú</span>
            </Link>
          </Button>
          <div className="text-center md:text-left flex-grow">
            <h1 className="text-3xl md:text-4xl font-headline font-bold tracking-tight text-primary">
              Espiral de la Evolución
            </h1>
            <p className="text-muted-foreground mt-1">
              Un viaje a través de millones de años de nuestra historia ancestral.
            </p>
          </div>
        </div>
      </header>
      <main className="w-full h-[80vh] flex items-center justify-center">
        <SpiralTimeline hominids={timelineHominids} />
      </main>
    </div>
  );
}
