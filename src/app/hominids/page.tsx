'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { DISCOVERIES } from '@/lib/discoveries';
import InteractiveDiscoveryCard from '@/components/InteractiveDiscoveryCard';
import { ArrowLeft, Lightbulb } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function HominidsPage() {
  const [revealed, setRevealed] = useState<Record<string, boolean>>({});

  const handleReveal = (id: string) => {
    setRevealed((prev) => ({ ...prev, [id]: true }));
  };

  return (
    <main className="container mx-auto p-4 sm:p-8 h-screen w-screen flex flex-col items-center justify-center relative overflow-hidden">
        <header className="absolute top-0 left-0 w-full p-4 sm:p-8 z-20">
             <div className="flex items-center">
                <Button asChild variant="outline" size="icon" className="mr-4">
                    <Link href="/">
                    <ArrowLeft />
                    <span className="sr-only">Volver al Menú</span>
                    </Link>
                </Button>
                <div>
                    <h1 className="text-3xl md:text-4xl font-headline font-bold tracking-tight text-primary flex items-center gap-3">
                    Mesa de Descubrimientos
                    </h1>
                    <p className="text-muted-foreground mt-1 text-sm">
                    Arrastra una tarjeta al círculo para revelar el hallazgo.
                    </p>
                </div>
            </div>
        </header>


      <motion.div
        id="drop-zone"
        className="relative z-0 flex h-64 w-64 items-center justify-center rounded-full border-2 border-dashed border-primary/50 bg-primary/10"
      >
        <Lightbulb className="h-12 w-12 text-primary/30" />
        <span className="absolute bottom-4 text-xs text-primary/50">Zona de Revelación</span>
      </motion.div>

      {DISCOVERIES.map((discovery, index) => (
        <InteractiveDiscoveryCard
          key={discovery.id}
          discovery={discovery}
          isRevealed={!!revealed[discovery.id]}
          onReveal={() => handleReveal(discovery.id)}
          initialPosition={{ x: (index % 3 - 1) * 300, y: (Math.floor(index / 3) - 1) * 200 }}
        />
      ))}
    </main>
  );
}
