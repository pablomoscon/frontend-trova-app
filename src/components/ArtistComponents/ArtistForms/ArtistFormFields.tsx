import React, { useState } from 'react';
import { ArtistFormData } from '../../../Interfaces/ArtistInterface';
import TextInput from '../../shared/inputs/TextInput';
import ImageFileUpload from '../../shared/inputs/ImageFileUpload';
import TextAreaInput from '../../shared/inputs/TextAreaInput';

const ArtistFormFields: React.FC<{
  formData: ArtistFormData;
  handleChange: React.ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  >;
}> = ({ formData, handleChange }) => {
  const [selectedFileName, setSelectedFileName] = useState('');

  return (
    <div className='mt-8 grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-6 max-w-[90%] sm:max-w-4xl mx-auto'>
      <TextInput
        label='Nombre del artista'
        name='name'
        value={formData.name}
        onChange={handleChange}
        colSpan='sm:col-span-3'
        placeholder='Ej: Astor Piazzolla'
      />

      <TextInput
        label='Nacionalidad'
        name='nationality'
        value={formData.nationality}
        onChange={handleChange}
        colSpan='sm:col-span-3'
        placeholder='Ej: Argentina'
      />

      <TextAreaInput
        label='Detalles'
        name='details'
        value={formData.details}
        onChange={handleChange}
      />

      <ImageFileUpload
        handleFileChange={handleChange}
        selectedFileName={selectedFileName}
        setSelectedFileName={setSelectedFileName}
        imagePreview={undefined}
      />
    </div>
  );
};

export default ArtistFormFields;
