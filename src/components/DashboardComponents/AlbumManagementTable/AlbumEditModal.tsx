import React, { useState, useRef } from 'react';
import { useEditAlbum } from '../../../hooks/album/useEditAlbum';
import { EditAlbumProps } from '../../../Interfaces/AlbumInterface';
import Spinner from '../../Shared/Spinner';
import { useCloseOnOutside } from '../../../hooks/shared/useCloseOnOutside';
import { useModalClose } from '../../../hooks/shared/useModalClose';
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
    handleSongChange,
    handleFileChange,
  } = useEditAlbum(albumId, onClose);

  const [step, setStep] = useState<'main' | 'songs'>('main');

  const modalRef = useRef<HTMLDialogElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  // Hooks para cerrar modal
  useCloseOnOutside(contentRef, onClose); // clic fuera
  useModalClose(onClose); // tecla Escape

  const goToSongsStep = () => setStep('songs');
  const goBackToMain = () => setStep('main');

  if (!albumId) return null;

  return (
    <dialog
      ref={modalRef}
      open
      className='fixed inset-0 z-50 w-full h-full bg-black/40 flex items-center justify-center p-6 sm:p-10'
      aria-modal='true'
    >
      <div
        ref={contentRef}
        className='bg-white rounded-lg shadow-lg w-full max-w-full sm:max-w-lg md:max-w-2xl lg:max-w-3xl xl:max-w-4xl 2xl:max-w-6xl p-4 sm:p-6 h-auto max-h-[90vh] overflow-y-auto relative'
      >
        {loading && <Spinner />}

        {/* Botón de cerrar */}
        <button
          onClick={onClose}
          className='absolute top-2 right-4 text-gray-500 hover:text-gray-700 text-lg'
          aria-label='Cerrar modal'
        >
          ✕
        </button>

        {/* Paso principal */}
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
                 handleSongChange={ handleSongChange}
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

        {/* Paso de edición de canciones */}
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
    </dialog>
  );
};

export default AlbumEditModal;
