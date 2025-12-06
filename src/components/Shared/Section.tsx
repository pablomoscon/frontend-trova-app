import React from 'react';
import { SectionProps } from '../../Interfaces/SharedInterface';

const Section: React.FC<SectionProps> = ({
  title,
  description,
  children,
  bgColor = 'bg-white',
  textColor = 'text-gray-900',
  padding = 'px-6 sm:px-12 py-20 sm:py-30',
}) => (
  <section className={`${bgColor} ${textColor} ${padding}`}>
    <div className='max-w-4xl mx-auto flex flex-col gap-12 items-center text-center'>
      <h2 className='text-4xl font-extrabold'>{title}</h2>
      {description && (
        <p className='text-lg sm:text-xl text-gray-700 max-w-xl'>
          {description}
        </p>
      )}
      {children}
    </div>
  </section>
);

export default Section;