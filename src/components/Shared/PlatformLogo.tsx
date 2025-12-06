import React from 'react';
import { PlatformLogoProps } from '../../Interfaces/SharedInterface';

const PlatformLogo: React.FC<PlatformLogoProps> = ({ name, src, href }) => (
  <a href={href} target='_blank' rel='noopener noreferrer'>
    <img
      src={src}
      alt={name}
      className='h-10 sm:h-10 md:h-12 lg:h-12 hover:scale-110 transition-transform'
    />
  </a>
);

export default PlatformLogo;
