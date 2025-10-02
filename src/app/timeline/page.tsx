'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { HOMINID_STAGES } from '@/lib/hominids';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { motion } from 'framer-motion';

export default function TimelinePage() {
  return (
    <div className="bg-[#2a201c] min-h-screen text-foreground">
      <main className="container mx-auto p-4 sm:p-8">
        <div className="flex items-center mb-8">
          <Button asChild variant="outline" size="icon" className="mr-4 bg-transparent border-primary/50 text-primary-foreground hover:bg-primary/10 hover:text-primary-foreground">
            <Link href="/">
              <ArrowLeft />
              <span className="sr-only">Volver al Menú</span>
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl md:text-4xl font-headline font-bold tracking-tight text-primary">
              Línea de Tiempo
            </h1>
            <p className="text-muted-foreground mt-1 text-sm">
              Un viaje a través de las especies que nos precedieron.
            </p>
          </div>
        </div>
        <div className="relative w-full flex flex-col items-center gap-8">
            <div className="absolute left-1/2 -translate-x-1/2 top-0 h-full w-0.5 bg-border/50" />
            {HOMINID_STAGES.map((stage, index) => (
                <motion.div 
                    key={stage.name}
                    className="w-full max-w-2xl"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.2 }}
                >
                    <Card className="relative bg-card/80 backdrop-blur-sm border-white/20 shadow-lg">
                        <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 h-4 w-4 rounded-full bg-primary ring-4 ring-background" />
                        <CardHeader>
                            <CardTitle className="font-headline text-2xl text-primary">{stage.name}</CardTitle>
                            <CardDescription>{stage.years}</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p>{stage.facialFeatures}</p>
                        </CardContent>
                    </Card>
                </motion.div>
            ))}
        </div>
      </main>
    </div>
  );
}
