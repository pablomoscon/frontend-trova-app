import Spinner from '../../shared/Spinner';
import NewArtistModal from '../../artistComponents/ArtistForms/NewArtistModal';
import { createNewArtist } from '../../../utils/createNewArtist';
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

  const { artists, setArtists, loading } = useFetchArtists();

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

  if (loading) {
    return (
      <div className='min-h-screen flex justify-center items-center bg-[#E5E6E4] py-12 mt-20'>
        <Spinner />
      </div>
    );
  }

  return (
    <div className='bg-[#E5E6E4] min-h-screen w-full mt-20 overflow-x-hidden py-10 px-4 sm:px-6 lg:px-20'>
      <div className='mx-auto max-w-full px-6 lg:px-8'>
        <form onSubmit={handleSubmit} className='py-10'>
          <div className='border border-gray-900/10 p-6 bg-[#FEFEFE] rounded-xl py-10 sm:py-20'>
            <h2 className='text-xl sm:text-2xl font-semibold leading-7 text-gray-900'>
              Album Info
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

            <div className='mt-4 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-y-2 sm:gap-x-6'>
              <button
                type='button'
                onClick={resetForm}
                className='text-xs sm:text-sm font-semibold text-gray-900 w-full sm:w-auto'
              >
                Cancelar
              </button>
              <button
                type='submit'
                className='bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-400 transition text-md'
                disabled={isLoading}
              >
                {isLoading ? 'Guardando ' : 'Guardar álbum'}
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
