import React from 'react';
import { createArtist } from '../../../services/artistService';
import Spinner from '../../shared/Spinner';
import LoadingDots from '../../shared/LoadingDots';
import ArtistFormFields from '../ArtistForms/ArtistFormFields';
import { useCreateArtist } from '../../../hooks/artist/useCreateArtist';
import { useFetchArtists } from '../../../hooks/artist/useFetchArtists';

const CreateArtist: React.FC = () => {
  const { isLoading, error } = useFetchArtists(0, 100);

  const {
    newArtistFormData,
    setNewArtistFormData,
    handleAddArtist,
    createError,
    isLoading: loading,
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
    return (
      <div className='min-h-screen flex justify-center items-center bg-[#E5E6E4] py-12 mt-20'>
        <Spinner />
      </div>
    );
  }

  if (error) {
    return <p className='text-center text-red-500 mt-20'>{error}</p>;
  }

  return (
    <div className='bg-[#E5E6E4] min-h-screen w-full mt-20 overflow-x-hidden py-8 px-4 sm:px-6 lg:px-20'>
      <div className='mx-auto w-full max-w-5xl'>
        <form onSubmit={handleSubmit} className='py-6 sm:py-10'>
          <div className='border border-gray-900/10 p-4 sm:p-6 bg-[#FEFEFE] rounded-xl py-8 sm:py-16'>
            <h2 className='text-lg sm:text-xl md:text-2xl font-semibold leading-7 text-gray-900 mb-4 sm:mb-6'>
              Crear Artista
            </h2>

            <ArtistFormFields
              formData={newArtistFormData}
              handleChange={handleChange}
            />

            {createError && (
              <p className='text-red-500 text-sm mt-4 text-center'>
                {createError}
              </p>
            )}

            <div className='mt-4 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-y-3 sm:gap-x-6'>
              <button
                type='button'
                onClick={() =>
                  setNewArtistFormData({
                    name: '',
                    nationality: '',
                    details: '',
                    photo: undefined,
                  })
                }
                className='text-sm font-semibold text-gray-900 w-[60%] sm:w-auto text-center'
              >
                Cancelar
              </button>
              <button
                type='submit'
                className='bg-gray-500 text-white text-sm md:text-base px-3 sm:px-4 py-2 rounded-md hover:bg-gray-400 transition w-[60%] sm:w-auto text-center'
                disabled={isLoading}
              >
                {isLoading ? 'Guardando ' : 'Guardar artista'}
                {isLoading && <LoadingDots />}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateArtist;
