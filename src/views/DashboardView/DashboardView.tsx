import { Outlet } from 'react-router-dom';
import DashboardSidebar from '../../components/DashboardComponents/DashboardSidebar/DashboardSidebar';
import DashboardSidebarMobile from '../../components/DashboardComponents/DashboardSidebarMobile/DashboardSidebarMobile';

const DashboardView: React.FC = () => {
  return (
    <div className='flex flex-col min-h-screen bg-[#E5E6E4] text-gray-800'>
      <main className='flex flex-1'>
        {/* Desktop sidebar */}
        <div className='hidden md:block min-h-screen bg-gray-200 p-8 pt-40 min-h-screen max-w-[16rem] border-e border-gray-300'>
          <DashboardSidebar />
        </div>

        {/* Mobile sidebar */}
        <div className='block md:hidden bg-gray-200 p-4 pt-40 min-h-screen max-w-[16rem] border-e border-gray-300'>
          <DashboardSidebarMobile />
        </div>

        {/* Main content */}
        <div className='flex flex-col w-full'>
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default DashboardView;
