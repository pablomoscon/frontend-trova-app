import {  DashboardSubMenuProps } from '../../../Interfaces/DashboardInterface';

const DashboardSubMenu: React.FC<DashboardSubMenuProps> = ({
  menuName,
  links,
  activeMenu,
  toggleSubMenu,
}) => (
  <li>
    <button
      className='block py-2 px-4 rounded-lg hover:bg-gray-100 w-full text-left'
      onClick={() => toggleSubMenu(menuName)}
    >
      {menuName.charAt(0).toUpperCase() + menuName.slice(1)}
    </button>
    {activeMenu === menuName && (
      <ul className='pl-4'>
        {links.map((link, index) => (
          <li key={index}>
            <a
              href={link.href}
              className='block py-3 text-start text-sm font-light hover:bg-gray-200 '
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    )}
  </li>
);

export default DashboardSubMenu;