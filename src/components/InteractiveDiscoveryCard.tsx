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
        transition: { duration: 0.6 },
      });
    } else {
       controls.start({
        rotateY: 0,
        transition: { duration: 0.6 },
      });
    }
  }, [isRevealed, controls]);
  
  const handleDragEnd = (_event: any, info: any) => {
    const dropZone = document.getElementById('drop-zone');
    if (!dropZone || !cardRef.current) return;

    const dropZoneRect = dropZone.getBoundingClientRect();
    const cardRect = cardRef.current.getBoundingClientRect();
    
    // Using center point of the card for collision detection
    const cardCenterX = cardRect.left + cardRect.width / 2;
    const cardCenterY = cardRect.top + cardRect.height / 2;

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
      drag
      dragConstraints={{ top: -300, left: -500, right: 500, bottom: 300 }}
      dragElastic={0.2}
      onDragEnd={handleDragEnd}
      className="absolute cursor-grab active:cursor-grabbing"
      style={{
        width: 320,
        height: 400,
        perspective: 1000,
      }}
      initial={{ ...initialPosition, rotateY: 0, opacity: 0}}
      animate={{ ...controls, opacity: 1, transition: {delay: 0.5}}}
    >
      {/* Front Face (Initially Hidden) */}
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
          <CardContent className="flex-grow text-sm text-card-foreground/90">
            <p>{discovery.summary}</p>
          </CardContent>
           <CardContent className="flex flex-wrap gap-2 pt-2">
                <Badge variant="secondary">{discovery.hominidTag}</Badge>
                <Badge variant="outline">{discovery.typeTag}</Badge>
            </CardContent>
        </Card>
      </motion.div>

      {/* Back Face (Initially Visible) */}
      <motion.div
        className="absolute w-full h-full"
        style={{ backfaceVisibility: 'hidden' }}
      >
        <Card className="w-full h-full shadow-2xl bg-stone-700 border-stone-500 flex items-center justify-center">
            <div className="w-full h-full bg-[url('/stone-texture.png')] bg-repeat opacity-20" />
            <span className="absolute text-stone-300 font-headline text-2xl">DESCUBRIR</span>
        </Card>
      </motion.div>
    </motion.div>
  );
}
