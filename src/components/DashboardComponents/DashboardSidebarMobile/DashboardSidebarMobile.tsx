import { useState } from 'react';
import {
  XMarkIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from '@heroicons/react/24/outline';
import { Bars3BottomLeftIcon } from '@heroicons/react/20/solid';
import { menuItems } from '../../../data/menuItems';

const DashboardSidebarMobile: React.FC = () => {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const toggleSubMenu = (menuKey: string) => {
    setActiveMenu((prev) => (prev === menuKey ? null : menuKey));
  };

  return (
    <>
      <div
        className={`md:hidden flex ${isOpen ? 'justify-end' : 'justify-start'}`}
      >
        <button
          onClick={() => setIsOpen((prev) => !prev)}
          aria-label='Toggle Sidebar'
          className='text-gray-700 hover:text-gray-900 focus:outline-none'
        >
          {isOpen ? (
            <XMarkIcon className='h-6 w-6 mb-5' />
          ) : (
            <Bars3BottomLeftIcon className='h-6 w-6' />
          )}
        </button>
      </div>

      {isOpen && (
        <aside className='block bg-gray-200 '>
          <ul className='bg-gray-200'>
            {menuItems.map(({ label, icon: Icon, key, href, subitems }) => (
              <li key={key}>
                {subitems ? (
                  <>
                    <button
                      onClick={() => toggleSubMenu(key)}
                      className='w-full flex items-start justify-between text-left py-2 px-4 hover:bg-gray-100 rounded-md text-sm'
                    >
                      <span className='flex items-center gap-2 hover:bg-gray-100 '>
                        <Icon className='h-5 w-5' />
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
                    <Icon className='h-5 w-5' />
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
