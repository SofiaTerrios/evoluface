export type CulturalLayer = {
  id: string;
  title: string;
  period: string;
  description: string;
  videoUrl?: string; // Placeholder for video
  imageUrl?: string; // Placeholder for image
};

export const CULTURAL_LAYERS: CulturalLayer[] = [
  {
    id: "cavernicolas",
    title: "Datos curiosos sobre los cavernícolas",
    period: "Prehistoria",
    description:
      "Descubre datos fascinantes sobre nuestros ancestros cavernícolas. Aprende cómo vivían, qué comían y cómo sobrevivían en condiciones extremas durante la era prehistórica.",
    videoUrl: "https://www.youtube.com/embed/0kLQ-xuFRHc",
  },
  {
    id: "homo-habilis",
    title: "Aprende sobre el Homo Habilis!",
    period: "Paleolítico Inferior",
    description:
      "El Homo habilis, conocido como el 'hombre hábil', fue uno de los primeros en usar herramientas de piedra. Descubre más sobre esta especie clave en nuestra evolución.",
    videoUrl: "https://www.youtube.com/embed/tmMT-nL8TN4",
  },
  {
    id: "lucy",
    title: "DATOS CURIOSOS SOBRE: Lucy",
    period: "Hace 3.2 millones de años",
    description:
      "Lucy, el fósil de Australopithecus afarensis más famoso del mundo. Conoce la historia de este descubrimiento extraordinario que cambió nuestra comprensión de la evolución humana.",
    videoUrl: "https://www.youtube.com/embed/1-2e4kW6IxI",
  },
  {
    id: "neandertales-datos",
    title: "DATOS CURIOSOS SOBRE: Neandertales",
    period: "Paleolítico Medio",
    description:
      "Los neandertales fueron mucho más sofisticados de lo que se pensaba. Descubre datos sorprendentes sobre nuestros primos evolutivos más cercanos y su cultura avanzada.",
    videoUrl: "https://www.youtube.com/embed/7VNJJwKNCks",
  },
  {
    id: "neandertales-aprende",
    title: "Aprende sobre neandertales!",
    period: "Paleolítico Medio",
    description:
      "Profundiza en el mundo de los neandertales: su inteligencia, sus herramientas, su arte y por qué se extinguieron. Una mirada completa a esta fascinante especie humana.",
    videoUrl: "https://www.youtube.com/embed/fwW1AGUmdY8",
  },
];
