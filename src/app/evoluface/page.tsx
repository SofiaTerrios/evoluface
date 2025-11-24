"use client";
import EvoluFace, { HominidStageWithData } from "@/components/EvoluFace";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Models3D } from "@/lib/3d-models";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import UserProfile from "@/components/UserProfile";
import { useHominids } from "@/hooks/use-hominids";

export default function EvoluFacePage() {
  const { hominids, loading } = useHominids();
  const [hominidStagesWithData, setHominidStagesWithData] = useState<
    HominidStageWithData[]
  >([]);

  useEffect(() => {
    const stagesWithData = hominids.map((stage) => {
      const placeholder = PlaceHolderImages.find(
        (p) => p.id === stage.imagePlaceholderId
      );
      const model3d = Models3D.find((m) => m.id === stage.model3dId);

      return {
        ...stage,
        imageUrl: placeholder?.imageUrl || "",
        imageHint: placeholder?.imageHint || "",
        modelEmbedUrl: model3d?.iframeUrl,
        modelDescription: model3d?.description,
      };
    });
    setHominidStagesWithData(stagesWithData);
  }, [hominids]);

  if (loading || !hominidStagesWithData.length) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
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
