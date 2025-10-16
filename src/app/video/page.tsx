'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Layers, Search } from 'lucide-react';
import LayeredGallery from '@/components/LayeredGallery';
import { CULTURAL_LAYERS } from '@/lib/layers';
import { Input } from '@/components/ui/input';
import { useState } from 'react';

export default function VideoPage() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredLayers = CULTURAL_LAYERS.filter((layer) =>
    layer.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="relative min-h-screen bg-background">
      <header className="sticky top-0 z-20 w-full bg-background/80 backdrop-blur-sm">
        <div className="container mx-auto flex flex-col p-4">
          <div className="flex items-center w-full">
            <Button asChild variant="outline" size="icon" className="mr-4">
              <Link href="/">
                <ArrowLeft />
                <span className="sr-only">Volver al Menú</span>
              </Link>
            </Button>
            <h1 className="text-2xl md:text-3xl font-headline font-bold tracking-tight text-primary flex items-center gap-2">
              <Layers />
              Videos por Capas
            </h1>
          </div>
          <div className="relative w-full mt-4">
             <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
             <Input
                type="text"
                placeholder="Buscar video por título..."
                className="w-full pl-10 h-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </header>
      <main>
        <LayeredGallery layers={filteredLayers} aspectRatio={16/9} />
      </main>
    </div>
  );
}
