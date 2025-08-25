import React from 'react';
import Spinner from '../../shared/Spinner';
import NewArtistModal from '../../artistComponents/ArtistForms/NewArtistModal';
import { createNewArtist } from '../../../utils/createNewArtistUtils';
import { ArtistFormData } from '../../../Interfaces/ArtistInterface';
import LoadingDots from '../../shared/LoadingDots';
import AlbumFormFields from '../AlbumFormFields/AlbumFormFields';
import { useCreateAlbum } from '../../../hooks/album/useCreateAlbum';
import { useCreateArtist } from '../../../hooks/artist/useCreateArtist';
import { useFetchArtists } from '../../../hooks/artist/useFetchArtists';

const CreateAlbum: React.FC = () => {
  const {
    formData,
    handleChange,
    songsInput,
    setSongsInput,
    resetForm,
    handleFileChange,
    imagePreview,
    handleSubmit,
    isLoading,
  } = useCreateAlbum();

  const {
    artists,
    setArtists,
    isLoading: isLoadingArtist,
  } = useFetchArtists(0, 9999);

  const {
    showArtistModal,
    setShowArtistModal,
    newArtistFormData,
    setNewArtistFormData,
    handleAddArtist,
  } = useCreateArtist(async (artistData: ArtistFormData) => {
    const newArtist = await createNewArtist(artistData);
    setArtists((prev) => [...prev, newArtist]);
    return newArtist;
  }, handleChange);

  if (isLoadingArtist) {
    return (
        <Spinner />
    );
  }

  return (
    <div className='bg-[#E5E6E4] min-h-screen w-full mt-20 overflow-x-hidden py-8 px-4 sm:px-6 lg:px-20'>
      <div className='mx-auto w-full max-w-5xl'>
        <form onSubmit={handleSubmit} className='py-6 sm:py-10'>
          <div className='border border-gray-300 bg-white p-4 sm:p-6 rounded-xl shadow-sm pb-10'>
            <h2 className='text-lg sm:text-2xl font-semibold text-gray-900 py-4 sm:py-10'>
            Datos del Album
            </h2>

            <AlbumFormFields
              formData={formData}
              songsInput={songsInput}
              setSongsInput={setSongsInput}
              handleChange={handleChange}
              artists={artists}
              setShowArtistModal={setShowArtistModal}
              isEditMode={false}
              handleFileChange={handleFileChange}
              imagePreview={imagePreview}
            />

            <div className='mt-6 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6'>
              <button
                type='button'
                onClick={resetForm}
                className='text-sm sm:text-base font-semibold text-gray-900 w-full sm:w-auto cursor-pointer sm:py-4'
              >
                Cancelar
              </button>
              <button
                type='submit'
                className='bg-gray-700 hover:bg-gray-600 text-white text-sm sm:text-base px-5 py-2 sm:px-6 sm:py-2.5 rounded-md transition disabled:opacity-60 disabled:cursor-not-allowed w-auto sm:w-auto'
                disabled={isLoading}
              >
                {isLoading ? 'Guardando' : 'Guardar álbum'}
                {isLoading && <LoadingDots />}
              </button>
            </div>
          </div>
        </form>
      </div>

      {showArtistModal && (
        <NewArtistModal
          formData={newArtistFormData}
          setFormData={setNewArtistFormData}
          onClose={() => setShowArtistModal(false)}
          onSave={handleAddArtist}
        />
      )}
    </div>
  );
};

export default CreateAlbum;
