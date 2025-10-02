'use client';

import { HominidTimeline } from '@/components/HominidTimeline';
import { HOMINID_STAGES_TIMELINE } from '@/lib/hominids';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

export default function TimelinePage() {
  return (
    <div className="bg-[#f4f1e9]">
      <main className="container mx-auto p-4 sm:p-8">
        <div className="flex items-center mb-8">
          <Button asChild variant="outline" size="icon" className="mr-4 bg-transparent border-primary/50">
            <Link href="/">
              <ArrowLeft />
              <span className="sr-only">Volver al Menú</span>
            </Link>
          </Button>
          <h1 className="text-3xl md:text-4xl font-headline font-bold tracking-tight text-primary">
            Línea de Tiempo Evolutiva
          </h1>
        </div>
        <div className="mt-12">
          <HominidTimeline stages={HOMINID_STAGES_TIMELINE} />
        </div>
      </main>
    </div>
  );
}