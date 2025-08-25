import { Routes, Route, useLocation } from 'react-router-dom';
import PublicRoute from './PublicRoute';
import HomeView from '../views/HomeView/HomeView';
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
import SignUpForm from '../components/userComponents/CreateUserForm/CreateUserForm';
import SearchResultsView from '../views/SearchResultsView/SearchResultsView';
import SignInView from '../views/SignInView/SignInView';

const AppRouter: React.FC = () => {
  const location = useLocation();

  useScroll(null, {
    deps: [location.pathname],
    behavior: 'auto',
  });

  useClearSessionStorageOnRouteChange();

  return (
    <Routes>
      <Route path='/' element={<HomeView />} />
      <Route
        path='/sign-in'
        element={
          <PublicRoute>
            <SignInView />
          </PublicRoute>
        }
      />
      <Route path='/catalogo' element={<CatalogueView />} />
      <Route path='/contacto' element={<ContactView />} />
      <Route path='/artistas' element={<ArtistList />} />
      <Route path='/artistas/:id' element={<ArtistView />} />
      <Route path='/busqueda' element={<SearchResultsView />} />

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
        <Route path='user-form' element={<SignUpForm />} />
        <Route path='users-data' element={<DashboardUserDetails />} />
      </Route>
    </Routes>
  );
};

export default AppRouter;
