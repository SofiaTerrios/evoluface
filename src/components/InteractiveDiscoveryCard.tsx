
'use client';

import { motion, useAnimation, PanInfo } from 'framer-motion';
import { useEffect, useContext } from 'react';
import type { Discovery } from '@/lib/discoveries';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import Image from 'next/image';
import TextToSpeechButton from './TextToSpeechButton';
import { KnowledgeContext } from '@/context/KnowledgeContext';

interface InteractiveDiscoveryCardProps {
  discovery: Discovery;
  isRevealed: boolean;
  onRevealToggle: (id: string, state: boolean) => void;
  initialPosition: { x: number; y: number };
}

const CARD_SIZE_HIDDEN = { width: 150, height: 195 };
const CARD_SIZE_REVEALED = { width: 180, height: 234 };

export default function InteractiveDiscoveryCard({
  discovery,
  isRevealed,
  onRevealToggle,
  initialPosition,
}: InteractiveDiscoveryCardProps) {
  const controls = useAnimation();
  const { increaseKnowledge } = useContext(KnowledgeContext);

  useEffect(() => {
    if (isRevealed) {
      controls.start({
        rotateY: 180,
        x: 0,
        y: 0,
        width: CARD_SIZE_REVEALED.width,
        height: CARD_SIZE_REVEALED.height,
        zIndex: 10,
        transition: { duration: 0.6, type: 'spring' },
      });
    } else {
       controls.start({
        rotateY: 0,
        x: initialPosition.x,
        y: initialPosition.y,
        width: CARD_SIZE_HIDDEN.width,
        height: CARD_SIZE_HIDDEN.height,
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
    const shouldReveal = isPointInDropZone(info);
    if (shouldReveal && !isRevealed) {
      increaseKnowledge(5);
    }
    onRevealToggle(discovery.id, shouldReveal);
  };

  return (
    <motion.div
      drag
      dragConstraints={{ top: -300, left: -400, right: 400, bottom: 300 }}
      dragElastic={0.2}
      onDragEnd={handleDragEnd}
      className="absolute cursor-grab active:cursor-grabbing"
      style={{
        perspective: 1000,
        width: CARD_SIZE_HIDDEN.width,
        height: CARD_SIZE_HIDDEN.height,
      }}
      initial={{ ...initialPosition, rotateY: 0, scale: 1, opacity: 1 }}
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
            <CardHeader className="p-2">
              <CardTitle className="font-headline text-sm font-bold text-primary leading-tight">
                {discovery.title}
              </CardTitle>
              <CardDescription className="text-xs">{discovery.date}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow text-xs text-card-foreground/90 overflow-y-auto p-2 pt-0">
               <div className="relative w-full h-20 rounded-md overflow-hidden border mb-1">
                <Image
                  src={discovery.imageUrl}
                  alt={discovery.title}
                  fill
                  className="object-cover"
                  data-ai-hint={discovery.imageHint}
                />
              </div>
              <p>
                {discovery.summary}
                <TextToSpeechButton textToRead={discovery.summary} />
              </p>
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
            <span className="absolute text-stone-200 font-headline text-xl tracking-widest" style={{ textShadow: '2px 2px 8px rgba(0,0,0,0.7)' }}>
                HALLAZGO
            </span>
          </Card>
        </div>
      </motion.div>
    </motion.div>
  );
}
