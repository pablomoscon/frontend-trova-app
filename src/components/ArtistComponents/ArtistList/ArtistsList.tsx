import { Link } from 'react-router-dom';
import Spinner from '../../shared/Spinner';
import { useFetchArtists } from '../../../hooks/artist/useFetchArtists';
import { useState } from 'react';

const ArtistList: React.FC = () => {

  const [page, setPage] = useState(0);
  const size = 15;

  const { artists, loading, error } = useFetchArtists(
    page,
    size
  );

  if (loading)
    return (
      <div className='flex justify-center items-center h-screen'>
        <Spinner />
      </div>
    );
  if (error) return <p className='text-center mt-20 text-red-500'>{error}</p>;

  return (
    <div className='bg-[#E5E6E4] py-40'>
      <div className='mx-auto max-w-2xl px-4 py-40 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8 text-center'>
        <h2 className='sr-only'>Artists</h2>

        <div className='grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8 text-center'>
          {artists.map((artist) => (
            <Link key={artist.id} to={`/artist/${artist.id}`} className='group'>
              <img
                alt={artist.name}
                src={artist.photo}
                className='aspect-square w-full bg-gray-200 object-cover group-hover:opacity-75 xl:aspect-7/8 rounded-full items-center text-center'
              />
              <h3 className='mt-4 text-sm text-gray-700'>{artist.name}</h3>
              <p className='mt-1 text-sm text-gray-500'>{artist.nationality}</p>
            </Link>
          ))}
        </div>

        {/* Opcional: controles simples de paginación */}
        <div className='flex justify-center mt-8 space-x-4'>
          <button
            disabled={page === 0}
            onClick={() => setPage((p) => Math.max(p - 1, 0))}
            className='px-4 py-2 bg-gray-300 rounded disabled:opacity-50'
          >
            Anterior
          </button>
          <button
            onClick={() => setPage((p) => p + 1)}
            className='px-4 py-2 bg-gray-300 rounded'
          >
            Siguiente
          </button>
        </div>
      </div>
    </div>
  );
};

export default ArtistList;
