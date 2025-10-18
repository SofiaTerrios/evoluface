'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { HominidStage } from '@/lib/hominids';
import {
  Footprints,
  Hand,
  PersonStanding,
  Users,
  BrainCircuit,
  Dna,
  Star,
} from 'lucide-react';
import TextToSpeechButton from './TextToSpeechButton';
import SpiralPath from './SpiralPath';

// Add icons to stages
const icons = [
  Footprints,
  Hand,
  PersonStanding,
  Users,
  BrainCircuit,
  Dna,
];

interface SpiralTimelineProps {
  stages: HominidStage[];
}

export default function SpiralTimeline({ stages }: SpiralTimelineProps) {
  const timelineData = stages.map((stage, i) => ({
    ...stage,
    icon: icons[i % icons.length],
  }));

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedEvent, setSelectedEvent] = useState<number | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      if (selectedEvent === null) {
        setCurrentIndex(prev => (prev + 1) % timelineData.length);
      }
    }, 4000);
    return () => clearInterval(interval);
  }, [selectedEvent, timelineData.length]);

  const handleEventClick = (index: number) => {
    if (selectedEvent === index) {
      setSelectedEvent(null);
    } else {
      setSelectedEvent(index);
      setCurrentIndex(index);
    }
  };

  const currentItem = timelineData[currentIndex];

  return (
    <div className="flex-1 w-full flex items-center justify-center p-4 md:p-8 flex-col md:flex-row gap-8">
      {/* Contenedor de la espiral */}
      <div className="relative w-full max-w-[500px] h-auto aspect-square">
        <SpiralPath />

        {/* Eventos en la espiral */}
        {timelineData.map((item, index) => {
          const angle = (index / timelineData.length) * 4 * Math.PI; // More turns
          const radius = 50 + index * 28; // Increase radius more slowly
          const x = 50 + (radius / 500) * 100 * Math.cos(angle);
          const y = 50 + (radius / 500) * 100 * Math.sin(angle);

          const isActive = index === currentIndex;
          const isSelected = selectedEvent === index;
          const Icon = item.icon;

          return (
            <motion.div
              key={index}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer z-10"
              style={{ left: `${x}%`, top: `${y}%` }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{
                opacity: 1,
                scale: isSelected ? 1.25 : isActive ? 1.1 : 1,
              }}
              transition={{
                delay: index * 0.1,
                scale: { duration: 0.3 },
              }}
              onClick={() => handleEventClick(index)}
              whileHover={{ scale: isSelected ? 1.3 : 1.2, zIndex: 50 }}
            >
              <motion.div
                className="relative w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center text-xl text-primary-foreground shadow-lg bg-primary border-2 border-background"
                animate={
                  isActive && !isSelected
                    ? {
                        boxShadow: [
                          '0 0 15px hsl(var(--ring))',
                          '0 0 25px hsl(var(--accent))',
                          '0 0 15px hsl(var(--ring))',
                        ],
                      }
                    : {
                        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                      }
                }
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Icon className="w-6 h-6 md:w-7 md:h-7" />

                {isSelected && (
                  <motion.div
                    className="absolute inset-[-4px] border-2 border-accent rounded-full"
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [1, 0.7, 1],
                    }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  />
                )}
              </motion.div>
            </motion.div>
          );
        })}

        {/* Centro de la espiral */}
        <motion.div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        >
          <motion.div
            className="w-16 h-16 rounded-full bg-accent flex items-center justify-center text-3xl shadow-2xl border-4 border-background"
            whileHover={{ scale: 1.1 }}
            animate={{
              boxShadow: [
                '0 0 20px hsl(var(--accent) / 0.6)',
                '0 0 35px hsl(var(--accent) / 0.8)',
                '0 0 20px hsl(var(--accent) / 0.6)',
              ],
            }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <Star className="text-accent-foreground" />
          </motion.div>
        </motion.div>
      </div>

      {/* Panel de información lateral */}
      <motion.div
        className="w-full md:w-96 bg-card/80 backdrop-blur-sm text-card-foreground p-6 rounded-2xl border border-border shadow-xl h-fit"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5 }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
          >
            <div className="flex items-center gap-4 mb-4">
              <motion.div
                className="w-16 h-16 rounded-lg bg-primary flex items-center justify-center text-3xl shadow-lg border-2 border-background text-primary-foreground"
              >
                <currentItem.icon className="w-8 h-8" />
              </motion.div>
              <div>
                <h3 className="text-xl font-bold font-headline text-primary mb-1">
                  {currentItem.name}
                </h3>
                <p className="text-sm text-muted-foreground font-medium">
                  {currentItem.years}
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <p className="text-sm leading-relaxed text-card-foreground/90">
                {currentItem.facialFeatures}
                <TextToSpeechButton textToRead={currentItem.facialFeatures} />
              </p>
              
               <p className="text-xs leading-relaxed text-muted-foreground/80 pt-2 border-t border-border">
                {currentItem.craniumFeatures}
              </p>

              <div className="flex items-center gap-2 pt-2">
                <span className="text-xs text-muted-foreground">Progreso:</span>
                <div className="flex-1 bg-border rounded-full h-1.5">
                  <motion.div
                    className="bg-primary h-full rounded-full"
                    initial={{ width: 0 }}
                    animate={{
                      width: `${
                        ((currentIndex + 1) / timelineData.length) * 100
                      }%`,
                    }}
                    transition={{ duration: 0.5, ease: 'easeInOut' }}
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
