'use client';

import { HominidTimeline } from '@/components/HominidTimeline';
import { HOMINID_STAGES_TIMELINE } from '@/lib/hominids';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

export default function TimelinePage() {
  return (
    <div className="bg-[#2a201c] min-h-screen text-foreground">
      <main className="container mx-auto p-4 sm:p-8">
        <div className="flex items-center mb-8">
          <Button asChild variant="outline" size="icon" className="mr-4 bg-transparent border-primary/50 text-primary-foreground hover:bg-primary/10 hover:text-primary-foreground">
            <Link href="/">
              <ArrowLeft />
              <span className="sr-only">Volver al Menú</span>
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl md:text-4xl font-headline font-bold tracking-tight text-primary">
              Línea de Tiempo Interactiva
            </h1>
            <p className="text-muted-foreground mt-1 text-sm">
              Las barras representan el periodo de existencia de cada especie. Las superposiciones indican coexistencia.
            </p>
          </div>
        </div>
        <div className="mt-16 w-full overflow-x-auto pb-8">
          <HominidTimeline stages={HOMINID_STAGES_TIMELINE} />
        </div>
      </main>
    </div>
  );
}
