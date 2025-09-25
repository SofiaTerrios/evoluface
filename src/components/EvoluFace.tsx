"use client";

import { useState, useEffect, useCallback, useMemo } from 'react';
import Image from 'next/image';
import { Quote, MessageCircle } from 'lucide-react';
import { generateInformativeLabels } from '@/ai/flows/generate-informative-labels';
import type { HominidStage } from '@/lib/hominids';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { Chat } from '@/components/Chat';

type HominidStageWithData = HominidStage & {
  imageUrl: string;
  imageHint: string;
};

interface EvoluFaceProps {
  hominidStages: HominidStageWithData[];
}

export default function EvoluFace({ hominidStages }: EvoluFaceProps) {
  const [sliderValue, setSliderValue] = useState(0);
  const [label, setLabel] = useState<string>('');
  const [loadingLabel, setLoadingLabel] = useState(false);
  const [isChatOpen, setChatOpen] = useState(false);

  const currentStageIndex = Math.round(sliderValue);
  const currentStage = hominidStages[currentStageIndex];

  const floorIndex = Math.floor(sliderValue);
  const ceilIndex = Math.ceil(sliderValue);
  const progress = sliderValue - floorIndex;

  const getLabelForStage = useCallback(async (stage: HominidStage) => {
    setLoadingLabel(true);
    setLabel('Generando...');
    try {
      const result = await generateInformativeLabels({
        hominidStage: stage.name,
        facialFeatures: stage.facialFeatures,
      });
      setLabel(result.label);
    } catch (error) {
      console.error(`Failed to generate label for ${stage.name}:`, error);
      setLabel('No se pudo generar la etiqueta.');
    } finally {
      setLoadingLabel(false);
    }
  }, []);
  
  useEffect(() => {
    getLabelForStage(currentStage);
  }, [currentStage, getLabelForStage]);

  const displayedLabel = useMemo(() => {
    return label || (loadingLabel ? 'Generando...' : '');
  }, [label, loadingLabel]);

  return (
    <>
      <Card className="w-full max-w-md md:max-w-lg overflow-hidden shadow-2xl relative">
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-4 right-4 z-10"
          onClick={() => setChatOpen(true)}
        >
          <MessageCircle className="h-6 w-6 text-primary" />
          <span className="sr-only">Abrir chat</span>
        </Button>
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
                  alt={`Rostro de ${stage.name}`}
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
             <blockquote key={currentStage.name} className="text-base italic text-foreground">
               {displayedLabel}
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
              aria-label="Línea de tiempo de la evolución"
            />
            <div className="w-full flex justify-between text-xs text-muted-foreground px-1">
              <span>Antiguo</span>
              <span>Moderno</span>
            </div>
        </CardFooter>
      </Card>
      <Chat isOpen={isChatOpen} onOpenChange={setChatOpen} />
    </>
  );
}