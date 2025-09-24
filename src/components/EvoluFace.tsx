"use client";

import { useState } from 'react';
import Image from 'next/image';
import { Quote } from 'lucide-react';

import type { HominidStage } from '@/lib/hominids';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { cn } from '@/lib/utils';

type HominidStageWithLabel = HominidStage & {
  label: string;
  imageUrl: string;
  imageHint: string;
};

interface EvoluFaceProps {
  hominidStages: HominidStageWithLabel[];
}

export default function EvoluFace({ hominidStages }: EvoluFaceProps) {
  const [sliderValue, setSliderValue] = useState(0);

  const currentStageIndex = Math.round(sliderValue);
  const currentStage = hominidStages[currentStageIndex];

  const floorIndex = Math.floor(sliderValue);
  const ceilIndex = Math.ceil(sliderValue);
  const progress = sliderValue - floorIndex;

  return (
    <Card className="w-full max-w-md md:max-w-lg overflow-hidden shadow-2xl">
      <CardHeader className="text-center">
        <CardTitle className="font-headline text-2xl font-bold text-primary">
          {currentStage.name}
        </CardTitle>
        <p className="text-sm text-muted-foreground">{currentStage.years}</p>
      </CardHeader>
      <CardContent className="px-4 md:px-6">
        <div className="relative mx-auto h-64 w-64 md:h-80 md:w-80 aspect-square mb-6 rounded-full overflow-hidden shadow-inner border-4 border-card-foreground/10">
          {hominidStages.map((stage, index) => {
            let opacity = 0;
            if (index === floorIndex) {
              opacity = 1 - progress;
            } else if (index === ceilIndex) {
              opacity = progress;
            }

            return (
              <Image
                key={stage.name}
                src={stage.imageUrl}
                alt={`Face of ${stage.name}`}
                width={800}
                height={800}
                className="absolute inset-0 h-full w-full object-cover transition-opacity duration-100"
                style={{ opacity }}
                priority={index < 2}
                data-ai-hint={stage.imageHint}
              />
            );
          })}
        </div>
        
        <div className="relative text-center min-h-[6rem] flex items-center justify-center p-4 bg-background/50 rounded-lg">
           <Quote className="absolute top-2 left-2 h-6 w-6 text-primary/30" aria-hidden="true" />
           <blockquote className="text-base italic text-foreground">
             {currentStage.label}
           </blockquote>
           <Quote className="absolute bottom-2 right-2 h-6 w-6 text-primary/30 transform scale-x-[-1]" aria-hidden="true"/>
        </div>

      </CardContent>
      <CardFooter className="flex flex-col gap-2 pt-6">
         <Slider
            value={[sliderValue]}
            onValueChange={(value) => setSliderValue(value[0])}
            min={0}
            max={hominidStages.length - 1}
            step={0.01}
            className="w-full"
            aria-label="Evolution timeline slider"
          />
          <div className="w-full flex justify-between text-xs text-muted-foreground px-1">
            <span>Modern</span>
            <span>Ancient</span>
          </div>
      </CardFooter>
    </Card>
  );
}
