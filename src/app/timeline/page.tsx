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
        <div className="flex items-center mb-8 max-w-5xl mx-auto">
          <Button asChild variant="outline" size="icon" className="mr-4">
            <Link href="/">
              <ArrowLeft />
              <span className="sr-only">Volver al Menú</span>
            </Link>
          </Button>
          <div className="text-left flex-grow">
            <h1 className="text-3xl md:text-4xl font-headline font-bold tracking-tight text-primary">
              Línea de Tiempo Evolutiva
            </h1>
            <p className="text-muted-foreground mt-1">
              Un viaje a través de millones de años de nuestra historia.
            </p>
          </div>
        </div>
      </header>
      <main className="container mx-auto p-4 sm:p-8">
        <div className="relative max-w-5xl mx-auto">
          {/* Vertical line */}
          <div className="absolute left-1/2 -translate-x-1/2 h-full w-0.5 bg-border" aria-hidden="true"></div>

          {timelineHominids.map((hominid, index) => {
            const isLeft = index % 2 === 0;
            
            return (
              <div key={hominid.name} className="relative mb-12">
                <div className={`flex items-center ${isLeft ? 'flex-row-reverse' : 'flex-row'} w-full`}>
                   {/* Card */}
                  <motion.div
                    className="w-1/2"
                    initial={{ opacity: 0, x: isLeft ? 50 : -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.6 }}
                  >
                     <div className={isLeft ? 'pr-8' : 'pl-8'}>
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
                     </div>
                  </motion.div>

                  {/* Spacer takes up the other half */}
                  <div className="w-1/2"></div>
                </div>

                {/* Marker on the timeline */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                   <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center ring-4 ring-background">
                     <Footprints className="h-4 w-4 text-primary-foreground" />
                   </div>
                </div>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}
