import React from 'react';
import { ArtistFormData } from '../../../Interfaces/ArtistInterface';

const FormArtistFields: React.FC<{
  formData: ArtistFormData;
  handleChange: React.ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  >;
}> = ({ formData, handleChange }) => {
  return (
    <>
      <div className='mb-4'>
        <label
          className='block text-gray-700 text-sm font-semibold mb-2'
          htmlFor='name'
        >
          Nombre del artista
        </label>
        <input
          type='text'
          name='name'
          value={formData.name}
          onChange={handleChange}
          placeholder='Nombre del artista'
          className='w-full px-4 py-2 border rounded-md text-gray-600'
        />
      </div>
      <div className='mb-4'>
        <label
          className='block text-gray-700 text-sm font-semibold mb-2'
          htmlFor='nationality'
        >
          Nacionalidad
        </label>
        <input
          type='text'
          name='nationality'
          value={formData.nationality}
          onChange={handleChange}
          placeholder='Nacionalidad'
          className='w-full px-4 py-2 border rounded-md text-gray-600'
        />
      </div>
      <div className='mb-4'>
        <label
          className='block text-gray-700 text-sm font-semibold mb-2'
          htmlFor='details'
        >
          Detalles
        </label>
        <textarea
          name='details'
          value={formData.details}
          onChange={handleChange}
          placeholder='Detalles'
          className='w-full px-4 py-2 border rounded-md text-gray-600'
          rows={3}
        />
      </div>
      <div className='mb-4'>
        <label
          className='block text-gray-700 text-sm font-semibold mb-2'
          htmlFor='photo'
        >
          URL de la foto
        </label>
        <input
          type='text'
          name='photo'
          value={formData.photo}
          onChange={handleChange}
          placeholder='URL de la foto'
          className='w-full px-4 py-2 border rounded-md text-gray-600'
        />
      </div>
    </>
  );
};

export default FormArtistFields;
