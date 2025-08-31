import { useState } from 'react';
import { ArtistCardProps } from '../../../Interfaces/ArtistInterface';
import { Link } from 'react-router-dom';

const ArtistCard: React.FC<ArtistCardProps> = ({ artist }) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <Link
      to={`/artistas/${artist.id}`}
      className='group flex flex-col items-center text-center hover:scale-[1.02] transition-transform duration-300'
    >
      <div className='relative w-48 h-48 rounded-full overflow-hidden shadow-lg border border-gray-200'>
        {/* Placeholder circular */}
        <img
          src='/assets/trova_logo_placeholder.webp'
          alt='Placeholder'
          className={`absolute inset-0 w-full h-full object-cover rounded-full transition-opacity duration-500 ${
            loaded ? 'opacity-0' : 'opacity-100'
          }`}
        />

        {/* Imagen real */}
        <img
          src={artist.photo}
          alt={artist.name}
          loading='lazy'
          className={`object-cover w-full h-full rounded-full group-hover:opacity-90 transition-opacity duration-500 ${
            loaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={() => setLoaded(true)}
        />
      </div>
      <h3 className='mt-4 text-lg font-medium text-gray-800 group-hover:text-black transition-colors duration-200'>
        {artist.name}
      </h3>
      <span className='text-sm text-gray-500'>{artist.nationality}</span>
    </Link>
  );
};

export default ArtistCard;
