'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ARCHEOLOGY_ITEMS } from '@/lib/archeology-items';
import ArcheologyCard from '@/components/ArcheologyCard';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import UserProfile from '@/components/UserProfile';

export default function ArcheologyPage() {
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
                    Mesa de Arqueología
                    </h1>
                    <p className="text-muted-foreground mt-1 text-sm">
                    Arrastra un artefacto para revelar su historia.
                    </p>
                </div>
            </div>
            <UserProfile />
        </header>

        <div className="relative w-full h-full flex items-center justify-center">
            <motion.div
                id="drop-zone"
                className="relative z-0 flex h-[300px] w-[300px] items-center justify-center rounded-lg border-2 border-dashed border-primary/50 bg-primary/10 overflow-hidden"
            >
                <Image 
                    src="/desk.jpeg"
                    alt="Mesa de arqueólogo"
                    fill
                    className="object-cover opacity-30"
                />
                <span className="absolute bottom-4 text-sm text-primary/50 bg-background/50 px-2 py-1 rounded">Zona de información</span>
            </motion.div>

            {isMounted && ARCHEOLOGY_ITEMS.map((item, index) => (
                <ArcheologyCard
                    key={item.id}
                    item={item}
                    isRevealed={!!revealed[item.id]}
                    onRevealToggle={handleRevealToggle}
                    initialPosition={{ 
                        x: Math.cos((index / ARCHEOLOGY_ITEMS.length) * 2 * Math.PI) * 250, 
                        y: Math.sin((index / ARCHEOLOGY_ITEMS.length) * 2 * Math.PI) * 200
                    }}
                />
            ))}
        </div>
    </main>
  );
}
