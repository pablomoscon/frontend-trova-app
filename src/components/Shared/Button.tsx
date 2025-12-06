import React from 'react';
import { Link } from 'react-router-dom';
import { ButtonProps } from '../../Interfaces/AuthInterface';

const Button: React.FC<ButtonProps> = ({
  text,
  to,
  onClick,
  type = 'button',
  className = '',
}) => {
  const baseClasses =
    'w-full flex justify-center py-2 px-4 border border-transparent rounded-md bg-gray-600 text-white text-sm font-medium hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-400';

  if (to) {
    return (
      <Link to={to} className={`${baseClasses} ${className}`} onClick={onClick}>
        {text}
      </Link>
    );
  }

  return (
    <button
      type={type}
      className={`${baseClasses} ${className}`}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default Button;
