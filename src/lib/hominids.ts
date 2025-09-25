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
      'Cara prognática (proyectada hacia adelante), fuerte arco superciliar, grandes molares y un pequeño cráneo en comparación con los humanos modernos.',
    craniumFeatures:
      'Cráneo pequeño con una capacidad de aproximadamente 380-430 cm³. Presenta una cresta sagital marcada en machos y una base del cráneo ancha. La cara es prognática, con un paladar profundo.',
    model3dId: 'australopithecus-cranium',
  },
  {
    name: 'Homo Habilis',
    years: 'Hace 2.4 – 1.4 millones de años',
    imagePlaceholderId: 'evoluface-homo-habilis',
    facialFeatures:
      'Rostro y dientes ligeramente más pequeños que los del Australopithecus, pero aún conservando un notable arco superciliar. La caja craneana es más grande.',
    craniumFeatures:
      'Capacidad craneal ligeramente mayor, entre 550 y 680 cm³. El cráneo es más redondeado que en los australopitecinos, aunque la cara sigue siendo primitiva. El foramen magnum se encuentra más centrado.',
    model3dId: 'homo-habilis-cranium',
  },
  {
    name: 'Homo Erectus',
    years: 'Hace 1.9 millones – 117,000 años',
    imagePlaceholderId: 'evoluface-homo-erectus',
    facialFeatures:
      'Rostro menos prognático, mandíbulas y dientes más pequeños. Todavía presenta un prominente arco superciliar, y la frente es baja e inclinada.',
    craniumFeatures:
      'Aumento significativo de la capacidad craneal (800-1250 cm³). El cráneo es alargado y bajo, con paredes óseas gruesas y un marcado toro supraorbitario. Presenta una quilla sagital en la parte superior.',
    model3dId: 'homo-erectus-cranium',
  },
  {
    name: 'Homo Heidelbergensis',
    years: 'Hace 400,000 – 40,000 años',
    imagePlaceholderId: 'evoluface-homo-heidelbergensis',
    facialFeatures:
      'Gran parte media del rostro proyectada, pómulos angulados y una nariz muy grande. Arco superciliar prominente y un cráneo relativamente plano y alargado.',
    craniumFeatures:
      'Gran capacidad craneal (1100-1400 cm³), similar a los humanos modernos. El cráneo es más robusto, con un toro supraorbitario de doble arco y una cara más ancha. No presenta mentón.',
    model3dId: 'homo-heidelbergensis-cranium',
  },
  {
    name: 'Homo Neanderthalensis',
    years: 'Hace 400,000 – 40,000 años',
    imagePlaceholderId: 'evoluface-neanderthal',
    facialFeatures:
      'Gran parte media del rostro proyectada, pómulos angulados y una nariz muy grande. Arco superciliar prominente y un cráneo relativamente plano y alargado.',
    craniumFeatures:
      'Capacidad craneal incluso mayor que la de los humanos modernos (promedio de 1500 cm³). El cráneo es largo y bajo, con un característico "moño" occipital en la parte posterior y una frente huidiza.',
    model3dId: 'neanderthal-cranium',
  },
  {
    name: 'Homo Sapiens',
    years: 'Hace 300,000 años – presente',
    imagePlaceholderId: 'evoluface-homo-sapiens',
    facialFeatures:
      'Frente plana y casi vertical, arco superciliar pequeño o inexistente, mandíbulas y dientes más pequeños, y un mentón prominente.',
    craniumFeatures:
      'Capacidad craneal promedio de unos 1350 cm³. El cráneo es corto, alto y abovedado, con una frente vertical. La cara es pequeña y retraída bajo el lóbulo frontal, y presenta un mentón desarrollado.',
    model3dId: 'homo-sapiens-cranium',
  },
];
