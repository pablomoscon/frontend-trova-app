import React from 'react';
import { Instagram, Facebook, Mail } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className='bg-[#E6E7D9] text-black py-8 px-6 shadow-lg border-t border-gray-400 w-full'>
      <div className='max-w-screen-xl mx-auto flex flex-col items-center space-y-5'>
        {/* Redes sociales */}
        <div className='flex space-x-6'>
          <a
            href='#'
            className='hover:text-black transition transform hover:scale-110'
          >
            <Instagram size={28} />
          </a>
          <a
            href='#'
            className='hover:text-primary transition transform hover:scale-110'
          >
            <Facebook size={28} />
          </a>
          <a
            href='mailto:contacto@trova.com'
            className='hover:text-primary transition transform hover:scale-110'
          >
            <Mail size={28} />
          </a>
        </div>

        {/* Texto */}
        <p className='text-sm md:text-base text-center tracking-wide font-light'>
          &copy; 2024 Trova. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
