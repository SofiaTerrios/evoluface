import EvoluFace from '@/components/EvoluFace';
import { HOMINID_STAGES } from '@/lib/hominids';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default async function Home() {
  const hominidStagesWithData = HOMINID_STAGES.map((stage) => {
    const placeholder = PlaceHolderImages.find(
      (p) => p.id === stage.imagePlaceholderId
    );

    return {
      ...stage,
      imageUrl: placeholder?.imageUrl || '',
      imageHint: placeholder?.imageHint || '',
    };
  });

  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-center bg-background p-4 sm:p-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl md:text-5xl font-headline font-bold tracking-tight text-primary">
          EvoluFace
        </h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Desliza para viajar en el tiempo y ver la evolución del rostro humano.
        </p>
      </div>
      <EvoluFace hominidStages={hominidStagesWithData} />
    </main>
  );
}
