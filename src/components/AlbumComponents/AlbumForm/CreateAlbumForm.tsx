import { UserCircleIcon } from 'lucide-react';
import { useAlbumForm } from '../../../hooks/album/useAlbumForm';
import Spinner from '../../Spinner/Spinner';
import AlbumFormFields from './AlbumFormFields';
import NewArtistModal from '../../ArtistComponents/ArtistForms/NewArtistModal';
import { createNewArtist } from '../../../utils/createNewArtist';
import { useArtistCreate } from '../../../hooks/artist/useArtistCreate';
import { useAlbumCreate } from '../../../hooks/album/useAlbumCreate';
import { useArtistFetch } from '../../../hooks/artist/useArtistFetch';
import { ArtistFormData } from '../../../Interfaces/ArtistInterface';

const CreateAlbumForm: React.FC = () => {
  const { formData, handleChange, songsInput, setSongsInput, resetForm } =
    useAlbumForm();
  const { artists, setArtists, loading } = useArtistFetch(false);
  const { handleSubmit } = useAlbumCreate(formData, resetForm);

  const {
    showArtistModal,
    setShowArtistModal,
    newArtistFormData,
    setNewArtistFormData,
    handleAddArtist,
  } = useArtistCreate(async (artistData: ArtistFormData) => {
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
            />

            <div className='col-span-full flex items-center justify-center p-5'>
              <UserCircleIcon className='h-12 w-12 text-gray-300 p-2' />
              <span className='text-xs sm:text-sm text-gray-500'>
                Vista previa de la imagen
              </span>
            </div>

            <div className='mt-6 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-y-4 sm:gap-x-6'>
              <button
                type='reset'
                className='text-xs sm:text-sm font-semibold text-gray-900 w-full sm:w-auto'
              >
                Cancelar
              </button>
              <button
                type='submit'
                className='rounded-md bg-indigo-600 px-2 py-2 text-xs sm:text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 w-auto sm:w-auto'
              >
                Guardar álbum
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

export default CreateAlbumForm;
