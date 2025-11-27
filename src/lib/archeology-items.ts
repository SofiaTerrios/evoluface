export type ArcheologyItem = {
  id: string;
  title: string;
  period: string;
  description: string;
  imageUrl: string;
  imageHint: string;
};

export const ARCHEOLOGY_ITEMS: ArcheologyItem[] = [
  {
    id: "acheulean-biface",
    title: "Bifaz Achelense",
    period: "Paleolítico Inferior",
    description:
      'Fabricada por Homo erectus, esta herramienta de piedra simétrica es un salto cognitivo. Demuestra planificación, habilidad y una posible transmisión de conocimientos, siendo la "navaja suiza" de la prehistoria.',
    imageUrl:
      "https://images.unsplash.com/photo-1625504615927-c14f4f309b63?w=600&h=400&fit=crop",
    imageHint: "hand axe",
  },
  {
    id: "levallois-core",
    title: "Núcleo Levallois",
    period: "Paleolítico Medio",
    description:
      "Una técnica de talla lítica avanzada asociada a los Neandertales. Implicaba preparar un núcleo para obtener lascas estandarizadas, lo que revela una alta capacidad de planificación y abstracción mental.",
    imageUrl:
      "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=600&h=400&fit=crop",
    imageHint: "stone core",
  },
  {
    id: "venus-hohle-fels",
    title: "Venus de Hohle Fels",
    period: "Paleolítico Superior",
    description:
      "Con 40,000 años, es una de las primeras representaciones humanas. Creada por Homo sapiens, esta estatuilla de marfil es una evidencia temprana de arte figurativo y pensamiento simbólico complejo.",
    imageUrl:
      "https://images.unsplash.com/photo-1580274455191-1c62238fa333?w=600&h=400&fit=crop",
    imageHint: "ancient figurine",
  },
  {
    id: "bone-flute",
    title: "Flauta de Hueso",
    period: "Paleolítico Superior",
    description:
      "Este instrumento de 35,000 años, tallado en hueso de buitre por Homo sapiens, es una de las pruebas más antiguas de música. Sugiere la existencia de rituales y una vida social y cultural rica.",
    imageUrl:
      "https://images.unsplash.com/photo-1465101162946-4377e57745c3?w=600&h=400&fit=crop",
    imageHint: "bone flute",
  },
  {
    id: "blombos-ochre",
    title: "Ocre Grabado de Blombos",
    period: "Edad de Piedra Media (África)",
    description:
      "Piezas de ocre de 75,000 años con grabados geométricos. Son una de las primeras evidencias de pensamiento simbólico, mostrando que nuestros ancestros Homo sapiens tenían capacidades artísticas abstractas.",
    imageUrl:
      "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=600&h=400&fit=crop",
    imageHint: "engraved stone",
  },
];
