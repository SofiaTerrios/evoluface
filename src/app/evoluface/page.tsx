'use client';
import EvoluFace, { HominidStageWithData } from '@/components/EvoluFace';
import { HOMINID_STAGES } from '@/lib/hominids';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Models3D } from '@/lib/3d-models';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { useEffect, useState } from 'react';
import UserProfile from '@/components/UserProfile';

export default function EvoluFacePage() {
  const [hominidStagesWithData, setHominidStagesWithData] = useState<HominidStageWithData[]>([]);

  useEffect(() => {
    const stagesWithData = HOMINID_STAGES.map(
      (stage) => {
        const placeholder = PlaceHolderImages.find(
          (p) => p.id === stage.imagePlaceholderId
        );
        const model3d = Models3D.find((m) => m.id === stage.model3dId);

        return {
          ...stage,
          imageUrl: placeholder?.imageUrl || '',
          imageHint: placeholder?.imageHint || '',
          modelEmbedUrl: model3d?.iframeUrl,
          modelDescription: model3d?.description,
        };
      }
    );
    setHominidStagesWithData(stagesWithData);
  }, []);

  if (!hominidStagesWithData.length) {
    return null;
  }

  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-center bg-background p-4 sm:p-8">
      <div className="w-full max-w-md md:max-w-lg flex items-center justify-between mb-8">
         <div className="flex items-center">
            <Button asChild variant="outline" size="icon" className="mr-4">
            <Link href="/">
                <ArrowLeft />
                <span className="sr-only">Volver al Menú</span>
            </Link>
            </Button>
            <div className="text-left flex-grow">
                <h1 className="text-4xl md:text-5xl font-headline font-bold tracking-tight text-primary">
                EvoluFace
                </h1>
            </div>
         </div>
         <UserProfile />
      </div>
      <EvoluFace hominidStages={hominidStagesWithData} />
    </main>
  );
}
