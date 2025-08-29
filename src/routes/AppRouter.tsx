import { Routes, Route, useLocation } from 'react-router-dom';
import PublicRoute from './PublicRoute';
import HomeView from '../views/HomeView/HomeView';
import CatalogueView from '../views/CatalogueView/CatalogueView';
import ArtistList from '../components/ArtistComponents/ArtistList/ArtistsList';
import ArtistView from '../views/ArtistView/ArtistView';
import ContactView from '../views/ContactView/ContactView';
import DashboardView from '../views/DashboardView/DashboardView';
import DashboardHome from '../components/DashboardComponents/DashboardHome/DashboardHome';
import UserManagementTable from '../components/DashboardComponents/UserManagementTable/UserManagementTable';
import CreateAlbum from '../components/AlbumComponents/CreateAlbum/CreateAlbum';
import CreateArtist from '../components/ArtistComponents/CreateArtist/CreateArtist';
import AdminUserProfile from '../components/AdminProfileComponents/AdminUserProfile/AdminUserProfile';
import DashboardUserDetails from '../components/DashboardComponents/DashboardUserDetails/DashboardUserDetails';
import DashboardAlbumDetails from '../components/DashboardComponents/DashboardAlbumDetails/DashboardAlbumDetails';
import AlbumManagementTable from '../components/DashboardComponents/AlbumManagementTable/AlbumManagementTable';
import ArtistManagementTable from '../components/DashboardComponents/ArtistManagementTable/ArtistManagementTable';
import DashboardArtistDetails from '../components/DashboardComponents/DashboardArtistDetails/DashboardArtistDetails';
import AdminRoute from './AdminRoute';
import { useClearSessionStorageOnRouteChange } from '../hooks/shared/useClearPaginationOnRouteChange';
import SignUpForm from '../components/UserComponents/CreateUserForm/CreateUserForm';
import SearchResultsView from '../views/SearchResultsView/SearchResultsView';
import SignInView from '../views/SignInView/SignInView';

const AppRouter: React.FC = () => {


  useClearSessionStorageOnRouteChange();
  
  return (
    <Routes>
      {' '}
      <Route path='/' element={<HomeView />} />{' '}
      <Route
        path='/sign-in'
        element={
          <PublicRoute>
            {' '}
            <SignInView />{' '}
          </PublicRoute>
        }
      />{' '}
      <Route path='/catalogo' element={<CatalogueView />} />{' '}
      <Route path='/contacto' element={<ContactView />} />{' '}
      <Route path='/artistas' element={<ArtistList />} />{' '}
      <Route path='/artistas/:id' element={<ArtistView />} />{' '}
      <Route path='/busqueda' element={<SearchResultsView />} />{' '}
      <Route
        path='/admin/admin-profile'
        element={
          <AdminRoute>
            {' '}
            <AdminUserProfile />{' '}
          </AdminRoute>
        }
      />{' '}
      <Route
        path='/admin/dashboard'
        element={
          <AdminRoute>
            {' '}
            <DashboardView />{' '}
          </AdminRoute>
        }
      >
        {' '}
        <Route index element={<DashboardHome />} />{' '}
        <Route path='albums-details' element={<DashboardAlbumDetails />} />{' '}
        <Route path='album-form' element={<CreateAlbum />} />{' '}
        <Route path='albums-management' element={<AlbumManagementTable />} />{' '}
        <Route path='artists-details' element={<DashboardArtistDetails />} />{' '}
        <Route path='artist-form' element={<CreateArtist />} />{' '}
        <Route path='artists-management' element={<ArtistManagementTable />} />{' '}
        <Route path='users-management' element={<UserManagementTable />} />{' '}
        <Route path='user-form' element={<SignUpForm />} />{' '}
        <Route path='users-data' element={<DashboardUserDetails />} />{' '}
      </Route>{' '}
    </Routes>
  );
};
export default AppRouter;
