import React from 'react';
import FormArtistFields from './FormArtistFields';
import { createArtist } from '../../../services/artistService';
import Spinner from '../../Spinner/Spinner';
import { useArtistFetch } from '../../../hooks/artist/useArtistFetch';
import { useArtistCreate } from '../../../hooks/artist/useArtistCreate';

const CreateArtistForm: React.FC = () => {
  const { loading, error } = useArtistFetch(false);
  const {
    newArtistFormData,
    setNewArtistFormData,
    handleAddArtist,
    createError,
  } = useArtistCreate(createArtist, () => {});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setNewArtistFormData((prev) => ({ ...prev, [name]: value }));
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
          <FormArtistFields
            formData={newArtistFormData}
            handleChange={handleChange}
          />
          {createError && (
            <p className='text-red-500 text-sm mt-2'>{createError}</p>
          )}
          <div className='flex justify-end gap-4 mt-6'>
            <button
              type='submit'
              className='px-6 py-2 rounded-md bg-indigo-600 text-white hover:bg-indigo-500'
            >
              Guardar artista
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateArtistForm;
