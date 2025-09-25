import EvoluFace, { HominidStageWithData } from '@/components/EvoluFace';
import { HOMINID_STAGES } from '@/lib/hominids';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Models3D } from '@/lib/3d-models';

export default async function Home() {
  const hominidStagesWithData: HominidStageWithData[] = HOMINID_STAGES.map(
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

  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-center bg-background p-4 sm:p-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl md:text-5xl font-headline font-bold tracking-tight text-primary">
          EvoluFace
        </h1>
      </div>
      <EvoluFace hominidStages={hominidStagesWithData} />
    </main>
  );
}
