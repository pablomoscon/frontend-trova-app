import React from 'react';
import AlbumGrid from '../../AlbumComponents/AlbumsGrid/AlbumGrid';
import { Album } from '../../../Interfaces/AlbumInterface';

interface Props {
  artistName: string;
  albums: Album[];
  onAlbumClick: (album: Album) => void;
}

const ArtistAlbumsSection: React.FC<Props> = ({
  artistName,
  albums,
  onAlbumClick,
}) => (
  <div className='mx-auto max-w-5xl px-8 py-16'>
    <h2 className='text-2xl font-bold tracking-tight text-gray-900 py-10'>
      Álbumes de {artistName}
    </h2>
    <AlbumGrid albums={albums} onClick={onAlbumClick} />
  </div>
);

export default ArtistAlbumsSection;
