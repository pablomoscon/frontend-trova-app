import React from 'react';

const MailIcon: React.FC<{ size?: number; className?: string }> = ({
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
    className={`lucide lucide-mail ${className}`}
  >
    <rect x='2' y='4' width='20' height='16' rx='2' />
    <path d='M22 6 12 13 2 6' />
  </svg>
);

export default MailIcon;
