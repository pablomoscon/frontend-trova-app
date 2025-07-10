import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { PaginationControlsProps } from '../../Interfaces/SharedInterface';

const PaginationControls: React.FC<PaginationControlsProps> = ({
  page,
  totalPages,
  setPage,
  onPageChangeComplete
}) => {
  const maxButtons = 5;

  const handlePageChange = (newPage: number) => {
    if (newPage !== page && newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
      if (onPageChangeComplete) {
        onPageChangeComplete();
      }
    }
  };

  let startPage = Math.max(1, page - 2);
  let endPage = Math.min(totalPages, page + 2);

  if (page <= 3) endPage = Math.min(totalPages, maxButtons);
  if (page >= totalPages - 2)
    startPage = Math.max(1, totalPages - (maxButtons - 1));

  const buttons: React.ReactNode[] = [];

  if (startPage > 1) {
    buttons.push(
      <button
        key={1}
        onClick={() => handlePageChange(1)}
        className={`rounded-lg px-3 py-1 transition ${
          page === 1
            ? 'bg-gray-600 text-white'
            : 'bg-white hover:bg-gray-100 text-gray-800 border'
        }`}
      >
        1
      </button>
    );
    if (startPage > 2) buttons.push(<span key='start-ellipsis'>…</span>);
  }

  for (let p = startPage; p <= endPage; p++) {
    buttons.push(
      <button
        key={p}
        onClick={() => handlePageChange(p)}
        className={`rounded-lg px-3 py-1 transition ${
          p === page
            ? 'bg-gray-600 text-white'
            : 'bg-white hover:bg-gray-100 text-gray-800 border'
        }`}
      >
        {p}
      </button>
    );
  }

  if (endPage < totalPages) {
    if (endPage < totalPages - 1)
      buttons.push(<span key='end-ellipsis'>…</span>);
    buttons.push(
      <button
        key={totalPages}
        onClick={() => handlePageChange(totalPages)}
        className={`rounded-lg px-3 py-1 transition ${
          page === totalPages
            ? 'bg-gray-600 text-white'
            : 'bg-white hover:bg-gray-100 text-gray-800 border'
        }`}
      >
        {totalPages}
      </button>
    );
  }

  return (
    <div className='flex justify-center items-center gap-2 pt-4 pb-14'>
      <button
        onClick={() => handlePageChange(page - 1)}
        disabled={page === 1}
        className={`p-2 border rounded-full text-gray-700 hover:bg-gray-100 transition ${
          page === 1 ? 'opacity-50 cursor-not-allowed' : ''
        }`}
        aria-label='Anterior'
      >
        <ChevronLeft size={20} />
      </button>

      {buttons}

      <button
        onClick={() => handlePageChange(page + 1)}
        disabled={page === totalPages}
        className={`p-2 border rounded-full text-gray-700 hover:bg-gray-100 transition ${
          page === totalPages ? 'opacity-50 cursor-not-allowed' : ''
        }`}
        aria-label='Siguiente'
      >
        <ChevronRight size={20} />
      </button>
    </div>
  );
};

export default PaginationControls;
