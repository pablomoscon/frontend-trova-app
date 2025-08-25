import { useState } from 'react';
import { menuItems } from '../../../data/menuItems';
import SidebarSubmenu from './SidebarSubmenu';
import SidebarItem from './SidebarItem';

const DashboardSidebar = () => {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  const toggleSubMenu = (key: string) =>
    setActiveMenu((prev) => (prev === key ? null : key));

  return (
    <aside className='hidden md:block'>
      <div className='mb-4 px-4'>
        <h2 className='text-lg font-semibold text-gray-800 pb-6'>Panel</h2>
      </div>

      <ul>
        {menuItems.map(({ label, icon, key, href, subitems }) => (
          <li key={key}>
            {subitems ? (
              <SidebarSubmenu
                label={label}
                icon={icon}
                subitems={subitems}
                isOpen={activeMenu === key}
                onToggle={() => toggleSubMenu(key)}
              />
            ) : (
              <SidebarItem label={label} icon={icon} href={href!} />
            )}
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default DashboardSidebar;
