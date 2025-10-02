'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Construction } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export default function VideoPage() {
  return (
    <main className="container mx-auto p-4 sm:p-8 flex flex-col items-center justify-center min-h-screen">
       <div className="flex items-center mb-8 self-start">
        <Button asChild variant="outline" size="icon" className="mr-4">
          <Link href="/">
            <ArrowLeft />
            <span className="sr-only">Volver al Menú</span>
          </Link>
        </Button>
      </div>
      <div className="w-full max-w-md text-center">
        <Alert>
            <Construction className="h-4 w-4"/>
          <AlertTitle className="font-headline text-2xl">Página en Construcción</AlertTitle>
          <AlertDescription>
            Esta sección de videos está siendo rediseñada. ¡Vuelve pronto!
          </AlertDescription>
        </Alert>
      </div>
    </main>
  );
}
