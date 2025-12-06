import React from 'react';
import { NumberedPageButtonProps } from '../../../Interfaces/SharedInterface';

const NumberedPageButton: React.FC<NumberedPageButtonProps> = ({
  pageNumber,
  currentPage,
  onClick,
}) => {
  const isActive = pageNumber === currentPage;
  return (
    <button
      onClick={onClick}
      className={`px-2 sm:px-3 py-1 sm:py-1 rounded-lg text-xs sm:text-sm md:text-sm font-medium transition ${
        isActive
          ? 'bg-gray-600 text-white'
          : 'bg-gray-50 border hover:bg-white text-gray-800'
      }`}
    >
      {pageNumber}
    </button>
  );
};

export default NumberedPageButton;
