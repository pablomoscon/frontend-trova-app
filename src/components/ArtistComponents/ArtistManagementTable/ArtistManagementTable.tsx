import React, { useState } from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { PencilIcon, TrashIcon } from '@heroicons/react/20/solid';
import Spinner from '../../Spinner/Spinner';
import { useArtistFetch } from '../../../hooks/artist/useArtistFetch';
import { useArtistDelete } from '../../../hooks/artist/useArtistDelete';

const ArtistManagementTable: React.FC = () => {
  const { artists, loading, error, reloadArtists } = useArtistFetch(false);
  const { handleDelete, deleting, deleteError } =
    useArtistDelete(reloadArtists);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredArtists = artists.filter((artist) =>
    artist.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <Spinner />;
  if (error) return <p className='text-red-500 text-center mt-4'>{error}</p>;

  return (
    <div className='min-h-screen bg-[#E5E6E4] flex-1'>
      <div className='flex flex-col w-full mt-10 px-4 sm:px-8 md:px-16 py-30'>
        <h2 className='text-xl font-semibold mb-4 text-center'>Artists</h2>

        {/* Search */}
        <div className='w-full md:w-96 mb-4'>
          <div className='relative'>
            <input
              type='text'
              placeholder='Search Artists'
              className='w-full p-2 pr-10 rounded-md border border-gray-300 focus:outline-none'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className='absolute top-2 right-2'>
              <MagnifyingGlassIcon className='h-5 w-5 text-gray-500' />
            </div>
          </div>
        </div>

        {/* Table */}
        <div className='overflow-x-auto w-full'>
          <table className='min-w-full table-auto text-left border border-gray-300'>
            <thead className='bg-gray-200'>
              <tr className='text-center'>
                <th className='px-4 py-2 text-sm font-semibold text-gray-700'>
                  Nombre
                </th>
                <th className='px-4 py-2 text-sm font-semibold text-gray-700'>
                  País
                </th>
                <th className='px-4 py-2 text-sm font-semibold text-gray-700'>
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredArtists.map((artist) => (
                <tr
                  key={artist.id}
                  className='border-b border-gray-300 text-center'
                >
                  <td className='px-4 py-2 text-sm text-gray-700 flex justify-center items-center'>
                    {artist.name}
                  </td>
                  <td className='px-4 py-2 text-sm text-gray-700'>
                    <div className='flex justify-center items-center'>
                      {artist.nationality}
                    </div>
                  </td>
                  <td className='px-4 py-2 text-sm'>
                    <div className='flex justify-center items-center space-x-4'>
                      <button
                        className='text-sm text-gray-800 hover:bg-gray-100 px-3 py-2 rounded-md'
                        aria-label='Editar artista'
                      >
                        <PencilIcon className='w-5 h-5 text-gray-800' />
                      </button>
                      <button
                        onClick={() => {
                          if (artist.id !== undefined) {
                            handleDelete(artist.id);
                          }
                        }}
                        className='text-sm text-gray-600 hover:bg-gray-100 px-3 py-2 rounded-md disabled:opacity-50'
                        aria-label='Eliminar artista'
                        disabled={deleting}
                      >
                        <TrashIcon className='w-5 h-5 text-gray-600' />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredArtists.length === 0 && !loading && (
                <tr>
                  <td
                    colSpan={4}
                    className='px-4 py-4 text-sm text-gray-500 text-center'
                  >
                    No artists found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          {deleteError && (
            <p className='text-red-500 text-center mt-2'>{deleteError}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ArtistManagementTable;
