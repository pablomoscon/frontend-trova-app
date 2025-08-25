import React from 'react';
import { SidebarItemProps } from '../../../Interfaces/DashboardInterface';

const SidebarItem: React.FC<SidebarItemProps> = ({ label, icon, href }) => {
  const Icon = icon;
  
  return (
    <a
      href={href}
      className='flex items-center gap-2 py-2 px-4 hover:bg-gray-100 rounded-md text-gray-800 font-medium text-base'
    >
      <Icon className='h-5 w-5' />
      <span>{label}</span>
    </a>
  );
  };

export default SidebarItem;
