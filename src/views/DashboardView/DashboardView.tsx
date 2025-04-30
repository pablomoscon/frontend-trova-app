import { Outlet } from 'react-router-dom'; 
import DashboardSidebar from '../../components/DashboardComponents/DashboardSidebar/DashboardSidebar';
import DashboardSidebarMobile from '../../components/DashboardComponents/DashboardSidebarMobile/DashboardSidebarMobile';




const DashboardView: React.FC = () => {


  return (
    <div className='flex h-screen text-gray-800'>
      <DashboardSidebar />
      <DashboardSidebarMobile />

      <div className='flex flex-col md:flex-row min-h-screen w-full overflow-x-hidden bg-[#E5E6E4]'>
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardView;
