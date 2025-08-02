import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import Navbar from './components/navbarComponents/Navbar/Navbar';
import Footer from './components/footerComponents/Footer/Footer';
import AppRouter from './routes/AppRouter';

const App: React.FC = () => {
  return (
    <Router>
      <div className='app-container  min-h-screen w-full flex flex-col bg-[#E6E7D9] text-gray-800'>
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
