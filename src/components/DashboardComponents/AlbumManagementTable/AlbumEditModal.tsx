import React, { useState, useRef } from 'react';
import { useEditAlbum } from '../../../hooks/album/useEditAlbum';
import { EditAlbumProps } from '../../../Interfaces/AlbumInterface';
import Spinner from '../../Shared/Spinner';
import { useCloseOnOutside } from '../../../hooks/shared/useCloseOnOutside';
import EditAlbumSongsModal from './EditAlbumSongsModal/EditAlbumSongsModal';
import AlbumFormFields from '../../AlbumComponents/AlbumFormFields/AlbumFormFields';

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
    <div className='fixed inset-0 z-50 flex items-center justify-center backdrop-blur-lg bg-opacity-40 p-6 sm:p-10'>
      {loading && <Spinner />}
      <div
        ref={modalRef}
        className='bg-white rounded-lg shadow-lg w-full max-w-full sm:max-w-md md:max-w-lg lg:max-w-3xl p-4 sm:p-6 h-auto max-h-[90vh] overflow-y-auto relative my-6'
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
            <h2 className='text-xl font-semibold mb-4 text-center text-gray-800'>
              Editar Álbum
            </h2>
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
              <div className='mt-6 flex flex-col sm:flex-row justify-center gap-3'>
                <button
                  type='button'
                  onClick={onClose}
                  className='w-full sm:w-auto px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 border border-gray-300 rounded-md'
                >
                  Cancelar
                </button>
                <button
                  type='submit'
                  className='w-full sm:w-auto px-4 py-2 bg-gray-600 text-white text-sm rounded-md hover:bg-gray-800 transition-colors'
                >
                  Guardar Cambios
                </button>
              </div>
            </form>
          </>
        )}

        {step === 'songs' && (
          <EditAlbumSongsModal
            albumId={albumId}
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
