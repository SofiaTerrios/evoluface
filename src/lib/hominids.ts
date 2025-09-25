export type HominidStage = {
  name: string;
  years: string;
  imagePlaceholderId: string;
  facialFeatures: string;
};

export const HOMINID_STAGES: HominidStage[] = [
  {
    name: 'Australopithecus Afarensis',
    years: 'Hace 3.9 – 2.9 millones de años',
    imagePlaceholderId: 'evoluface-australopithecus',
    facialFeatures: 'Cara prognática (proyectada hacia adelante), fuerte arco superciliar, grandes molares y un pequeño cráneo en comparación con los humanos modernos.',
  },
  {
    name: 'Homo Habilis',
    years: 'Hace 2.4 – 1.4 millones de años',
    imagePlaceholderId: 'evoluface-homo-habilis',
    facialFeatures: 'Rostro y dientes ligeramente más pequeños que los del Australopithecus, pero aún conservando un notable arco superciliar. La caja craneana es más grande.',
  },
  {
    name: 'Homo Erectus',
    years: 'Hace 1.9 millones – 117,000 años',
    imagePlaceholderId: 'evoluface-homo-erectus',
    facialFeatures: 'Rostro menos prognático, mandíbulas y dientes más pequeños. Todavía presenta un prominente arco superciliar, y la frente es baja e inclinada.',
  },
  {
    name: 'Homo Heidelbergensis',
    years: 'Hace 400,000 – 40,000 años',
    imagePlaceholderId: 'evoluface-homo-heidelbergensis',
    facialFeatures: 'Gran parte media del rostro proyectada, pómulos angulados y una nariz muy grande. Arco superciliar prominente y un cráneo relativamente plano y alargado.',
  },
  {
    name: 'Homo Neanderthalensis',
    years: 'Hace 400,000 – 40,000 años',
    imagePlaceholderId: 'evoluface-neanderthal',
    facialFeatures: 'Gran parte media del rostro proyectada, pómulos angulados y una nariz muy grande. Arco superciliar prominente y un cráneo relativamente plano y alargado.',
  },
  {
    name: 'Homo Sapiens',
    years: 'Hace 300,000 años – presente',
    imagePlaceholderId: 'evoluface-homo-sapiens',
    facialFeatures: 'Frente plana y casi vertical, arco superciliar pequeño o inexistente, mandíbulas y dientes más pequeños, y un mentón prominente.',
  },
];
