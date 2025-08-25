import React, { useState } from 'react';
import TextInput from '../../Shared/inputs/TextInput';
import TextAreaInput from '../../Shared/inputs/TextAreaInput';
import ImageFileUpload from '../../Shared/inputs/ImageFileUpload';
import { AlbumFormFieldsProps } from '../../../Interfaces/AlbumInterface';
import SongInputs from '../../Shared/inputs/SongInputs';
import ArtistSelector from './ArtistSelector';
import GenreSelector from './GenreSelector';


const AlbumFormFields: React.FC<AlbumFormFieldsProps> = ({
  formData,
  handleChange,
  artists,
  setShowArtistModal,
  isEditMode,
  goToSongsStep,
  handleFileChange,
  imagePreview,
}) => {
  const [selectedFileName, setSelectedFileName] = useState('');

  return (
    <div className='mt-8 grid grid-cols-1 sm:grid-cols-6 gap-y-6 gap-x-4 w-full'>
      <TextInput
        label='Título del album'
        name='title'
        value={formData.title}
        onChange={handleChange}
        colSpan='sm:col-span-3'
        placeholder='Ej: Adios Nonino'
      />

      <ArtistSelector
        artistId={formData.artistId}
        artists={artists}
        onChange={handleChange}
        setShowArtistModal={setShowArtistModal}
        isEditMode={isEditMode}
      />

      <TextInput
        label='Nombre completo del artista'
        name='displayArtistName'
        value={formData.displayArtistName}
        onChange={handleChange}
        colSpan='sm:col-span-6'
        wrapperClass='w-full flex flex-col'
        placeholder='Ej: Piazzolla y su quinteto'
      />

      <SongInputs
        listOfSongs={formData.listOfSongs}
        handleChange={handleChange}
        isEditMode={isEditMode}
        goToSongsStep={goToSongsStep}
      />

      <TextAreaInput
        label='Detalles'
        name='details'
        value={formData.details}
        onChange={handleChange}
      />

      <GenreSelector selectedGenres={formData.genres} onChange={handleChange} />

      <TextInput
        label='Número de catálogo'
        name='cdNumber'
        value={formData.cdNumber}
        onChange={handleChange}
        colSpan='sm:col-span-3'
      />

      <TextInput
        label='Año'
        name='year'
        type='number'
        value={formData.year || ''}
        onChange={handleChange}
        colSpan='sm:col-span-3'
        placeholder='Ej: 2001'
      />

      {/* Inputs para los links de música */}
      <TextInput
        label='Link Apple Music'
        name='appleMusicLink'
        value={formData.appleMusicLink}
        onChange={handleChange}
        colSpan='sm:col-span-6'
        placeholder='Ej: https://music.apple.com/album/...'
      />

      <TextInput
        label='Link Spotify'
        name='spotifyLink'
        value={formData.spotifyLink}
        onChange={handleChange}
        colSpan='sm:col-span-6'
        placeholder='Ej: https://open.spotify.com/album/...'
      />

      <TextInput
        label='Link Amazon Music'
        name='amazonMusicLink'
        value={formData.amazonMusicLink}
        onChange={handleChange}
        colSpan='sm:col-span-6'
        placeholder='Ej: https://music.amazon.com/albums/...'
      />

      <div className='sm:col-span-6'>
        <ImageFileUpload
          handleFileChange={handleFileChange}
          selectedFileName={selectedFileName}
          setSelectedFileName={setSelectedFileName}
          imagePreview={imagePreview}
        />
      </div>
    </div>
  );
};

export default AlbumFormFields;
