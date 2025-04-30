// DashboardSidebar.tsx
import React, { useState } from 'react';
import {
  ChevronDownIcon,
  ChevronUpIcon,
  MusicalNoteIcon,
  UserGroupIcon,
  UserIcon,
} from '@heroicons/react/24/outline';
import { HomeIcon } from 'lucide-react';

const menuItems = [
  {
    label: 'Dashboard',
    icon: <HomeIcon className='h-5 w-5' />,
    key: 'dashboard',
    href: '/admin/dashboard',
  },
  {
    label: 'Álbumes',
    icon: <MusicalNoteIcon className='h-5 w-5' />,
    key: 'albums',
    subitems: [
      { label: 'Ver detalles', href: '/admin/dashboard/albums-details' },
      { label: 'Agregar', href: '/admin/dashboard/album-form' },
      { label: 'Administrar', href: '/admin/dashboard/albums-management' },
    ],
  },
  {
    label: 'Artistas',
    icon: <UserGroupIcon className='h-5 w-5' />,
    key: 'artists',
    subitems: [
      { label: 'Ver detalles', href: '/admin/dashboard/artists-details' },
      { label: 'Agregar', href: '/admin/dashboard/artist-form' },
      { label: 'Administrar', href: '/admin/dashboard/artists-management' },
    ],
  },
  {
    label: 'Usuarios',
    icon: <UserIcon className='h-5 w-5' />,
    key: 'users',
    subitems: [
      { label: 'Ver detalles', href: '/admin/dashboard/users-data' },
      { label: 'Agregar', href: '/admin/dashboard/user-form' },
      { label: 'Administrar', href: '/admin/dashboard/users-management' },
    ],
  },
];

const DashboardSidebar = () => {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const toggleSubMenu = (menu: string) =>
    setActiveMenu((prev) => (prev === menu ? null : menu));

  return (
    <aside className='hidden md:block bg-gray-200 p-8 pt-40 h-screen max-w-[16rem] border-e border-gray-300'>
      <div className='mb-4 px-4'>
        <h2 className='text-lg font-semibold text-blue-gray-800 pb-6'>Panel</h2>
      </div>

      <ul>
        {menuItems.map(({ label, icon, key, href, subitems }) => (
          <li key={key}>
            {subitems ? (
              <>
                <button
                  onClick={() => toggleSubMenu(key)}
                  className='w-full flex items-center justify-between text-left py-2 px-4 hover:bg-gray-100 rounded-md text-base'
                >
                  <span className='flex items-center gap-2'>
                    {icon}
                    <span>{label}</span>
                  </span>
                  {activeMenu === key ? (
                    <ChevronUpIcon className='h-4 w-4' />
                  ) : (
                    <ChevronDownIcon className='h-4 w-4' />
                  )}
                </button>

                <div
                  className={`pl-8 transition-all duration-300 overflow-hidden ${
                    activeMenu === key ? 'max-h-96 mt-2' : 'max-h-0'
                  }`}
                >
                  <ul className='flex flex-col gap-1 py-1'>
                    {subitems.map(({ label, href }, i) => (
                      <li key={i}>
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
            ) : (
              <a
                href={href}
                className='flex items-center gap-2 py-2 px-4 hover:bg-gray-100 rounded-md text-gray-800 font-medium text-base'
              >
                {icon}
                <span>{label}</span>
              </a>
            )}
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default DashboardSidebar;
