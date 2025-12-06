import React, { useState } from 'react';
import { AdminCoverImageProps } from '../../../Interfaces/AdminProfileInterface';

const AdminCoverImage: React.FC<AdminCoverImageProps> = ({
  src,
  placeholder,
  alt,
}) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className='w-full h-60 overflow-hidden relative'>
      {!loaded && (
        <img
          src={placeholder}
          alt='Placeholder'
          className='w-full h-full object-cover filter brightness-80 contrast-70'
        />
      )}
      <img
        src={src}
        alt={alt}
        onLoad={() => setLoaded(true)}
        onError={(e) => {
          e.currentTarget.src = placeholder;
          setLoaded(true);
        }}
        className='w-full h-full object-cover filter brightness-80 contrast-70'
      />
    </div>
  );
};

export default AdminCoverImage;
