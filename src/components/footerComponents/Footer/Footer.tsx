import React from 'react';
import SocialLinks from './SocialLinks';
import FooterText from './FooterText';

const Footer: React.FC = () => {
  return (
    <footer className='bg-[#E6E7D9] text-black w-full border-t border-gray-400 shadow-lg py-8 px-6'>
      <div className='max-w-screen-xl mx-auto flex flex-col items-center gap-5'>
        <SocialLinks />
        <FooterText />
      </div>
    </footer>
  );
};

export default Footer;
