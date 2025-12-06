import React from 'react';
import { ResponsiveImageProps } from '../../Interfaces/SharedInterface';

const ResponsiveImage: React.FC<ResponsiveImageProps> = ({
  visibleOn,
  loaded,
  setLoaded,
  maxWidth,
}) => {
  const isDesktop = visibleOn === 'desktop';
  const visibilityClass = isDesktop ? 'hidden md:flex' : 'flex md:hidden';

  return (
    <div className={`w-full justify-center relative ${visibilityClass}`}>
      {!loaded && (
        <img
          src='/assets/trova_logo_placeholder.webp'
          alt='Placeholder'
          className={`rounded-3xl shadow-xl object-cover w-full h-auto ${maxWidth} absolute top-0 left-0`}
        />
      )}

      <img
        src='/assets/catalogo_trova.webp'
        alt='Colección Trova'
        onLoad={() => setLoaded(true)}
        onError={(e) => {
          e.currentTarget.src = '/assets/trova_logo_placeholder.webp';
          setLoaded(true);
        }}
        className={`rounded-3xl shadow-xl object-cover transition-transform duration-700 w-full h-auto ${maxWidth}`}
      />
    </div>
  );
};

export default ResponsiveImage;
