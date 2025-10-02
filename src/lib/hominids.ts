export type HominidStage = {
  name: string;
  years: string;
  imagePlaceholderId: string;
  facialFeatures: string;
  craniumFeatures: string;
  model3dId?: string;
};

export const HOMINID_STAGES: HominidStage[] = [
  {
    name: 'Australopithecus Afarensis',
    years: 'Hace 3.9 – 2.9 millones de años',
    imagePlaceholderId: 'evoluface-australopithecus',
    facialFeatures:
      'Famoso por "Lucy", esta especie caminaba erguida pero conservaba rasgos simiescos.',
    craniumFeatures:
      'Cráneo pequeño con una capacidad de aproximadamente 380-430 cm³. Presenta una cresta sagital marcada en machos y una base del cráneo ancha. La cara es prognática, con un paladar profundo.',
    model3dId: 'australopithecus-cranium',
  },
  {
    name: 'Homo Habilis',
    years: 'Hace 2.4 – 1.4 millones de años',
    imagePlaceholderId: 'evoluface-homo-habilis',
    facialFeatures:
      'Conocido como "hombre hábil" por ser uno de los primeros en usar herramientas de piedra.',
    craniumFeatures:
      'Capacidad craneal ligeramente mayor, entre 550 y 680 cm³. El cráneo es más redondeado que en los australopitecinos, aunque la cara sigue siendo primitiva. El foramen magnum se encuentra más centrado.',
    model3dId: 'homo-habilis-cranium',
  },
  {
    name: 'Homo Erectus',
    years: 'Hace 1.9 millones – 117,000 años',
    imagePlaceholderId: 'evoluface-homo-erectus',
    facialFeatures:
      'El primer homínido en migrar fuera de África, con un cerebro más grande y proporciones corporales más humanas.',
    craniumFeatures:
      'Aumento significativo de la capacidad craneal (800-1250 cm³). El cráneo es alargado y bajo, con paredes óseas gruesas y un marcado toro supraorbitario. Presenta una quilla sagital en la parte superior.',
    model3dId: 'homo-erectus-cranium',
  },
   {
    name: 'Homo Heidelbergensis',
    years: 'Hace 700,000 – 200,000 años',
    imagePlaceholderId: 'evoluface-homo-heidelbergensis',
    facialFeatures: 'Ancestro común de Neandertales y Homo sapiens, con una mezcla de rasgos primitivos y modernos.',
    craniumFeatures:
      'Gran capacidad craneal (1100-1400 cm³), similar a los humanos modernos. El cráneo es más robusto, con un toro supraorbitario de doble arco y una cara más ancha. No presenta mentón.',
    model3dId: 'homo-heidelbergensis-cranium',
  },
  {
    name: 'Homo Neanderthalensis',
    years: 'Hace 400,000 – 40,000 años',
    imagePlaceholderId: 'evoluface-neanderthal',
    facialFeatures:
      'Nuestro pariente humano extinto más cercano, adaptado a climas fríos en Europa y Asia.',
    craniumFeatures:
      'Capacidad craneal incluso mayor que la de los humanos modernos (promedio de 1500 cm³). El cráneo es largo y bajo, con un característico "moño" occipital en la parte posterior y una frente huidiza.',
    model3dId: 'neanderthal-cranium',
  },
  {
    name: 'Homo Sapiens',
    years: 'Hace 300,000 años – presente',
    imagePlaceholderId: 'evoluface-homo-sapiens',
    facialFeatures:
      'Humanos modernos, caracterizados por cerebros grandes, lenguaje y cultura compleja.',
    craniumFeatures:
      'Capacidad craneal promedio de unos 1350 cm³. El cráneo es corto, alto y abovedado, con una frente vertical. La cara es pequeña y retraída bajo el lóbulo frontal, y presenta un mentón desarrollado.',
    model3dId: 'homo-sapiens-cranium',
  },
];


// Simplified list for the new timeline design
export const HOMINID_STAGES_TIMELINE: HominidStage[] = [
  {
    name: 'Australopithecus Afarensis',
    years: 'Hace 3.9 – 2.9 millones de años',
    imagePlaceholderId: 'evoluface-australopithecus',
    facialFeatures:
      'Famoso por "Lucy", esta especie caminaba erguida pero conservaba rasgos simiescos.',
    craniumFeatures: '',
  },
  {
    name: 'Homo Habilis',
    years: 'Hace 2.4 – 1.4 millones de años',
    imagePlaceholderId: 'evoluface-homo-habilis',
    facialFeatures:
      'Conocido como "hombre hábil" por ser uno de los primeros en usar herramientas de piedra.',
    craniumFeatures: '',
  },
  {
    name: 'Homo Erectus',
    years: 'Hace 1.9 millones – 117,000 años',
    imagePlaceholderId: 'evoluface-homo-erectus',
    facialFeatures:
      'El primer homínido en migrar fuera de África, con un cerebro más grande y proporciones corporales más humanas.',
    craniumFeatures: '',
  },
  {
    name: 'Homo Neanderthalensis',
    years: 'Hace 400,000 – 40,000 años',
    imagePlaceholderId: 'evoluface-neanderthal',
    facialFeatures:
      'Nuestro pariente humano extinto más cercano, adaptado a climas fríos en Europa y Asia.',
    craniumFeatures: '',
  },
  {
    name: 'Homo Sapiens',
    years: 'Hace 300,000 años – presente',
    imagePlaceholderId: 'evoluface-homo-sapiens',
    facialFeatures:
      'Humanos modernos, caracterizados por cerebros grandes, lenguaje y cultura compleja.',
    craniumFeatures: '',
  },
].sort((a, b) => {
    const getYear = (str: string) => parseFloat(str.match(/(\d+\.?\d*)/)?.[0] || '0') * (str.includes('millones') ? 1000000 : 1);
    const yearA = getYear(a.years);
    const yearB = getYear(b.years);
    return yearB - yearA;
});