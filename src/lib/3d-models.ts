import data from './3d-models.json';

export type Model3D = {
  id: string;
  description: string;
  iframeUrl: string;
};

export const Models3D: Model3D[] = data.models;
