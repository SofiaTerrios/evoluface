'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Footprints } from 'lucide-react';
import { HOMINID_STAGES } from '@/lib/hominids';
import { motion } from 'framer-motion';

// Omitting Heidelbergensis to match the 5-item alternating design in the image
const timelineHominids = HOMINID_STAGES.filter(h => h.name !== 'Homo Heidelbergensis');

export default function TimelinePage() {
  return (
    <div className="bg-background min-h-screen text-foreground">
      <header className="container mx-auto px-4 pt-8 sm:px-8">
         <div className="flex items-center mb-8">
          <Button asChild variant="outline" size="icon" className="mr-4">
            <Link href="/">
              <ArrowLeft />
              <span className="sr-only">Volver al Menú</span>
            </Link>
          </Button>
          <div className="text-center md:text-left flex-grow">
            <h1 className="text-3xl md:text-4xl font-headline font-bold tracking-tight text-primary">
              Cronología de la Evolución Humana
            </h1>
            <p className="text-muted-foreground mt-1">
              Recorre millones de años de nuestra historia ancestral.
            </p>
          </div>
        </div>
      </header>
      <main className="container mx-auto px-4 pb-16">
        <div className="relative wrap overflow-hidden p-10 h-full">
          <div className="absolute left-1/2 -translate-x-1/2 h-full border-2 border-border rounded-full" />

          {timelineHominids.map((stage, index) => (
             <motion.div
              key={stage.name}
              className={`mb-8 flex justify-between items-center w-full ${
                index % 2 === 0 ? 'flex-row-reverse left-timeline' : 'right-timeline'
              }`}
               initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
               animate={{ opacity: 1, x: 0 }}
               transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <div className="order-1 w-5/12"></div>

              <div className="z-20 flex items-center order-1 bg-muted shadow-xl w-10 h-10 rounded-full">
                <h1 className="mx-auto font-semibold text-lg text-white">
                  <Footprints className="text-primary h-6 w-6"/>
                </h1>
              </div>
              
              <div className={`order-1 rounded-lg shadow-xl w-5/12 px-6 py-4 bg-card ${index % 2 === 0 ? 'text-right' : 'text-left'}`}>
                  <h3 className="font-headline font-bold text-primary text-xl">{stage.name}</h3>
                  <p className="text-sm leading-snug tracking-wide text-muted-foreground mb-2">{stage.years}</p>
                  <p className="text-sm font-body text-card-foreground">
                    {stage.facialFeatures}
                  </p>
              </div>
            </motion.div>
          ))}
        </div>
      </main>
    </div>
  );
}