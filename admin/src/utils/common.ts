import { PathSlug } from 'models';

export const capitalizeString = (str: string) => {
  if (!str) return '';

  return `${str[0].toUpperCase()}${str.slice(1)}`;
};

export const getMarkColor = (mark: number) => {
  if (mark >= 8) return 'green';
  if (mark >= 4) return 'goldenrod';

  return 'red';
};

export const getPathSlugColor = (pathSlug: PathSlug) => {
  if (pathSlug === 'responsive-web-developer') return '#1565c0';
  if (pathSlug === 'front-end-developer') return '#e65100';

  return '#c62828';
};
