import React, { useState } from 'react';
import TextInput from './TextInput';
import ArtistSelector from './ArtistSelector';
import SongInputs from './SongInputs';
import TextAreaInput from './TextAreaInput';
import GenreSelector from './GenreSelector';
import ImageFileUpload from './ImageFileUpload';
import { AlbumFormFieldsProps } from '../../../Interfaces/AlbumInterface';


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
    <div className='mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 max-w-4xl mx-auto'>
      <TextInput
        label='Título del álbum'
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

      <ImageFileUpload
        handleFileChange={handleFileChange}
        selectedFileName={selectedFileName}
        setSelectedFileName={setSelectedFileName}
        imagePreview={imagePreview}
      />
    </div>
  );
};

export default AlbumFormFields;
