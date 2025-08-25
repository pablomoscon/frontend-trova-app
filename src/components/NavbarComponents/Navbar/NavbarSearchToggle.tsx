import React from 'react';
import { MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/24/outline';

const NavbarSearchToggle: React.FC<{
  isOpen: boolean;
  onToggle: () => void;
}> = ({ isOpen, onToggle }) => {
  return (
    <button
      aria-label={isOpen ? 'Cerrar búsqueda' : 'Abrir búsqueda'}
      onClick={onToggle}
      className='p-2 rounded-md transition'
    >
      {isOpen ? (
        <XMarkIcon className='h-6 w-6 text-gray-700' />
      ) : (
        <MagnifyingGlassIcon className='h-6 w-6 text-gray-700' />
      )}
    </button>
  );
};

export default NavbarSearchToggle;
