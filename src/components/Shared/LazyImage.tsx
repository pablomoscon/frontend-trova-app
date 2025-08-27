import React, { useState } from 'react';

interface LazyImageProps {
  src: string;
  alt: string;
  placeholderSrc: string;
  objectFit?: 'cover' | 'contain';
  className?: string;
  containerClassName?: string;
  onClick?: () => void;
}

export const LazyImage: React.FC<LazyImageProps> = ({
  src,
  alt,
  placeholderSrc,
  objectFit = 'cover',
  className = '',
  containerClassName = '',
  onClick,
}) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <div
      className={`flex items-center justify-center ${containerClassName}`}
      onClick={onClick}
    >
      <img
        src={loaded ? src : placeholderSrc}
        alt={alt}
        loading='lazy'
        onLoad={() => setLoaded(true)}
        className={`w-full h-auto ${
          objectFit === 'cover' ? 'object-cover' : 'object-contain'
        } ${className}`}
      />
    </div>
  );
};
