import React from 'react';

interface PageSizeSelectorProps {
  pageSize: number;
  onChange: (value: number) => void;
}

const PageSizeSelector: React.FC<PageSizeSelectorProps> = ({
  pageSize,
  onChange,
}) => {
  return (
    <div className='flex justify-end mb-4 px-4'>
      <label className='mr-2 font-medium text-gray-600' htmlFor='page-size-select'>
        Álbums por página:
      </label>
      <select
        id='page-size-select'
        title='Cantidad de álbumes por página'
        value={pageSize}
        onChange={(e) => onChange(parseInt(e.target.value))}
        className='border border-gray-300 rounded px-2 py-1'
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
