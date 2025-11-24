export type CulturalLayer = {
  id: string;
  title: string;
  period: string;
  description: string;
  videoUrl?: string; // Placeholder for video
  imageUrl?: string; // Placeholder for image
};

export const CULTURAL_LAYERS: CulturalLayer[] = [
  {
    id: "olduvaiense",
    title: "Primeras Herramientas",
    period: "Paleolítico Inferior",
    description:
      "Las primeras herramientas de piedra, como los cantos tallados, marcan el inicio de la tecnología. Eran usadas para cortar carne, romper huesos y trabajar madera.",
    videoUrl: "https://www.youtube.com/embed/51YjamOIM6E",
  },
  {
    id: "achelense",
    title: "El Bifaz: Navaja Suiza Prehistórica",
    period: "Paleolítico Inferior",
    description:
      "El Homo erectus perfecciona la talla de piedra creando bifaces, hachas de mano simétricas y versátiles. Una herramienta multiusos durante casi un millón de años.",
    videoUrl: "https://www.youtube.com/embed/zlU9s8rkZuU",
  },
  {
    id: "musteriense",
    title: "La Técnica Levallois",
    period: "Paleolítico Medio",
    description:
      "Los neandertales desarrollan una técnica sofisticada (Levallois) para preparar núcleos de piedra y obtener lascas con formas y tamaños predeterminados. Un salto en la planificación.",
    videoUrl: "https://www.youtube.com/embed/2n8LtyOUVhM",
  },
  {
    id: "paleolitico-superior",
    title: "Explosión de Creatividad",
    period: "Paleolítico Superior",
    description:
      "El Homo sapiens protagoniza una revolución cultural: arte rupestre, venus, adornos personales, herramientas de hueso y asta. Nace el pensamiento simbólico.",
    videoUrl: "https://www.youtube.com/embed/HIXI5sDG6hc",
  },
];
