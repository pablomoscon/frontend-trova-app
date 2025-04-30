import {
  ArtistFormData,
  NewArtistModalProps,
} from '../../../Interfaces/ArtistInterface';
import FormArtistFields from './FormArtistFields';

const NewArtistModal: React.FC<NewArtistModalProps> = ({
  formData,
  setFormData,
  onClose,
  onSave,
}) => {
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev: ArtistFormData) => ({ ...prev, [name]: value }));
  };

  return (
    <div className='fixed inset-0 bg-opacity-40 backdrop-blur-lg flex justify-center items-center z-50'>
      <div className='bg-white rounded-lg p-8 w-full max-w-2xl shadow-lg border-4 border-gray-800'>
        <h3 className='text-lg font-semibold mb-4 text-gray-800'>
          Nuevo artista
        </h3>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSave();
          }}
        >
          <FormArtistFields formData={formData} handleChange={handleChange} />
          <div className='flex justify-end gap-4'>
            <button
              type='button'
              className='px-4 py-2 rounded-md bg-gray-200 hover:bg-gray-300'
              onClick={onClose}
            >
              Cancelar
            </button>
            <button
              type='submit'
              className='px-4 py-2 rounded-md bg-indigo-600 text-white hover:bg-indigo-500'
            >
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewArtistModal;
