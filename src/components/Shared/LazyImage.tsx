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
    <button
      className={`relative flex items-center justify-center ${containerClassName}`}
      onClick={onClick}
    >
      {!loaded && (
        <img
          src={placeholderSrc}
          alt='Placeholder'
          className='max-w-full max-h-full object-contain'
        />
      )}

      <img
        src={src}
        alt={alt}
        loading='lazy'
        onLoad={() => setLoaded(true)}
        className={`absolute top-0 left-0 w-full h-full ${objectFit === 'cover' ? 'object-cover' : 'object-contain'} transition-opacity duration-700 ${loaded ? 'opacity-100' : 'opacity-0'} ${className}`}
      />
    </button>
  );
};
