import React from 'react';
import { AlbumImageFileUploadProps } from '../../../Interfaces/AlbumInterface';

const ImageFileUpload: React.FC<AlbumImageFileUploadProps> = ({
  handleFileChange,
  selectedFileName,
  setSelectedFileName,
  imagePreview,
}) => (
  <div className='col-span-full'>
    <label
      htmlFor='photo'
      className='block text-xs sm:text-sm font-medium text-gray-900 text-start mb-2'
    >
      Cargar imagen
    </label>
    <div className='flex items-center space-x-4'>
      <label
        htmlFor='photo'
        className='text-sm cursor-pointer inline-flex items-center px-2 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-500'
      >
        📁 Seleccionar archivo
      </label>
      <span className='text-sm text-gray-600'>
        {selectedFileName || 'Ningún archivo seleccionado'}
      </span>
    </div>
    <input
      type='file'
      id='photo'
      name='photo'
      className='hidden'
      onChange={(e) => {
        handleFileChange(e);
        setSelectedFileName(e.target.files?.[0]?.name || '');
      }}
    />
    {imagePreview && (
      <div className='col-span-full my-6'>
        <p className='text-sm font-medium text-center text-gray-700 mb-3'>
          Vista previa de la imagen
        </p>
        <div className='flex justify-center'>
          <img
            src={imagePreview}
            alt='Vista previa'
            className='max-w-xs max-h-40 rounded-md border border-gray-300'
          />
        </div>
      </div>
    )}
  </div>
);

export default ImageFileUpload;
