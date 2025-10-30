'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { DISCOVERIES } from '@/lib/discoveries';
import InteractiveDiscoveryCard from '@/components/InteractiveDiscoveryCard';
import { ArrowLeft, Lightbulb } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import UserProfile from '@/components/UserProfile';

export default function HominidsPage() {
  const [revealed, setRevealed] = useState<Record<string, boolean>>({});
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleRevealToggle = (id: string, state: boolean) => {
    setRevealed((prev) => ({ ...prev, [id]: state }));
  };

  return (
    <main className="container mx-auto p-4 sm:p-8 h-screen w-screen flex flex-col items-center relative">
        <header className="absolute top-0 left-0 w-full p-4 sm:p-8 z-20 flex justify-between items-center">
             <div className="flex items-center w-full max-w-sm md:max-w-md">
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
            <UserProfile />
        </header>

        {/* This div will be the positioning parent for the drop zone and cards */}
        <div className="relative w-full h-full flex items-center justify-center">
            <motion.div
                id="drop-zone"
                className="relative z-0 flex h-64 w-64 items-center justify-center rounded-full border-2 border-dashed border-primary/50 bg-primary/10"
            >
                <Lightbulb className="h-16 w-16 text-primary/30" />
                <span className="absolute bottom-4 text-sm text-primary/50">Zona de Revelación</span>
            </motion.div>

            {isMounted && DISCOVERIES.map((discovery, index) => (
                <InteractiveDiscoveryCard
                    key={discovery.id}
                    discovery={discovery}
                    isRevealed={!!revealed[discovery.id]}
                    onRevealToggle={handleRevealToggle}
                    // Distribute cards around the center
                    initialPosition={{ 
                        x: Math.cos((index / DISCOVERIES.length) * 2 * Math.PI) * 300, 
                        y: Math.sin((index / DISCOVERIES.length) * 2 * Math.PI) * 200 
                    }}
                />
            ))}
        </div>
    </main>
  );
}
