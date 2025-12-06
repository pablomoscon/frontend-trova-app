import React, { useEffect, useState, useRef } from 'react';
import { ArtistEditModalProps } from '../../../Interfaces/ArtistInterface';
import { useDetailsArtist } from '../../../hooks/artist/useDetailsArtist';
import { useEditArtist } from '../../../hooks/artist/useEditArtist';
import Spinner from '../../Shared/Spinner';
import { useCloseOnOutside } from '../../../hooks/shared/useCloseOnOutside';
import { useModalClose } from '../../../hooks/shared/useModalClose';
import ImageFileUpload from '../../Shared/ImageFileUpload/ImageFileUpload';

const ArtistEditModal: React.FC<
  ArtistEditModalProps & { onSaveSuccess: () => void }
> = ({ artistId, onClose, onSaveSuccess }) => {
  const {
    artist,
    loading: loadingArtist,
    error: errorLoadingArtist,
  } = useDetailsArtist(artistId);

  const {
    updateArtist,
    isLoading: saving,
    error: errorSaving,
  } = useEditArtist();

  const [name, setName] = useState('');
  const [nationality, setNationality] = useState('');
  const [details, setDetails] = useState('');
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [selectedFileName, setSelectedFileName] = useState('');
  const [localError, setLocalError] = useState<string | null>(null);

  // --- Modal refs + hooks de cierre ---
  const modalRef = useRef<HTMLDialogElement>(null);
  useModalClose(onClose);
  useCloseOnOutside(modalRef, onClose);

  // --- Cargar datos del artista ---
  useEffect(() => {
    if (!artist) return;

    setName(artist.name);
    setNationality(artist.nationality);
    setDetails(artist.details ?? '');
    setPhotoPreview(artist.photo ?? null);

    setPhotoFile(null);
    setSelectedFileName('');
    setLocalError(null);
  }, [artist]);

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setPhotoFile(file);
    setPhotoPreview(URL.createObjectURL(file));
    setSelectedFileName(file.name);
  };

  const handleSave = async () => {
    if (!artist) return;

    if (!name.trim()) {
      setLocalError('Name cannot be empty');
      return;
    }

    setLocalError(null);

    const artistData = {
      name,
      nationality,
      details,
    };

    const formData = new FormData();
    formData.append(
      'artist',
      new Blob([JSON.stringify(artistData)], { type: 'application/json' })
    );
    if (photoFile) formData.append('photo', photoFile);

    try {
      await updateArtist(artist.id!, formData);
      onSaveSuccess();
      onClose();
    } catch {
      setLocalError('Failed to save changes. Please try again.');
    }
  };

  if (loadingArtist) return <Spinner />;

  if (errorLoadingArtist)
    return (
      <div className='fixed inset-0 z-50 flex items-center justify-center backdrop-blur-lg bg-black/40'>
        <p className='text-red-600'>{errorLoadingArtist}</p>
      </div>
    );

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center backdrop-blur-lg bg-black/40 p-6'>
      <dialog
        ref={modalRef}
        open
        className='bg-white rounded-lg shadow-lg w-full max-w-xl p-8 max-h-[90vh] overflow-y-auto relative'
      >
        <h2 className='text-xl font-semibold mb-4 text-center text-gray-800'>
          Edit Artist
        </h2>

        <button
          onClick={onClose}
          className='absolute top-2 right-4 text-gray-500 hover:text-gray-700 text-lg'
          aria-label='Cerrar modal'
          disabled={saving}
        >
          ✕
        </button>

        {(localError || errorSaving) && (
          <p className='text-red-600 text-sm mb-3'>
            {localError || errorSaving}
          </p>
        )}

        {/* ---- NAME ---- */}
        <label htmlFor='artist-name' className='block text-sm font-medium mb-1'>
          Name
        </label>
        <input
          id='artist-name'
          className='w-full border rounded-md p-2 mb-3'
          value={name}
          disabled={saving}
          onChange={(e) => setName(e.target.value)}
        />

        {/* ---- NATIONALITY ---- */}
        <label
          htmlFor='artist-nationality'
          className='block text-sm font-medium mb-1'
        >
          Nationality
        </label>
        <input
          id='artist-nationality'
          className='w-full border rounded-md p-2 mb-3'
          value={nationality}
          disabled={saving}
          onChange={(e) => setNationality(e.target.value)}
        />

        {/* ---- DETAILS ---- */}
        <label
          htmlFor='artist-details'
          className='block text-sm font-medium mb-1'
        >
          Details
        </label>
        <textarea
          id='artist-details'
          className='w-full border rounded-md p-2 mb-4 resize-y min-h-[60px]'
          value={details}
          disabled={saving}
          onChange={(e) => setDetails(e.target.value)}
        />

        {/* ---- IMAGE ---- */}
        <ImageFileUpload
          handleFileChange={handlePhotoChange}
          selectedFileName={selectedFileName}
          setSelectedFileName={setSelectedFileName}
          imagePreview={photoPreview}
        />

        <div className='flex justify-end gap-3 mt-6'>
          <button
            onClick={onClose}
            disabled={saving}
            className='px-4 py-1.5 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50'
          >
            Cancel
          </button>

          <button
            onClick={handleSave}
            disabled={saving}
            className='px-4 py-1.5 bg-gray-600 text-white rounded-md hover:bg-gray-700'
          >
            {saving ? 'Saving…' : 'Save'}
          </button>
        </div>
      </dialog>
    </div>
  );
};

export default ArtistEditModal;
