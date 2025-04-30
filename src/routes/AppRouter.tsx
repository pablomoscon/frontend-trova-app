import { Routes, Route } from 'react-router-dom';
import PublicRoute from './PublicRoute';
import HomeView from '../views/HomeView/HomeView';
import SignUpView from '../views/SignUpView/SignUpView';
import SignInView from '../views/SignInView/SignInVIew';
import CreateAlbumForm from '../components/AlbumComponents/AlbumForm/CreateAlbumForm';
import CatalogueView from '../views/CatalogueView/CatalogueView';
import ArtistList from '../components/ArtistComponents/ArtistList/ArtistsList';
import ArtistView from '../views/ArtistView/ArtistView';
import ContactView from '../views/ContactView/ContactView';
import DashboardView from '../views/DashboardView/DashboardView';
import DashboardHome from '../components/DashboardComponents/DashboardHome/DashboardHome';
import CreateArtistForm from '../components/ArtistComponents/ArtistForms/CreateArtistForm';
import AlbumManagementTable from '../components/AlbumComponents/AlbumManagementTable/AlbumManagementTable';
import ArtistManagementTable from '../components/ArtistComponents/ArtistManagementTable/ArtistManagementTable';
import UserManagementTable from '../components/UserComponents/UserManagementTable/UserManagementTable';
import UsersData from '../components/UserComponents/UsersData/UsersData';
import useScrollToTop from '../hooks/common/useScrollToTop';
import ArtistDashboardDetails from '../components/ArtistComponents/ArtistAdminDetails/ArtistAdminDetails';
import AlbumAdminDetails from '../components/AlbumComponents/AlbumAdminDetails/AlbumAdminDetails';


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

      <Route path='/admin/dashboard' element={<DashboardView />}>
        <Route index element={<DashboardHome />} />
        <Route path='albums-details' element={<AlbumAdminDetails/>} />
        <Route path='album-form' element={<CreateAlbumForm />} />
        <Route path='albums-management' element={<AlbumManagementTable />} />
        <Route path='artists-details' element={<ArtistDashboardDetails />} />
        <Route path='artist-form' element={<CreateArtistForm />} />
        <Route path='artists-management' element={<ArtistManagementTable />} />
        <Route path='users-management' element={<UserManagementTable />} />
        <Route path='users-data' element={<UsersData />} />
      </Route>
    </Routes>
  );
};

export default AppRouter;
