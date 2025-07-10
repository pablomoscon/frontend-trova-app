import React, { useEffect, useState, useRef } from 'react';
import { ArtistEditModalProps } from '../../../Interfaces/ArtistInterface';
import { useDetailsArtist } from '../../../hooks/artist/useDetailsArtist';
import { useEditArtist } from '../../../hooks/artist/useEditArtist';

import ImageFileUpload from '../../shared/inputs/ImageFileUpload';
import Spinner from '../../shared/Spinner';
import { useCloseOnOutside } from '../../../hooks/shared/useCloseOnOutside';


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

  const modalRef = useRef<HTMLDivElement>(null);
  useCloseOnOutside(modalRef, onClose);

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

  if (loadingArtist)
    return (
      <div className='modal flex items-center justify-center'>
        <Spinner />
      </div>
    );

  if (errorLoadingArtist)
    return <div className='modal text-red-600'>{errorLoadingArtist}</div>;

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center backdrop-blur-lg bg-opacity-40 p-4'>
      <div
        ref={modalRef}
        className='bg-white rounded-lg w-full max-w-4xl p-3 shadow-lg max-h-[80vh] overflow-y-auto p-8'
      >
        <h2 className='text-xl font-semibold mb-3 text-center'>Edit artist</h2>

        {(localError || errorSaving) && (
          <p className='text-red-600 text-sm mb-2'>
            {localError || errorSaving}
          </p>
        )}

        <label className='block text-sm font-medium mb-2'>Name</label>
        <input
          aria-label='Artist name'
          className='w-full border rounded-md p-2 mb-2'
          value={name}
          disabled={saving}
          onChange={(e) => setName(e.target.value)}
        />

        <label className='block text-sm font-medium mb-2'>Nationality</label>
        <input
          aria-label='Artist nationality'
          className='w-full border rounded-md p-2 mb-4'
          value={nationality}
          disabled={saving}
          onChange={(e) => setNationality(e.target.value)}
        />

        <label className='block text-sm font-medium mb-4'>Details</label>
        <textarea
          aria-label='Artist details'
          className='w-full border rounded-md p-2 mb-4 resize-y min-h-[40px]'
          value={details}
          disabled={saving}
          onChange={(e) => setDetails(e.target.value)}
        />

        <ImageFileUpload
          handleFileChange={handlePhotoChange}
          selectedFileName={selectedFileName}
          setSelectedFileName={setSelectedFileName}
          imagePreview={photoPreview}
        />

        <div className='flex justify-end gap-3 mt-3'>
          <button
            onClick={onClose}
            disabled={saving}
            className='px-4 py-1.5 rounded-md text-gray-600 hover:text-gray-800'
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
      </div>
    </div>
  );
};

export default ArtistEditModal;
