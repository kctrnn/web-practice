import { PathSlug } from 'models';

export interface Challenge {
  id: string;

  name: string;
  description: string;
  level: number;
  thumbnailImage: string;
  order: number;
  designId: string;
  resourceId: string;
  brief: string;

  pathSlug: PathSlug;

  createdAt?: number;
  updatedAt?: number;
}
