import React from 'react';
import HeroSection from '../../components/HomeComponents/HeroSection';
import CatalogueSection from '../../components/HomeComponents/CatalogueSection';
import PlatformsSection from '../../components/HomeComponents/PlatformsSection';
import AboutSection from '../../components/HomeComponents/AboutSection';
import PlaylistSection from '../../components/HomeComponents/PlaylistSection';

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
