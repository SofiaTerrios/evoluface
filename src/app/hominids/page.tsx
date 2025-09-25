import { Models3D } from '@/lib/3d-models';
import HominidViewer from '@/components/HominidViewer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

export default function HominidsPage() {
  return (
    <main className="container mx-auto p-4 sm:p-8">
      <div className="flex items-center mb-8">
        <Button asChild variant="outline" size="icon" className="mr-4">
          <Link href="/">
            <ArrowLeft />
            <span className="sr-only">Volver</span>
          </Link>
        </Button>
        <h1 className="text-4xl md:text-5xl font-headline font-bold tracking-tight text-primary">
          Galería de Cráneos 3D
        </h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {Models3D.map(item => (
          <Card key={item.id} className="overflow-hidden shadow-lg">
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
                  key={item.id}
                />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </main>
  );
}
