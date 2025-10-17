'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Smartphone, Video } from 'lucide-react';
import type { CulturalLayer } from '@/lib/layers';
import TextToSpeechButton from './TextToSpeechButton';

interface LayeredGalleryProps {
  layers: CulturalLayer[];
  aspectRatio?: number;
}

function LayerSection({ layer, index, aspectRatio = 9/16 }: { layer: CulturalLayer; index: number, aspectRatio?: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const layerColors = ['bg-[#6b4a39]', 'bg-[#8c6d5b]', 'bg-[#a1887f]', 'bg-[#bcaaa4]'];

  return (
    <section
      ref={ref}
      className={`min-h-screen w-full flex flex-col items-center justify-center p-4 sm:p-8 snap-start transition-colors duration-500 ${
        layerColors[index % layerColors.length]
      }`}
    >
      <motion.div
        style={{
          opacity: isInView ? 1 : 0,
          y: isInView ? 0 : 50,
          transition: 'all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.3s',
        }}
        className="w-full max-w-sm md:max-w-md"
      >
        <Card className="overflow-hidden shadow-2xl bg-card/80 backdrop-blur-sm border-white/20">
          <CardHeader>
            <CardTitle className="font-headline text-2xl text-primary">{layer.title}</CardTitle>
            <CardDescription className="text-card-foreground/80">{layer.period}</CardDescription>
          </CardHeader>
          <CardContent>
            <AspectRatio ratio={aspectRatio} className="bg-muted rounded-lg overflow-hidden">
              <div className="w-full h-full flex items-center justify-center">
                 {aspectRatio === 16/9 ? <Video className="h-24 w-24 text-muted-foreground/50" /> : <Smartphone className="h-24 w-24 text-muted-foreground/50" />}
              </div>
            </AspectRatio>
            <p className="mt-4 text-sm text-card-foreground">
              {layer.description}
              <TextToSpeechButton textToRead={layer.description} />
            </p>
          </CardContent>
        </Card>
      </motion.div>
    </section>
  );
}

export default function LayeredGallery({ layers, aspectRatio }: LayeredGalleryProps) {
  return (
    <div className="relative w-full snap-y snap-mandatory h-screen overflow-y-auto">
      {layers.map((layer, index) => (
        <LayerSection key={layer.id} layer={layer} index={index} aspectRatio={aspectRatio} />
      ))}
    </div>
  );
}
