// components/Shared/FadeImage.tsx
import React from 'react';
import { FadeImageProps } from '../../Interfaces/SharedInterface';


const FadeImage: React.FC<FadeImageProps> = ({
  src,
  alt,
  visible,
  className,
}) => (
  <img
    src={src}
    alt={alt}
    className={`
      absolute top-0 left-0 w-full h-full transition-opacity duration-700
      ${visible ? 'opacity-100' : 'opacity-0'}
      ${className || ''}
    `}
  />
);

export default FadeImage;
