import React from 'react';
import { ArtistSectionProps } from '../../../Interfaces/DashboardInterface';
import AlbumDetailsList from './AlbumDetailsList';

const AlbumsByArtistSection: React.FC<ArtistSectionProps> = ({
  artist,
  onAlbumSelect,
  onImageOpen,
}) => {
  return (
    <section className='mb-16'>
      <h2 className='text-lg font-semibold text-gray-800 mb-4 text-center border-b pb-2'>
        {artist.name}
      </h2>
      <AlbumDetailsList
        albums={artist.albums || []}
        onOpenDetails={onAlbumSelect}
        onOpenImage={onImageOpen}
      />
    </section>
  );
};

export default AlbumsByArtistSection;
