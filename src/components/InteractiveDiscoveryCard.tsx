'use client';

import { motion, useAnimation, PanInfo } from 'framer-motion';
import { useEffect } from 'react';
import type { Discovery } from '@/lib/discoveries';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import Image from 'next/image';
import { Badge } from './ui/badge';

interface InteractiveDiscoveryCardProps {
  discovery: Discovery;
  isRevealed: boolean;
  onRevealToggle: (id: string, state: boolean) => void;
  initialPosition: { x: number; y: number };
}

const CARD_SIZE_SMALL = { width: 200, height: 260 };
const CARD_SIZE_LARGE = { width: 320, height: 400 };

export default function InteractiveDiscoveryCard({
  discovery,
  isRevealed,
  onRevealToggle,
  initialPosition,
}: InteractiveDiscoveryCardProps) {
  const controls = useAnimation();

  useEffect(() => {
    if (isRevealed) {
      controls.start({
        rotateY: 180,
        x: 0,
        y: 0,
        scale: 1,
        width: CARD_SIZE_LARGE.width,
        height: CARD_SIZE_LARGE.height,
        zIndex: 10,
        transition: { duration: 0.6, type: 'spring' },
      });
    } else {
       controls.start({
        rotateY: 0,
        x: initialPosition.x,
        y: initialPosition.y,
        scale: 0.8,
        width: CARD_SIZE_SMALL.width,
        height: CARD_SIZE_SMALL.height,
        zIndex: 1,
        transition: { duration: 0.6, type: 'spring' },
      });
    }
  }, [isRevealed, controls, initialPosition.x, initialPosition.y]);
  
  const isPointInDropZone = (info: PanInfo) => {
    const dropZone = document.getElementById('drop-zone');
    if (!dropZone) return false;

    const dropZoneRect = dropZone.getBoundingClientRect();
    const { x, y } = info.point;

    return (
      x > dropZoneRect.left &&
      x < dropZoneRect.right &&
      y > dropZoneRect.top &&
      y < dropZoneRect.bottom
    );
  }

  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (isPointInDropZone(info)) {
        onRevealToggle(discovery.id, true);
    } else {
        onRevealToggle(discovery.id, false);
    }
  };

  return (
    <motion.div
      drag
      dragConstraints={{ top: -400, left: -600, right: 600, bottom: 400 }}
      dragElastic={0.2}
      onDragEnd={handleDragEnd}
      className="absolute cursor-grab active:cursor-grabbing"
      style={{
        perspective: 1000,
        width: CARD_SIZE_SMALL.width,
        height: CARD_SIZE_SMALL.height,
      }}
      initial={{ ...initialPosition, rotateY: 0, scale: 0.8, opacity: 1 }}
      animate={controls}
    >
      {/* Container for rotating */}
      <motion.div
        className="relative w-full h-full"
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Front Face (Revealed Content) */}
        <div
          className="absolute w-full h-full"
          style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
        >
          <Card className="w-full h-full flex flex-col overflow-hidden shadow-2xl bg-card text-card-foreground">
            <CardHeader className="p-4">
              <div className="relative w-full h-32 rounded-md overflow-hidden border mb-2">
                <Image
                  src={discovery.imageUrl}
                  alt={discovery.title}
                  fill
                  className="object-cover"
                  data-ai-hint={discovery.imageHint}
                />
              </div>
              <CardTitle className="font-headline text-lg font-bold text-primary">
                {discovery.title}
              </CardTitle>
              <CardDescription className="text-xs">{discovery.date}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow text-sm text-card-foreground/90 overflow-y-auto p-4 pt-0">
              <p>{discovery.summary}</p>
            </CardContent>
            <CardContent className="flex flex-wrap gap-2 p-4 pt-2">
              <Badge variant="secondary">{discovery.hominidTag}</Badge>
              <Badge variant="outline">{discovery.typeTag}</Badge>
            </CardContent>
          </Card>
        </div>

        {/* Back Face (Unrevealed) */}
        <div
          className="absolute w-full h-full"
          style={{ backfaceVisibility: 'hidden' }}
        >
          <Card className="w-full h-full shadow-2xl bg-stone-700 border-stone-500 flex items-center justify-center relative overflow-hidden">
            <Image 
              src="/stone-texture.png"
              alt="Stone texture"
              fill
              className="object-cover opacity-30"
            />
            <span className="absolute text-stone-200 font-headline text-2xl tracking-widest" style={{ textShadow: '2px 2px 8px rgba(0,0,0,0.7)' }}>
                HALLAZGO
            </span>
          </Card>
        </div>
      </motion.div>
    </motion.div>
  );
}
