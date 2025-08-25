import React from 'react';
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from 'lucide-react';
import { PaginationControlsProps } from '../../Interfaces/SharedInterface';

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

  // Calculate the dynamic range: one page before and one after the current page
  const startPage = Math.max(1, page - 1);
  const endPage = Math.min(totalPages, page + 1);

  // Collect visible pages in an array
  const visiblePages: number[] = [];
  for (let p = startPage; p <= endPage; p++) {
    visiblePages.push(p);
  }

  // Determine if ellipsis should appear before or after the visible range
  const showStartEllipsis = startPage > 1; // there are pages before the visible range
  const showEndEllipsis = endPage < totalPages - 1; // there are pages after the visible range

  return (
    <div className='flex justify-center items-center gap-1 pt-10 pb-10'>
      {/* First page button */}
      <button
        onClick={() => handlePageChange(1)}
        disabled={page === 1}
        className={`p-1.5 sm:p-2 rounded-full border transition bg-neutral-50 hover:bg-gray-100 ${
          page === 1 ? 'opacity-40 cursor-not-allowed' : 'text-gray-700'
        }`}
        aria-label='First page'
      >
        <ChevronsLeft size={16} />
      </button>

      {/* Previous page button  */}
      <button
        onClick={() => handlePageChange(page - 1)}
        disabled={page === 1}
        className={`p-1 sm:p-1.5 rounded-full border transition bg-neutral-50 hover:bg-gray-100 ${
          page === 1 ? 'opacity-40 cursor-not-allowed' : 'text-gray-700'
        }`}
        aria-label='Previous page'
      >
        <ChevronLeft size={16} />
      </button>

      {/* Page number buttons */}
      <div className='flex items-center gap-1'>
        {/* Ellipsis for pages before visible range */}
        {showStartEllipsis && <span className='px-1 text-gray-400'>…</span>}

        {/* Visible page buttons */}
        {visiblePages.map((p) => (
          <button
            key={p}
            onClick={() => handlePageChange(p)}
            className={`px-2 sm:px-3 py-1 sm:py-1 rounded-lg text-xs sm:text-sm md:text-sm font-medium transition ${
              p === page
                ? 'bg-gray-600 text-white'
                : 'bg-gray-50 border hover:bg-white text-gray-800'
            }`}
          >
            {p}
          </button>
        ))}

        {/* Ellipsis for pages after visible range */}
        {showEndEllipsis && <span className='px-0.5 text-gray-400'>…</span>}
      </div>

      {/* Next page button */}
      <button
        onClick={() => handlePageChange(page + 1)}
        disabled={page === totalPages}
        className={`p-1 sm:p-1.5 rounded-full border transition bg-neutral-50 hover:bg-gray-100 ${
          page === totalPages
            ? 'opacity-40 cursor-not-allowed'
            : 'text-gray-700'
        }`}
        aria-label='Next page'
      >
        <ChevronRight size={16} />
      </button>

      {/* Last page button */}
      <button
        onClick={() => handlePageChange(totalPages)}
        disabled={page === totalPages}
        className={`p-1.5 sm:p-2 rounded-full border transition bg-neutral-50 hover:bg-gray-100 ${
          page === totalPages
            ? 'opacity-40 cursor-not-allowed'
            : 'text-gray-700'
        }`}
        aria-label='Last page'
      >
        <ChevronsRight size={16} />
      </button>
    </div>
  );
};

export default PaginationControls;
