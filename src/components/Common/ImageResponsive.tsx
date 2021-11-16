import { CSSProperties } from 'react';

const style: CSSProperties = {
  width: '100%',
  height: '100%',
  objectFit: 'cover',

  borderRadius: '.25rem',
};

export interface ImageResponsiveProps {
  src: string | undefined;
  alt: string;
}

export function ImageResponsive({ src, alt }: ImageResponsiveProps) {
  return <img src={src} alt={alt} style={style} />;
}
