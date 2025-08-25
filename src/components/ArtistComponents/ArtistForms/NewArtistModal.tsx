import React, { useRef } from 'react';
import { NewArtistModalProps } from '../../../Interfaces/ArtistInterface';
import { createArtist } from '../../../services/artistService';
import LoadingDots from '../../Shared/LoadingDots';
import { useCreateArtist } from '../../../hooks/artist/useCreateArtist';
import { useCloseOnOutside } from '../../../hooks/shared/useCloseOnOutside';
import ArtistFormFields from './ArtistFormFields';

const NewArtistModal: React.FC<NewArtistModalProps> = ({ onClose }) => {
  const {
    newArtistFormData,
    setNewArtistFormData,
    handleAddArtist,
    createError,
    isLoading,
  } = useCreateArtist(createArtist, onClose);
  const panelRef = useRef<HTMLDivElement>(null);
  useCloseOnOutside(panelRef, onClose);

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

  return (
    <div className='fixed inset-0 bg-opacity-40 backdrop-blur-lg flex justify-center items-center z-50'>
      <div
        ref={panelRef}
        className='bg-white rounded-lg p-8 w-full max-w-2xl shadow-lg border-4 border-gray-800'
      >
        <h3 className='text-lg font-semibold mb-4 text-gray-800'>
          Nuevo artista
        </h3>

        <form onSubmit={handleSubmit}>
          <ArtistFormFields
            formData={newArtistFormData}
            handleChange={handleChange}
          />

          {createError && (
            <p className='text-red-500 text-sm mt-2'>{createError}</p>
          )}

          <div className='flex justify-end gap-4 mt-6'>
            <button
              type='button'
              className='px-4 py-2 rounded-md bg-gray-200 hover:bg-gray-300'
              onClick={onClose}
              disabled={isLoading}
            >
              Cancelar
            </button>
            <button
              type='submit'
              className='px-4 py-2 rounded-md bg-indigo-600 text-white hover:bg-indigo-500'
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

export default NewArtistModal;
