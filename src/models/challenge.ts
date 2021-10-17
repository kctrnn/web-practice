import { PathSlug } from 'models';

export interface Challenge {
  id: string;

  name: string;
  description: string;
  brief: string;

  level: number;
  order: number;

  designId: string;
  resourceId: string;
  thumbnailImage: string;

  pathSlug: PathSlug;
  tags: Array<string>;

  createdAt?: number;
  updatedAt?: number;
}
