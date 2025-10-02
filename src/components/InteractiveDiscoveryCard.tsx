'use client';

import { motion, useAnimation } from 'framer-motion';
import { useRef, useEffect } from 'react';
import type { Discovery } from '@/lib/discoveries';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import Image from 'next/image';
import { Badge } from './ui/badge';

interface InteractiveDiscoveryCardProps {
  discovery: Discovery;
  isRevealed: boolean;
  onReveal: () => void;
  initialPosition: { x: number; y: number };
}

const CARD_SIZE_SMALL = { width: 200, height: 260 };
const CARD_SIZE_LARGE = { width: 320, height: 400 };

export default function InteractiveDiscoveryCard({
  discovery,
  isRevealed,
  onReveal,
  initialPosition,
}: InteractiveDiscoveryCardProps) {
  const controls = useAnimation();
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isRevealed) {
      controls.start({
        rotateY: 180,
        x: 0,
        y: 0,
        scale: 1, // Make sure it's at full scale when revealed
        transition: { duration: 0.6, type: 'spring' },
      });
    }
  }, [isRevealed, controls]);

  const handleDragEnd = (_event: any, info: any) => {
    if (isRevealed) return; // Don't do anything if already revealed

    const dropZone = document.getElementById('drop-zone');
    if (!dropZone || !cardRef.current) return;

    const dropZoneRect = dropZone.getBoundingClientRect();
    
    // We need to account for the card's current transform (scale and position)
    const cardTransform = new DOMMatrix(getComputedStyle(cardRef.current).transform);
    const cardCenterX = info.point.x;
    const cardCenterY = info.point.y;

    if (
      cardCenterX > dropZoneRect.left &&
      cardCenterX < dropZoneRect.right &&
      cardCenterY > dropZoneRect.top &&
      cardCenterY < dropZoneRect.bottom
    ) {
      onReveal();
    }
  };

  return (
    <motion.div
      ref={cardRef}
      drag={!isRevealed} // Only allow dragging if not revealed
      dragConstraints={{ top: -300, left: -500, right: 500, bottom: 300 }}
      dragElastic={0.2}
      onDragEnd={handleDragEnd}
      className="absolute cursor-grab active:cursor-grabbing"
      style={{
        perspective: 1000,
        width: CARD_SIZE_LARGE.width, // Base width for layout
        height: CARD_SIZE_LARGE.height, // Base height for layout
      }}
      initial={{ ...initialPosition, rotateY: 0, scale: 0.6 }}
      animate={controls}
    >
      {/* Container for scaling and rotating */}
      <motion.div
        className="relative w-full h-full"
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Front Face (Revealed Content) */}
        <motion.div
          className="absolute w-full h-full"
          style={{ backfaceVisibility: 'hidden', rotateY: 180 }}
        >
          <Card className="w-full h-full flex flex-col overflow-hidden shadow-2xl bg-card text-card-foreground">
            <CardHeader>
              <div className="relative w-full h-32 rounded-lg overflow-hidden border mb-2">
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
            <CardContent className="flex-grow text-sm text-card-foreground/90 overflow-y-auto">
              <p>{discovery.summary}</p>
            </CardContent>
            <CardContent className="flex flex-wrap gap-2 pt-2">
              <Badge variant="secondary">{discovery.hominidTag}</Badge>
              <Badge variant="outline">{discovery.typeTag}</Badge>
            </CardContent>
          </Card>
        </motion.div>

        {/* Back Face (Unrevealed) */}
        <motion.div
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
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
