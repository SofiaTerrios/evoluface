import { generateInformativeLabels } from '@/ai/flows/generate-informative-labels';
import EvoluFace from '@/components/EvoluFace';
import { HOMINID_STAGES } from '@/lib/hominids';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default async function Home() {
  const hominidStagesWithLabels = await Promise.all(
    HOMINID_STAGES.map(async (stage) => {
      let label = 'Could not generate label.';
      try {
        const result = await generateInformativeLabels({
          hominidStage: stage.name,
          facialFeatures: stage.facialFeatures,
        });
        label = result.label;
      } catch (error) {
        console.error(`Failed to generate label for ${stage.name}:`, error);
      }
      
      const placeholder = PlaceHolderImages.find(p => p.id === stage.imagePlaceholderId);
      
      return {
        ...stage,
        label,
        imageUrl: placeholder?.imageUrl || '',
        imageHint: placeholder?.imageHint || '',
      };
    })
  );

  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-center bg-background p-4 sm:p-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl md:text-5xl font-headline font-bold tracking-tight text-primary">
          EvoluFace
        </h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Slide to travel through time and see the evolution of the human face.
        </p>
      </div>
      <EvoluFace hominidStages={hominidStagesWithLabels} />
    </main>
  );
}
