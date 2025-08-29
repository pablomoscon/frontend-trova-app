import './App.css';
import { BrowserRouter as Router, useLocation } from 'react-router-dom';
import Navbar from './components/NavbarComponents/Navbar/Navbar';
import Footer from './components/FooterComponents/Footer/Footer';
import AppRouter from './routes/AppRouter';
import { useScroll } from './hooks/shared/useScroll';

const ScrollManager: React.FC = () => {
  const { pathname } = useLocation();

  useScroll(null, { deps: [pathname], scrollOnMount: true, behavior: 'auto' });

  return null;
};

const App: React.FC = () => {
  return (
    <Router>
      <ScrollManager />
      <div className='app-container min-h-screen w-full flex flex-col bg-[#E6E7D9] text-gray-800'>
        <Navbar />
        <main>
          <AppRouter />
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
