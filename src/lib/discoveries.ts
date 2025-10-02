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
    title: 'Nuevas huellas de Laetoli revelan más sobre la marcha bípeda',
    date: 'Publicado: Diciembre 2021',
    summary:
      'Un nuevo análisis de las famosas huellas de Laetoli en Tanzania sugiere que más de un individuo de Australopithecus afarensis caminó por allí, mostrando una variabilidad en el tamaño corporal.',
    hominidTag: 'A. afarensis',
    typeTag: 'Fósil',
    imageUrl: 'https://picsum.photos/seed/footprints/600/400',
    imageHint: 'fossil footprints',
  },
  {
    id: 'oldowan-tools-kenya',
    title: 'Descubren herramientas de piedra de 2.9 millones de años en Kenia',
    date: 'Publicado: Febrero 2023',
    summary:
      'El hallazgo de herramientas tipo Oldowanense en Nyayanga, Kenia, retrasa la fecha de esta tecnología y se asocia con el consumo de hipopótamos por parte de homínidos aún no identificados.',
    hominidTag: 'Paranthropus',
    typeTag: 'Herramienta',
    imageUrl: 'https://picsum.photos/seed/stonetools/600/400',
    imageHint: 'stone tools',
  },
  {
    id: 'dragon-man-cranium',
    title: 'El "Hombre Dragón": ¿Una nueva especie humana?',
    date: 'Publicado: Junio 2021',
    summary:
      'Un cráneo masivo encontrado en China, apodado "Hombre Dragón", podría pertenecer a una nueva especie, Homo longi, que sería un pariente más cercano a Homo sapiens que los neandertales.',
    hominidTag: 'Homo longi',
    typeTag: 'Fósil',
    imageUrl: 'https://picsum.photos/seed/dragonskull/600/400',
    imageHint: 'ancient skull',
  },
  {
    id: 'neanderthal-art-spain',
    title: 'El arte rupestre más antiguo de Europa fue hecho por neandertales',
    date: 'Publicado: Febrero 2018',
    summary:
      'Pinturas en cuevas españolas datadas en más de 64,000 años demuestran que los neandertales crearon arte simbólico mucho antes de la llegada de los humanos modernos a Europa.',
    hominidTag: 'H. neanderthalensis',
    typeTag: 'Arte',
    imageUrl: 'https://picsum.photos/seed/cavepainting/600/400',
    imageHint: 'cave painting',
  },
  {
    id 'denisovan-dna-new-guinea',
    title: 'ADN denisovano revela una historia compleja en Nueva Guinea',
    date: 'Publicado: Abril 2019',
    summary:
      'El análisis genético de poblaciones de Nueva Guinea muestra que se cruzaron con al menos dos linajes distintos de denisovanos, uno de los cuales es muy diferente a los encontrados en Siberia.',
    hominidTag: 'Denisovanos',
    typeTag: 'Genética',
    imageUrl: 'https://picsum.photos/seed/dnamap/600/400',
    imageHint: 'dna sequence',
  },
  {
    id: 'heidelbergensis-hunting',
    title: 'Lanzas de Schöningen: evidencia de caza activa hace 300,000 años',
    date: 'Descubierto: 1994-1998, re-analizado',
    summary:
      'Las lanzas de madera perfectamente conservadas encontradas en Alemania demuestran que Homo heidelbergensis era un cazador sofisticado, capaz de planificar y ejecutar cacerías en grupo.',
    hominidTag: 'H. heidelbergensis',
    typeTag: 'Herramienta',
    imageUrl: 'https://picsum.photos/seed/spears/600/400',
    imageHint: 'wooden spears',
  },
];
