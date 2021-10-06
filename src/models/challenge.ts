export interface Challenge {
  id: string;

  name: string;
  description: string;
  level: number;
  thumbnailImage: string;

  pathSlug:
    | 'responsive-web-developer'
    | 'front-end-developer'
    | 'full-stack-developer';

  createdAt?: number;
  updatedAt?: number;
}
