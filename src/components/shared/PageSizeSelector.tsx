import React from 'react';
import { PageSizeSelectorProps } from '../../Interfaces/SharedInterface';

const PageSizeSelector: React.FC<PageSizeSelectorProps> = ({
  pageSize,
  onChange,
}) => {
  return (
    <div className='flex flex-col sm:flex-row sm:justify-end mb-4 px-4 items-end sm:items-center gap-2 sm:gap-3'>
      <label
        className='font-medium text-gray-600 text-sm sm:text-base'
        htmlFor='page-size-select'
      >
        Álbums por página:
      </label>
      <select
        id='page-size-select'
        title='Cantidad de álbumes por página'
        value={pageSize}
        onChange={(e) => onChange(Number.parseInt(e.target.value))}
        className='border border-gray-300 rounded px-2 py-1 text-sm sm:text-base'
      >
        {[6, 9, 12, 15].map((size) => (
          <option key={size} value={size}>
            {size}
          </option>
        ))}
      </select>
    </div>
  );
};

export default PageSizeSelector;
