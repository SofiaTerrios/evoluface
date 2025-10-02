'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Newspaper } from 'lucide-react';
import Image from 'next/image';
import { DISCOVERIES, Discovery } from '@/lib/discoveries';
import { Badge } from '@/components/ui/badge';

function DiscoveryCard({ discovery }: { discovery: Discovery }) {
  return (
    <Card className="overflow-hidden shadow-lg bg-card text-card-foreground flex flex-col h-full">
      <CardHeader>
        <div className="aspect-video relative w-full rounded-lg overflow-hidden border mb-4">
          <Image
            src={discovery.imageUrl}
            alt={discovery.title}
            fill
            className="object-cover"
            data-ai-hint={discovery.imageHint}
          />
        </div>
        <CardTitle className="font-headline text-xl font-bold text-primary">
          {discovery.title}
        </CardTitle>
        <CardDescription>{discovery.date}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-sm text-card-foreground/90">
          {discovery.summary}
        </p>
      </CardContent>
      <CardFooter className="flex flex-wrap gap-2">
        <Badge variant="secondary">{discovery.hominidTag}</Badge>
        <Badge variant="outline">{discovery.typeTag}</Badge>
      </CardFooter>
    </Card>
  );
}

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
              <Newspaper className="h-10 w-10" />
              Muro de Descubrimientos
            </h1>
            <p className="text-muted-foreground mt-2">
              Explora las últimas noticias y hallazgos sobre la evolución humana.
            </p>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
        {DISCOVERIES.map(item => (
          <DiscoveryCard key={item.id} discovery={item} />
        ))}
      </div>
    </main>
  );
}
