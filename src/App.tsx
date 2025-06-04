import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import Navbar from './components/navbarComponents/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import AppRouter from './routes/AppRouter';

const App: React.FC = () => {
  return (
    <Router>
      <div className='app-container'>
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
