'use client';

import { motion, useAnimation, PanInfo } from 'framer-motion';
import { useEffect } from 'react';
import type { ArcheologyItem } from '@/lib/archeology-items';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';
import Image from 'next/image';
import { Button } from './ui/button';
import TextToSpeechButton from './TextToSpeechButton';

interface ArcheologyCardProps {
  item: ArcheologyItem;
  isRevealed: boolean;
  onRevealToggle: (id: string, state: boolean) => void;
  initialPosition: { x: number; y: number };
}

const CARD_SIZE_SMALL = { width: 200, height: 260 };
const CARD_SIZE_LARGE = { width: 400, height: 400 };

export default function ArcheologyCard({
  item,
  isRevealed,
  onRevealToggle,
  initialPosition,
}: ArcheologyCardProps) {
  const controls = useAnimation();

  useEffect(() => {
    if (isRevealed) {
      controls.start({
        x: 0,
        y: 0,
        width: CARD_SIZE_LARGE.width,
        height: CARD_SIZE_LARGE.height,
        zIndex: 10,
        transition: { duration: 0.6, type: 'spring' },
      });
    } else {
       controls.start({
        x: initialPosition.x,
        y: initialPosition.y,
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
        onRevealToggle(item.id, true);
    } else {
        onRevealToggle(item.id, false);
    }
  };

  return (
    <motion.div
      drag
      dragConstraints={{ top: -400, left: -600, right: 600, bottom: 400 }}
      dragElastic={0.2}
      onDragEnd={handleDragEnd}
      className={'absolute cursor-grab active:cursor-grabbing'}
      style={{
        width: CARD_SIZE_SMALL.width,
        height: CARD_SIZE_SMALL.height,
      }}
      initial={{ ...initialPosition, scale: 0.8, opacity: 1 }}
      animate={controls}
    >
      <Card className="w-full h-full shadow-lg border-4 border-primary/80 flex items-center justify-center relative overflow-hidden rounded-lg">
        {/* Background texture always visible */}
        <Image 
          src="/stone-texture.png"
          alt="Artefacto sin revelar"
          fill
          className="object-cover opacity-80"
          data-ai-hint="stone texture"
        />

        {/* Revealed Content with fade animation */}
        <motion.div
          className="absolute inset-0 bg-card w-full h-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: isRevealed ? 1 : 0 }}
          transition={{ duration: 0.3, delay: isRevealed ? 0.3 : 0 }}
        >
          <div className="w-full h-full flex flex-col overflow-hidden text-card-foreground p-4">
             <div className="relative w-full h-40 rounded-md overflow-hidden border mb-2">
              <Image
                src={item.imageUrl}
                alt={item.title}
                fill
                className="object-cover"
                data-ai-hint={item.imageHint}
              />
            </div>
            <CardTitle className="font-headline text-xl font-bold text-primary mt-2">
              {item.title}
            </CardTitle>
            <CardDescription className="text-xs">{item.period}</CardDescription>
            <CardContent className="flex-grow text-sm text-card-foreground/90 overflow-y-auto p-0 pt-2">
              <p>
                {item.description}
                <TextToSpeechButton textToRead={item.description} />
              </p>
            </CardContent>
            <CardFooter className="flex justify-around p-0 pt-2">
                <Button variant="outline" size="sm">Descubrimientos</Button>
                <Button variant="outline" size="sm">Características</Button>
                <Button variant="outline" size="sm">Lugares</Button>
            </CardFooter>
          </div>
        </motion.div>
      </Card>
    </motion.div>
  );
}
