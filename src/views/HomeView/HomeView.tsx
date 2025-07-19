import React from 'react';
import HeroSection from '../../components/homeComponents/HeroSection';
import CatalogueSection from '../../components/homeComponents/CatalogueSection';
import PlatformsSection from '../../components/homeComponents/PlatformsSection';


const HomeView: React.FC = () => (
  <>
    <HeroSection />
    <CatalogueSection />
    <PlatformsSection />
  </>
);

export default HomeView;
