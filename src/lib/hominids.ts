export type HominidStage = {
  name: string;
  years: string;
  imagePlaceholderId: string;
  facialFeatures: string;
  modelEmbedUrl?: string;
};

export const HOMINID_STAGES: HominidStage[] = [
  {
    name: 'Australopithecus Afarensis',
    years: 'Hace 3.9 – 2.9 millones de años',
    imagePlaceholderId: 'evoluface-australopithecus',
    facialFeatures:
      'Cara prognática (proyectada hacia adelante), fuerte arco superciliar, grandes molares y un pequeño cráneo en comparación con los humanos modernos.',
    modelEmbedUrl: 'https://3d.si.edu/object/3d/australopithecus-afarensis-cranium-a.l.-444-2:d8c6239a-7f61-4674-9983-b7842531955b',
  },
  {
    name: 'Homo Habilis',
    years: 'Hace 2.4 – 1.4 millones de años',
    imagePlaceholderId: 'evoluface-homo-habilis',
    facialFeatures:
      'Rostro y dientes ligeramente más pequeños que los del Australopithecus, pero aún conservando un notable arco superciliar. La caja craneana es más grande.',
    modelEmbedUrl: 'https://3d.si.edu/object/3d/homo-habilis-cranium-knm-er-1813:8c142cfa-9464-45b6-953a-028a7f457788',
  },
  {
    name: 'Homo Erectus',
    years: 'Hace 1.9 millones – 117,000 años',
    imagePlaceholderId: 'evoluface-homo-erectus',
    facialFeatures:
      'Rostro menos prognático, mandíbulas y dientes más pequeños. Todavía presenta un prominente arco superciliar, y la frente es baja e inclinada.',
    modelEmbedUrl: 'https://3d-api.si.edu/voyager/3d_package:6faf8121-250c-47cb-a5cc-139d7b16c570',
  },
  {
    name: 'Homo Heidelbergensis',
    years: 'Hace 400,000 – 40,000 años',
    imagePlaceholderId: 'evoluface-homo-heidelbergensis',
    facialFeatures:
      'Gran parte media del rostro proyectada, pómulos angulados y una nariz muy grande. Arco superciliar prominente y un cráneo relativamente plano y alargado.',
    modelEmbedUrl: 'https://3d.si.edu/object/3d/homo-heidelbergensis-cranium-kabwe:2a415a7a-42ca-494b-952a-95b1842037a3',
  },
  {
    name: 'Homo Neanderthalensis',
    years: 'Hace 400,000 – 40,000 años',
    imagePlaceholderId: 'evoluface-neanderthal',
    facialFeatures:
      'Gran parte media del rostro proyectada, pómulos angulados y una nariz muy grande. Arco superciliar prominente y un cráneo relativamente plano y alargado.',
    modelEmbedUrl: 'https://3d.si.edu/object/3d/homo-neanderthalensis-cranium-la-ferrassie-1:a58c639f-43f1-43a1-9457-3a131b268297',
  },
  {
    name: 'Homo Sapiens',
    years: 'Hace 300,000 años – presente',
    imagePlaceholderId: 'evoluface-homo-sapiens',
    facialFeatures:
      'Frente plana y casi vertical, arco superciliar pequeño o inexistente, mandíbulas y dientes más pequeños, y un mentón prominente.',
    modelEmbedUrl: 'https://3d.si.edu/object/3d/homo-sapiens-cranium-skhul-v:e1ff02a0-435e-448f-9d10-31b6b553e4c4',
  },
];
