export type HominidStage = {
  name: string;
  years: string;
  imagePlaceholderId: string;
  facialFeatures: string;
};

export const HOMINID_STAGES: HominidStage[] = [
  {
    name: 'Australopithecus Afarensis',
    years: '3.9 – 2.9 million years ago',
    imagePlaceholderId: 'evoluface-australopithecus',
    facialFeatures: 'Cara prognática (proyectada hacia adelante), fuerte arco superciliar, grandes molares y un pequeño cráneo en comparación con los humanos modernos.',
  },
  {
    name: 'Homo Habilis',
    years: '2.4 – 1.4 million years ago',
    imagePlaceholderId: 'evoluface-homo-habilis',
    facialFeatures: 'Slightly smaller face and teeth than Australopithecus, but still retaining a noticeable brow ridge. Braincase is larger.',
  },
  {
    name: 'Homo Erectus',
    years: '1.9 million – 117,000 years ago',
    imagePlaceholderId: 'evoluface-homo-erectus',
    facialFeatures: 'Less prognathic face, smaller jaws and teeth. A prominent brow ridge is still present, and the forehead is low and sloping.',
  },
  {
    name: 'Homo Heidelbergensis',
    years: '400,000 – 40,000 years ago',
    imagePlaceholderId: 'evoluface-homo-heidelbergensis',
    facialFeatures: 'Large, projecting mid-face, angled cheekbones, and a very large nose. Prominent brow ridge and a relatively flat, elongated skull.',
  },
  {
    name: 'Homo Neanderthalensis',
    years: '400,000 – 40,000 years ago',
    imagePlaceholderId: 'evoluface-neanderthal',
    facialFeatures: 'Large, projecting mid-face, angled cheekbones, and a very large nose. Prominent brow ridge and a relatively flat, elongated skull.',
  },
  {
    name: 'Homo Sapiens',
    years: '300,000 years ago – present',
    imagePlaceholderId: 'evoluface-homo-sapiens',
    facialFeatures: 'Flat and near-vertical forehead, small or non-existent brow ridge, smaller jaws and teeth, and a prominent chin.',
  },
];
