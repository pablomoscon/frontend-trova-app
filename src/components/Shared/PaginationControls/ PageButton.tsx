import React from 'react';
import { PageButtonProps } from '../../../Interfaces/SharedInterface';

const PageButton: React.FC<PageButtonProps> = ({
  onClick,
  disabled,
  children,
  ariaLabel,
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`p-1.5 sm:p-2 rounded-full border transition bg-neutral-50 hover:bg-gray-100 ${
        disabled ? 'opacity-40 cursor-not-allowed' : 'text-gray-700'
      }`}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  );
};

export default PageButton;
