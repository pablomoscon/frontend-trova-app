import { Routes, Route, useLocation } from 'react-router-dom';
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
import UserManagementTable from '../components/dashboardComponents/UserManagementTable/UserManagementTable';
import CreateAlbum from '../components/albumComponents/CreateAlbum/CreateAlbum';
import CreateArtist from '../components/artistComponents/CreateArtist/CreateArtist';
import AdminUserProfile from '../components/adminProfileComponents/AdminUserProfile/AdminUserProfile';
import DashboardUserDetails from '../components/dashboardComponents/DashboardUserDetails/DashboardUserDetails';
import DashboardAlbumDetails from '../components/dashboardComponents/DashboardAlbumDetails/DashboardAlbumDetails';
import AlbumManagementTable from '../components/dashboardComponents/AlbumManagementTable/AlbumManagementTable';
import ArtistManagementTable from '../components/dashboardComponents/ArtistManagementTable/ArtistManagementTable';
import DashboardArtistDetails from '../components/dashboardComponents/DashboardArtistDetails/DashboardArtistDetails';
import AdminRoute from './AdminRoute';
import { useScroll } from '../hooks/shared/useScroll';
import { useClearSessionStorageOnRouteChange } from '../hooks/shared/useClearPaginationOnRouteChange';

const AppRouter: React.FC = () => {
  const location = useLocation();
  useScroll(undefined, { deps: [location.pathname], behavior: 'auto' });
  useClearSessionStorageOnRouteChange();

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

      <Route
        path='/admin/admin-profile'
        element={
          <AdminRoute>
            <AdminUserProfile />
          </AdminRoute>
        }
      />

      <Route
        path='/admin/dashboard'
        element={
          <AdminRoute>
            <DashboardView />
          </AdminRoute>
        }
      >
        <Route index element={<DashboardHome />} />
        <Route path='albums-details' element={<DashboardAlbumDetails />} />
        <Route path='album-form' element={<CreateAlbum />} />
        <Route path='albums-management' element={<AlbumManagementTable />} />
        <Route path='artists-details' element={<DashboardArtistDetails />} />
        <Route path='artist-form' element={<CreateArtist />} />
        <Route path='artists-management' element={<ArtistManagementTable />} />
        <Route path='users-management' element={<UserManagementTable />} />
        <Route path='users-data' element={<DashboardUserDetails />} />
      </Route>
    </Routes>
  );
};

export default AppRouter;
