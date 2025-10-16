
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
    id: 'acheulean-biface',
    title: 'Bifaz Achelense',
    period: 'Paleolítico Inferior',
    description:
      'Fabricada por Homo erectus, esta herramienta de piedra simétrica es un salto cognitivo. Demuestra planificación, habilidad y una posible transmisión de conocimientos, siendo la "navaja suiza" de la prehistoria.',
    imageUrl: 'https://picsum.photos/seed/biface/600/400',
    imageHint: 'hand axe',
  },
  {
    id: 'levallois-core',
    title: 'Núcleo Levallois',
    period: 'Paleolítico Medio',
    description:
      'Una técnica de talla lítica avanzada asociada a los Neandertales. Implicaba preparar un núcleo para obtener lascas estandarizadas, lo que revela una alta capacidad de planificación y abstracción mental.',
    imageUrl: 'https://picsum.photos/seed/levallois/600/400',
    imageHint: 'stone core',
  },
  {
    id: 'venus-hohle-fels',
    title: 'Venus de Hohle Fels',
    period: 'Paleolítico Superior',
    description:
      'Con 40,000 años, es una de las primeras representaciones humanas. Creada por Homo sapiens, esta estatuilla de marfil es una evidencia temprana de arte figurativo y pensamiento simbólico complejo.',
    imageUrl: 'https://picsum.photos/seed/venusfigurine/600/400',
    imageHint: 'ancient figurine',
  },
  {
    id: 'bone-flute',
    title: 'Flauta de Hueso',
    period: 'Paleolítico Superior',
    description:
      'Este instrumento de 35,000 años, tallado en hueso de buitre por Homo sapiens, es una de las pruebas más antiguas de música. Sugiere la existencia de rituales y una vida social y cultural rica.',
    imageUrl: 'https://picsum.photos/seed/boneflute/600/400',
    imageHint: 'bone flute',
  },
  {
    id: 'blombos-ochre',
    title: 'Ocre Grabado de Blombos',
    period: 'Edad de Piedra Media (África)',
    description:
      'Piezas de ocre de 75,000 años con grabados geométricos. Son una de las primeras evidencias de pensamiento simbólico, mostrando que nuestros ancestros Homo sapiens tenían capacidades artísticas abstractas.',
    imageUrl: 'https://picsum.photos/seed/ochre/600/400',
    imageHint: 'engraved stone',
  },
];
