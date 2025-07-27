import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { PaginationControlsProps } from '../../Interfaces/SharedInterface';
import { getPaginationRange } from '../../utils/paginationUtils';

const PaginationControls: React.FC<PaginationControlsProps> = ({
  page,
  totalPages,
  setPage,
  onPageChangeComplete,
}) => {
  const handlePageChange = (newPage: number) => {
    if (newPage !== page && newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
      onPageChangeComplete?.();
    }
  };

  const [startPage, endPage] = getPaginationRange(page, totalPages);

  const buttons: React.ReactNode[] = [];

  if (startPage > 1) {
    buttons.push(
      <button
        key={1}
        onClick={() => handlePageChange(1)}
        className={`px-2 sm:px-3 py-1 rounded-lg text-xs sm:text-sm md:text-base font-medium transition ${
          page === 1
            ? 'bg-gray-600 text-white'
            : 'bg-gray-50 border hover:bg-white text-gray-800'
        }`}
      >
        1
      </button>
    );
    if (startPage > 2) {
      buttons.push(
        <span
          key='start-ellipsis'
          className='px-1 text-gray-400 text-xs sm:text-sm md:text-base'
        >
          …
        </span>
      );
    }
  }

  for (let p = startPage; p <= endPage; p++) {
    buttons.push(
      <button
        key={p}
        onClick={() => handlePageChange(p)}
        className={`px-2 sm:px-3 py-1 rounded-lg text-xs sm:text-sm md:text-base font-medium transition ${
          p === page
            ? 'bg-gray-600 text-white'
            : 'bg-gray-50 border hover:bg-white text-gray-800'
        }`}
      >
        {p}
      </button>
    );
  }

  if (endPage < totalPages - 1) {
    buttons.push(
      <span
        key='end-ellipsis'
        className='px-1 text-gray-400 text-xs sm:text-sm md:text-base'
      >
        …
      </span>
    );
  }

  return (
    <div className='flex justify-center items-center gap-1 pt-4 pb-10'>
      <button
        onClick={() => handlePageChange(page - 1)}
        disabled={page === 1}
        className={`p-1.5 sm:p-2 rounded-full border transition bg-neutral-50 hover:bg-gray-100 ${
          page === 1 ? 'opacity-40 cursor-not-allowed' : 'text-gray-700'
        }`}
        aria-label='Página anterior'
      >
        <ChevronLeft size={18} className='sm:size-4 md:size-5' />
      </button>

      <div className='flex items-center gap-1'>{buttons}</div>

      <button
        onClick={() => handlePageChange(page + 1)}
        disabled={page === totalPages}
        className={`p-1.5 sm:p-2 rounded-full border transition bg-neutral-50 hover:bg-gray-100 ${
          page === totalPages
            ? 'opacity-40 cursor-not-allowed'
            : 'text-gray-700'
        }`}
        aria-label='Página siguiente'
      >
        <ChevronRight size={18} className='sm:size-4 md:size-5' />
      </button>
    </div>
  );
};

export default PaginationControls;
