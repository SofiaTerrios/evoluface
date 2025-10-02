'use client';

import { Models3D } from '@/lib/3d-models';
import HominidViewer from '@/components/HominidViewer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft, GalleryHorizontal, Skull } from 'lucide-react';

export default function HominidsPage() {
  return (
    <main className="container mx-auto p-4 sm:p-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div className="flex items-center">
            <Button asChild variant="outline" size="icon" className="mr-4">
            <Link href="/">
                <ArrowLeft />
                <span className="sr-only">Volver al Menú</span>
            </Link>
            </Button>
            <div>
                <h1 className="text-4xl md:text-5xl font-headline font-bold tracking-tight text-primary flex items-center gap-3">
                    <Skull className="h-10 w-10" />
                    Galería de Cráneos 3D
                </h1>
                <p className="text-muted-foreground mt-2">
                    Explora los modelos 3D interactivos de los cráneos de nuestros antepasados.
                </p>
            </div>
        </div>
        <Button asChild variant="outline">
          <Link href="/evoluface">
            <GalleryHorizontal className="mr-2 h-4 w-4" />
            Ir a EvoluFace
          </Link>
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
        {Models3D.map(item => (
          <Card key={item.id} className="overflow-hidden shadow-lg bg-card text-card-foreground">
            <CardHeader>
              <CardTitle className="font-headline text-xl font-bold text-primary">
                {item.description}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="aspect-video w-full h-auto rounded-lg overflow-hidden border">
                <HominidViewer
                  iframeUrl={item.iframeUrl}
                  description={item.description}
                />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </main>
  );
}
