import { Routes, Route } from 'react-router-dom';
import PublicRoute from './PublicRoute';
import HomeView from '../views/HomeView/HomeView';
import SignUpView from '../views/SignUpView/SignUpView';
import SignInView from '../views/SignInView/SignInVIew';
import CatalogueView from '../views/CatalogueView/CatalogueView';
import ArtistList from '../components/artistComponents/ArtistList/ArtistsList';
import ArtistView from '../views/ArtistView/ArtistView';
import ContactView from '../views/ContactView/ContactView';
import DashboardView from '../views/DashboardView/DashboardView';
import DashboardHome from '../components/dashboardComponents/DashboardHome/DashboardHome';
import AlbumManagementTable from '../components/albumComponents/AlbumManagementTable/AlbumManagementTable';
import ArtistManagementTable from '../components/artistComponents/ArtistManagementTable/ArtistManagementTable';
import UserManagementTable from '../components/userComponents/UserManagementTable/UserManagementTable';
import useScrollToTop from '../hooks/shared/useScrollToTop';
import ArtistDashboardDetails from '../components/artistComponents/ArtistDashboardDetails/ArtistDashboardDetails';
import AlbumAdminDetails from '../components/albumComponents/AlbumAdminDetails/AlbumAdminDetails';
import CreateAlbum from '../components/albumComponents/CreateAlbum/CreateAlbum';
import CreateArtist from '../components/artistComponents/CreateArtist/CreateArtist';
import AdminUserProfile from '../components/adminProfileComponents/AdminUserProfile/AdminUserProfile';
import UserDashboardDetails from '../components/userComponents/UserDashboardDetails/UserDashboardDetails';


const AppRouter: React.FC = () => {
  useScrollToTop();
  return (
    <Routes>
      <Route path='/' element={<HomeView />} />
      <Route
        path='/sign-up'
        element={
          <PublicRoute>
            <SignUpView />
          </PublicRoute>
        }
      />
      <Route
        path='/sign-in'
        element={
          <PublicRoute>
            <SignInView />
          </PublicRoute>
        }
      />
      <Route path='/catalogue' element={<CatalogueView />} />
      <Route path='/contact' element={<ContactView />} />
      <Route path='/artist' element={<ArtistList />} />
      <Route path='/artist/:id' element={<ArtistView />} />

      <Route path='/admin/admin-profile' element={<AdminUserProfile />} />
      <Route path='/admin/dashboard' element={<DashboardView />}>
        <Route index element={<DashboardHome />} />
        <Route path='albums-details' element={<AlbumAdminDetails />} />
        <Route path='album-form' element={<CreateAlbum />} />
        <Route path='albums-management' element={<AlbumManagementTable />} />
        <Route path='artists-details' element={<ArtistDashboardDetails />} />
        <Route path='artist-form' element={<CreateArtist />} />
        <Route path='artists-management' element={<ArtistManagementTable />} />
        <Route path='users-management' element={<UserManagementTable />} />
        <Route path='users-data' element={<UserDashboardDetails/>} />
      </Route>
    </Routes>
  );
};

export default AppRouter;
