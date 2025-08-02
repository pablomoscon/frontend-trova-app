import React from 'react';
import HeroSection from '../../components/homeComponents/HeroSection';
import CatalogueSection from '../../components/homeComponents/CatalogueSection';
import PlatformsSection from '../../components/homeComponents/PlatformsSection';
import AboutSection from '../../components/homeComponents/AboutSection';
import PlaylistSection from '../../components/homeComponents/PlaylistSection';

const HomeView: React.FC = () => (
  <>
    <HeroSection />
    <AboutSection />
    <CatalogueSection />
    <PlaylistSection />
    <PlatformsSection />
  </>
);

export default HomeView;
