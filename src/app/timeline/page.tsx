'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Footprints } from 'lucide-react';
import { HOMINID_STAGES } from '@/lib/hominids';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import TextToSpeechButton from '@/components/TextToSpeechButton';

// Filter out one to make the alternating pattern look good.
const timelineHominids = HOMINID_STAGES.filter(
  (h) => h.name !== 'Homo Heidelbergensis'
);

export default function TimelinePage() {
  return (
    <div className="bg-background min-h-screen text-foreground overflow-x-hidden">
      <header className="container mx-auto px-4 pt-8 sm:px-8 w-full z-10">
        <div className="flex items-center mb-8 max-w-md mx-auto">
          <Button asChild variant="outline" size="icon" className="mr-4">
            <Link href="/">
              <ArrowLeft />
              <span className="sr-only">Volver al Menú</span>
            </Link>
          </Button>
          <div className="text-left flex-grow">
            <h1 className="text-3xl md:text-4xl font-headline font-bold tracking-tight text-primary">
              Línea de Tiempo
            </h1>
            <p className="text-muted-foreground mt-1 text-sm">
              Un viaje a través de nuestra historia.
            </p>
          </div>
        </div>
      </header>
      <main className="container mx-auto p-4 sm:p-8">
        <div className="relative max-w-md mx-auto">
          {/* Vertical line */}
          <div className="absolute left-4 h-full w-0.5 bg-border -translate-x-1/2" aria-hidden="true"></div>

          {timelineHominids.map((hominid, index) => {
            return (
              <div key={hominid.name} className="relative pl-12 mb-10">
                 {/* Marker on the timeline */}
                <div className="absolute top-1 -left-1.5">
                   <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center ring-4 ring-background">
                     <Footprints className="h-5 w-5 text-primary-foreground" />
                   </div>
                </div>
                
                {/* Card */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 0.6 }}
                >
                  <Card className="shadow-lg rounded-xl bg-card border-border">
                      <CardHeader>
                        <CardTitle className="font-headline text-xl text-primary">{hominid.name}</CardTitle>
                        <CardDescription>{hominid.years}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-card-foreground">
                          {hominid.facialFeatures}
                          <TextToSpeechButton textToRead={hominid.facialFeatures} />
                        </p>
                      </CardContent>
                    </Card>
                </motion.div>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}
