
export type Discovery = {
  id: string;
  title: string;
  date: string;
  summary: string;
  hominidTag: string;
  typeTag: 'Fósil' | 'Herramienta' | 'Genética' | 'Arte';
  imageUrl: string;
  imageHint: string;
};

export const DISCOVERIES: Discovery[] = [
  {
    id: 'footprints-laetoli',
    title: 'Huellas de Laetoli',
    date: 'Publicado: Dic 2021',
    summary:
      'Un análisis de las famosas huellas en Tanzania sugiere que más de un individuo de Australopithecus afarensis caminó por allí, mostrando variabilidad en el tamaño corporal y reforzando la evidencia de bipedismo temprano.',
    hominidTag: 'A. afarensis',
    typeTag: 'Fósil',
    imageUrl: 'https://picsum.photos/seed/footprints/600/400',
    imageHint: 'fossil footprints',
  },
  {
    id: 'oldowan-tools-kenya',
    title: 'Herramientas de Nyayanga',
    date: 'Publicado: Feb 2023',
    summary:
      'El hallazgo de herramientas Oldowanenses de 2.9 millones de años en Kenia retrasa la fecha de esta tecnología y se asocia con el consumo de hipopótamos por parte de Paranthropus, ampliando el rango de homínidos que usaban herramientas.',
    hominidTag: 'Paranthropus',
    typeTag: 'Herramienta',
    imageUrl: 'https://picsum.photos/seed/stonetools/600/400',
    imageHint: 'stone tools',
  },
  {
    id: 'dragon-man-cranium',
    title: 'Cráneo "Hombre Dragón"',
    date: 'Publicado: Jun 2021',
    summary:
      'Un cráneo masivo encontrado en China, Homo longi, podría ser un pariente más cercano a los humanos modernos que los neandertales, proponiendo una nueva rama en el árbol evolutivo humano.',
    hominidTag: 'Homo longi',
    typeTag: 'Fósil',
    imageUrl: 'https://picsum.photos/seed/dragonskull/600/400',
    imageHint: 'ancient skull',
  },
  {
    id: 'neanderthal-art-spain',
    title: 'Arte Neandertal',
    date: 'Publicado: Feb 2018',
    summary:
      'Pinturas en cuevas españolas de más de 64,000 años demuestran que los neandertales crearon arte simbólico, usando pigmentos y plantillas de manos, mucho antes de la llegada de los humanos modernos a Europa.',
    hominidTag: 'H. neanderthalensis',
    typeTag: 'Arte',
    imageUrl: 'https://picsum.photos/seed/cavepainting/600/400',
    imageHint: 'cave painting',
  },
  {
    id: 'denisovan-dna-new-guinea',
    title: 'ADN Denisovano',
    date: 'Publicado: Abr 2019',
    summary:
      'El análisis genético en Nueva Guinea muestra que las poblaciones locales se cruzaron con al menos dos linajes distintos de denisovanos, revelando una historia genética mucho más compleja y diversa de lo que se pensaba.',
    hominidTag: 'Denisovanos',
    typeTag: 'Genética',
    imageUrl: 'https://picsum.photos/seed/dnamap/600/400',
    imageHint: 'dna sequence',
  },
  {
    id: 'heidelbergensis-hunting',
    title: 'Lanzas de Schöningen',
    date: 'Re-analizado recientemente',
    summary:
      'Lanzas de madera de 300,000 años encontradas en Alemania demuestran que Homo heidelbergensis era un cazador sofisticado, capaz de planificar cacerías en grupo y fabricar armas complejas y equilibradas.',
    hominidTag: 'H. heidelbergensis',
    typeTag: 'Herramienta',
    imageUrl: 'https://picsum.photos/seed/spears/600/400',
    imageHint: 'wooden spears',
  },
];
