import React, { useState } from 'react';
import TextInput from '../../shared/inputs/TextInput';
import ArtistSelector from './ArtistSelector';
import TextAreaInput from '../../shared/inputs/TextAreaInput';
import GenreSelector from './GenreSelector';
import ImageFileUpload from '../../shared/inputs/ImageFileUpload';
import { AlbumFormFieldsProps } from '../../../Interfaces/AlbumInterface';
import SongInputs from '../../shared/inputs/SongInputs';

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
        label='Título del álbum'
        name='name'
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

      <div className='sm:col-span-6 '>
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
