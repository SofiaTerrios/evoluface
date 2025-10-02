import { HominidTimeline } from '@/components/HominidTimeline';
import { HOMINID_STAGES } from '@/lib/hominids';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

export default function TimelinePage() {
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
          Línea de Tiempo Evolutiva
        </h1>
      </div>
      <div className="mt-12">
        <HominidTimeline stages={HOMINID_STAGES} />
      </div>
    </main>
  );
}
