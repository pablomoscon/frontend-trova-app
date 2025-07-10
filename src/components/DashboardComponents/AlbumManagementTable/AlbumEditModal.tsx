import React, { useState, useRef } from 'react';
import AlbumFormFields from '../../albumComponents/AlbumFormFields/AlbumFormFields';
import { useEditAlbum } from '../../../hooks/album/useEditAlbum';
import { EditAlbumProps } from '../../../Interfaces/AlbumInterface';
import Spinner from '../../shared/Spinner';
import EditAlbumSongsModal from './EditAlbumSongsModal';
import { useCloseOnOutside } from '../../../hooks/shared/useCloseOnOutside';

const AlbumEditModal: React.FC<EditAlbumProps> = ({ albumId, onClose }) => {
  const {
    formData,
    handleChange,
    songsInput,
    setSongsInput,
    artists,
    loading,
    handleSubmit,
    imagePreview,
    handleFileChange,
  } = useEditAlbum(albumId, onClose);

  const [step, setStep] = useState<'main' | 'songs'>('main');

  const modalRef = useRef<HTMLDivElement>(null);

  useCloseOnOutside(modalRef, onClose);

  const goToSongsStep = () => setStep('songs');
  const goBackToMain = () => setStep('main');

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center backdrop-blur-lg bg-opacity-40 p-20'>
      {loading && (
        <div className='fixed inset-0 flex items-center justify-center bg-blur bg-opacity-40 z-50'>
          <Spinner />
        </div>
      )}
      <div
        ref={modalRef}
        className='bg-white rounded-lg shadow-lg w-full max-w-3xl p-6 h-auto max-h-[90vh] overflow-y-auto relative mt-12 mb-12'
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className='absolute top-2 right-4 text-gray-500 hover:text-gray-700'
        >
          ✕
        </button>

        {step === 'main' && (
          <>
            <h2 className='text-lg font-semibold mb-4'>Editar Álbum</h2>
            <form onSubmit={handleSubmit}>
              <AlbumFormFields
                formData={formData}
                songsInput={songsInput}
                setSongsInput={setSongsInput}
                handleChange={handleChange}
                artists={artists}
                setShowArtistModal={() => {}}
                isEditMode={true}
                goToSongsStep={goToSongsStep}
                imagePreview={imagePreview}
                handleFileChange={handleFileChange}
              />
              <div className='mt-6 flex justify-center gap-3'>
                <button
                  type='button'
                  onClick={onClose}
                  className='px-3 py-1.5 text-md text-gray-600 hover:text-gray-800'
                >
                  Cancelar
                </button>
                <button
                  type='submit'
                  className='px-3 py-1.5 bg-gray-500 text-white text-sm rounded hover:bg-gray-500'
                >
                  Guardar Cambios
                </button>
              </div>
            </form>
          </>
        )}

        {step === 'songs' && (
          <EditAlbumSongsModal
            songsInput={songsInput}
            setSongsInput={setSongsInput}
            goBack={goBackToMain}
            songs={formData.listOfSongs ?? []}
          />
        )}
      </div>
    </div>
  );
};

export default AlbumEditModal;
