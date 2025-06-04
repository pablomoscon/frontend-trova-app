import React from 'react';
import { createArtist } from '../../../services/artistService';
import Spinner from '../../shared/Spinner';
import LoadingDots from '../../shared/LoadingDots';
import ArtistFormFields from '../ArtistForms/ArtistFormFields';
import { useCreateArtist } from '../../../hooks/artist/useCreateArtist';
import { useFetchArtists } from '../../../hooks/artist/useFetchArtists';

const CreateArtist: React.FC = () => {
  const { loading, error } = useFetchArtists();
  const {
    newArtistFormData,
    setNewArtistFormData,
    handleAddArtist,
    createError,
    isLoading,
  } = useCreateArtist(createArtist, () => {});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name } = e.target;

    if (name === 'photo' && e.target instanceof HTMLInputElement) {
      const file = e.target.files?.[0];
      setNewArtistFormData((prev) => ({
        ...prev,
        photo: file || undefined,
      }));
    } else {
      const value = e.target.value;
      setNewArtistFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleAddArtist();
  };

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className='min-w-full min-h-screen flex items-center justify-center bg-gray-100 py-20'>
      <div className='w-full max-w-2xl p-6 bg-white shadow-md rounded-lg border border-gray-300 mt-28 sm:mx-10 md:mx-6 lg:mx-8'>
        <h2 className='text-2xl font-bold mb-6 text-gray-800'>
          Crear nuevo artista
        </h2>
        <form onSubmit={handleSubmit}>
          <ArtistFormFields
            formData={newArtistFormData}
            handleChange={handleChange}
          />
          {createError && (
            <p className='text-red-500 text-sm mt-2'>{createError}</p>
          )}
          <div className='flex justify-center gap-4 my-10'>
            <button
              type='submit'
              className='px-6 py-2 rounded-md bg-indigo-600 text-white hover:bg-indigo-500'
              disabled={isLoading}
            >
              {isLoading ? 'Guardando ' : 'Guardar artista'}
              {isLoading && <LoadingDots />}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateArtist;
