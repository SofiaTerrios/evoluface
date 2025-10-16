'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { ToyBrick, GalleryHorizontal, Newspaper, Camera } from 'lucide-react';
import type { HominidStage } from '@/lib/hominids';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import HominidViewer from './HominidViewer';
import Link from 'next/link';
import { Button } from './ui/button';
import { Skeleton } from './ui/skeleton';
import {
  fetchLatestNews,
  type FetchLatestNewsInput,
  type FetchLatestNewsOutput,
} from '@/ai/flows/fetch-latest-news';
import CameraView from './CameraView';

export type HominidStageWithData = HominidStage & {
  imageUrl: string;
  imageHint: string;
  modelEmbedUrl?: string;
  modelDescription?: string;
};

interface EvoluFaceProps {
  hominidStages: HominidStageWithData[];
}

export default function EvoluFace({ hominidStages }: EvoluFaceProps) {
  const [sliderValue, setSliderValue] = useState(0);
  const currentStageIndex = Math.round(sliderValue);
  const currentStage = hominidStages[currentStageIndex];

  const floorIndex = Math.floor(sliderValue);
  const ceilIndex = Math.ceil(sliderValue);
  const progress = sliderValue - floorIndex;

  const [news, setNews] = useState<FetchLatestNewsOutput | null>(null);
  const [isLoadingNews, setIsLoadingNews] = useState(true);

  useEffect(() => {
    async function getNews() {
      if (!currentStage.name) return;
      setIsLoadingNews(true);
      try {
        const newsData = await fetchLatestNews({ hominidName: currentStage.name });
        setNews(newsData);
      } catch (error) {
        console.error('Error fetching news:', error);
        setNews({ news: 'No se pudo generar la noticia en este momento. Inténtalo de nuevo.' });
      } finally {
        setIsLoadingNews(false);
      }
    }
    getNews();
  }, [currentStage.name]);

  return (
    <>
      <div className="flex justify-end w-full max-w-md md:max-w-lg mb-4">
        <Button asChild variant="outline">
          <Link href="/hominids">
            <GalleryHorizontal className="mr-2 h-4 w-4" />
            Ver Galería 3D
          </Link>
        </Button>
      </div>
      <Card className="w-full max-w-md md:max-w-lg overflow-hidden shadow-2xl relative bg-card text-card-foreground">
        <CardHeader className="text-center pb-2">
          <CardTitle className="font-headline text-2xl font-bold text-primary">
            {currentStage.name}
          </CardTitle>
          <p className="text-sm text-muted-foreground">{currentStage.years}</p>
        </CardHeader>
        <CardContent className="px-4 md:px-6">
          <div className="relative mx-auto h-64 w-64 md:h-80 md:w-80 aspect-square mb-4 rounded-full overflow-hidden shadow-inner border-4 border-card-foreground/10">
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
          <blockquote className="text-center italic text-sm text-card-foreground p-4">
            &ldquo;{currentStage.facialFeatures}&rdquo;
          </blockquote>
        </CardContent>
        <CardFooter className="flex flex-col gap-2 pt-4">
          <Slider
            value={[sliderValue]}
            onValueChange={value => setSliderValue(value[0])}
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

      {currentStage.modelEmbedUrl && currentStage.modelDescription && (
        <Card className="w-full max-w-md md:max-w-lg overflow-hidden shadow-2xl relative mt-8 bg-card text-card-foreground">
          <CardHeader className="text-center">
            <CardTitle className="font-headline text-xl font-bold text-primary flex items-center justify-center gap-2">
              <ToyBrick className="h-6 w-6" />
              Modelo 3D del Cráneo
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="aspect-square w-full h-auto rounded-lg overflow-hidden border">
              <HominidViewer
                iframeUrl={currentStage.modelEmbedUrl}
                description={currentStage.modelDescription}
              />
            </div>
             <p className="text-center p-4 text-sm text-card-foreground">
                {currentStage.craniumFeatures}
            </p>
          </CardContent>
        </Card>
      )}

      <Card className="w-full max-w-md md:max-w-lg overflow-hidden shadow-2xl relative mt-8 bg-card text-card-foreground">
        <CardHeader>
          <CardTitle className="font-headline text-xl font-bold text-primary flex items-center gap-2">
            <Newspaper className="h-6 w-6" />
            Últimas Noticias
          </CardTitle>
        </CardHeader>
        <CardContent>
          {isLoadingNews ? (
            <div className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </div>
          ) : (
            <p className="text-sm text-card-foreground">
              {news?.news}
            </p>
          )}
        </CardContent>
      </Card>
      
      <Card className="w-full max-w-md md:max-w-lg overflow-hidden shadow-2xl relative mt-8 bg-card text-card-foreground">
        <CardHeader>
            <CardTitle className="font-headline text-xl font-bold text-primary flex items-center gap-2">
                <Camera className="h-6 w-6" />
                Tu Cámara
            </CardTitle>
        </CardHeader>
        <CardContent>
            <CameraView />
        </CardContent>
      </Card>
    </>
  );
}
