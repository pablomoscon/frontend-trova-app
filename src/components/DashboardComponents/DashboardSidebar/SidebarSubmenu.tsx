import React from 'react';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline';
import { SidebarSubmenuProps } from '../../../Interfaces/DashboardInterface';

const SidebarSubmenu: React.FC<SidebarSubmenuProps> = ({
  label,
  icon,
  subitems,
  isOpen,
  onToggle,
}) => {
  const Icon = icon;

  return (
    <>
      <button
        onClick={onToggle}
        className='w-full flex items-center justify-between text-left py-2 px-4 hover:bg-gray-100 rounded-md text-base'
      >
        <span className='flex items-center gap-2'>
          <Icon className='h-5 w-5' />
          <span>{label}</span>
        </span>
        {isOpen ? (
          <ChevronUpIcon className='h-4 w-4' />
        ) : (
          <ChevronDownIcon className='h-4 w-4' />
        )}
      </button>

      <div
        className={`pl-8 transition-all duration-300 overflow-hidden ${isOpen ? 'max-h-96 mt-2' : 'max-h-0'
          }`}
      >
        <ul className='flex flex-col gap-1 py-1'>
          {subitems.map(({ label, href }) => (
            <li key={href}>
              <a
                href={href}
                className='block py-2 text-base text-start text-gray-600 hover:text-gray-800 hover:underline'
              >
                {label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </>
  )
};

export default SidebarSubmenu;
