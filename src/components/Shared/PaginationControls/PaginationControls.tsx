import React from 'react';
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from 'lucide-react';
import NumberedPageButton from './NumberedPageButton';
import { PaginationControlsProps } from '../../../Interfaces/SharedInterface';
import PageButton from './ PageButton';

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

  const startPage = Math.max(1, page - 1);
  const endPage = Math.min(totalPages, page + 1);
  const visiblePages = Array.from(
    { length: endPage - startPage + 1 },
    (_, i) => startPage + i
  );

  return (
    <div className='flex justify-center items-center gap-1 pt-10 pb-10'>
      <PageButton
        onClick={() => handlePageChange(1)}
        disabled={page === 1}
        ariaLabel='First page'
      >
        <ChevronsLeft size={16} />
      </PageButton>

      <PageButton
        onClick={() => handlePageChange(page - 1)}
        disabled={page === 1}
        ariaLabel='Previous page'
      >
        <ChevronLeft size={16} />
      </PageButton>

      <div className='flex items-center gap-1'>
        {visiblePages.map((p) => (
          <NumberedPageButton
            key={p}
            pageNumber={p}
            currentPage={page}
            onClick={() => handlePageChange(p)}
          />
        ))}
      </div>

      <PageButton
        onClick={() => handlePageChange(page + 1)}
        disabled={page === totalPages}
        ariaLabel='Next page'
      >
        <ChevronRight size={16} />
      </PageButton>

      <PageButton
        onClick={() => handlePageChange(totalPages)}
        disabled={page === totalPages}
        ariaLabel='Last page'
      >
        <ChevronsRight size={16} />
      </PageButton>
    </div>
  );
};

export default PaginationControls;
