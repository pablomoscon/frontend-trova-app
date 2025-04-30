// DashboardSidebarMobile.tsx
import React, { useState } from 'react';
import {
  XMarkIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  MusicalNoteIcon,
  UserGroupIcon,
  UserIcon,
} from '@heroicons/react/24/outline';
import { HomeIcon } from 'lucide-react';
import { Bars3BottomLeftIcon } from '@heroicons/react/20/solid';

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

const DashboardSidebarMobile = () => {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const toggleSubMenu = (menu: string) =>
    setActiveMenu((prev) => (prev === menu ? null : menu));

  return (
    <>
      <div className='md:hidden pt-35 p-1 bg-gray-200'>
        <button
          onClick={() => setIsOpen((prev) => !prev)}
          aria-label='Toggle Sidebar'
          className='text-gray-700 hover:text-gray-900 focus:outline-none ps-1'
        >
          {isOpen ? (
            <XMarkIcon className='h-6 w-6' />
          ) : (
            <Bars3BottomLeftIcon className='h-6 w-6' />
          )}
        </button>
      </div>

      {isOpen && (
        <aside className='block bg-gray-200 p-2 md:hidden pt-40 border-e border-gray-300'>
          <div className='mb-4 px-4'>
            <h2 className='text-base font-semibold text-blue-gray-800 pb-6'>
              Panel
            </h2>
          </div>

          <ul>
            {menuItems.map(({ label, icon, key, href, subitems }) => (
              <li key={key}>
                {subitems ? (
                  <>
                    <button
                      onClick={() => toggleSubMenu(key)}
                      className='w-full flex items-center justify-between text-left py-2 px-4 hover:bg-gray-100 rounded-md text-sm'
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
                              className='block py-1 text-sm text-gray-600 hover:text-gray-800 hover:underline text-start'
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
                    className='flex items-center gap-2 py-2 px-4 hover:bg-gray-100 rounded-md text-gray-800 font-medium text-sm'
                  >
                    {icon}
                    <span>{label}</span>
                  </a>
                )}
              </li>
            ))}
          </ul>
        </aside>
      )}
    </>
  );
};

export default DashboardSidebarMobile;
