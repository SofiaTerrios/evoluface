
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
      'Una herramienta de piedra simétrica y versátil, fabricada por Homo erectus. Se considera la "navaja suiza" de la prehistoria por su uso en múltiples tareas como cortar, raspar y perforar.',
    imageUrl: 'https://picsum.photos/seed/biface/600/400',
    imageHint: 'hand axe',
  },
  {
    id: 'levallois-core',
    title: 'Núcleo Levallois',
    period: 'Paleolítico Medio',
    description:
      'Técnica de talla lítica desarrollada por los Neandertales. Implicaba preparar un núcleo de piedra para extraer lascas con una forma y tamaño predeterminados, demostrando una alta capacidad de planificación.',
    imageUrl: 'https://picsum.photos/seed/levallois/600/400',
    imageHint: 'stone core',
  },
  {
    id: 'venus-hohle-fels',
    title: 'Venus de Hohle Fels',
    period: 'Paleolítico Superior',
    description:
      'Una de las representaciones humanas más antiguas conocidas. Esta estatuilla femenina de marfil, de unos 40,000 años de antigüedad, resalta atributos sexuales y es un ejemplo temprano de arte figurativo.',
    imageUrl: 'https://picsum.photos/seed/venusfigurine/600/400',
    imageHint: 'ancient figurine',
  },
  {
    id: 'bone-flute',
    title: 'Flauta de Hueso',
    period: 'Paleolítico Superior',
    description:
      'Instrumento musical de unos 35,000 años, tallado en el hueso de un buitre. Es una de las pruebas más antiguas de expresión musical, sugiriendo la existencia de reuniones sociales complejas.',
    imageUrl: 'https://picsum.photos/seed/boneflute/600/400',
    imageHint: 'bone flute',
  },
  {
    id: 'blombos-ochre',
    title: 'Ocre Grabado de Blombos',
    period: 'Edad de Piedra Media',
    description:
      'Piezas de ocre de 75,000 años con grabados geométricos abstractos, encontradas en Sudáfrica. Se consideran una de las primeras evidencias de pensamiento simbólico y arte abstracto humano.',
    imageUrl: 'https://picsum.photos/seed/ochre/600/400',
    imageHint: 'engraved stone',
  },
];
