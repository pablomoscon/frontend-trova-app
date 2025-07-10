import React from 'react';

const FacebookIcon: React.FC<{ size?: number; className?: string }> = ({
  size = 24,
  className = '',
}) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width={size}
    height={size}
    viewBox='0 0 24 24'
    fill='none'
    stroke='currentColor'
    strokeWidth='2'
    strokeLinecap='round'
    strokeLinejoin='round'
    className={`lucide lucide-facebook ${className}`}
  >
    <path d='M18 2h-3a4 4 0 0 0-4 4v4H8v4h3v8h4v-8h3l1-4h-4V6a1 1 0 0 1 1-1h3z' />
  </svg>
);

export default FacebookIcon;
