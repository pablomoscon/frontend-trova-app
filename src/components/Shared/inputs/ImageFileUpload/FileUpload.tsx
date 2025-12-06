import React from 'react';
import { FileUploadProps } from '../../../../Interfaces/SharedInterface';

const FileUpload: React.FC<FileUploadProps> = ({
  label,
  selectedFileName,
  setSelectedFileName,
  onFileChange,
  previewSrc,
}) => (
  <div className='col-span-full'>
    <label className='block text-center sm:text-start text-sm font-medium text-gray-900 mb-2'>
      {label}
    </label>

    <div className='flex flex-col items-center sm:flex-row sm:items-center sm:space-x-4 space-y-2 sm:space-y-0 sm:justify-start'>
      <label
        htmlFor='file'
        className='w-[70%] sm:w-auto text-sm md:text-base cursor-pointer inline-flex items-center justify-center px-2 sm:px-3 md:px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition text-center'
      >
        📁 Seleccionar archivo
      </label>
      <span className='text-sm text-gray-600 text-center sm:text-left'>
        {selectedFileName || 'Ningún archivo seleccionado'}
      </span>
    </div>

    <input
      type='file'
      id='file'
      name='file'
      className='hidden'
      onChange={(e) => {
        onFileChange(e);
        setSelectedFileName(e.target.files?.[0]?.name || '');
      }}
    />

    {previewSrc && (
      <div className='col-span-full my-6'>
        <p className='text-sm font-medium text-center text-gray-700 mb-3'>
          Vista previa de la imagen
        </p>
        <div className='flex justify-center'>
          <img
            src={previewSrc}
            alt='Vista previa'
            loading='lazy'
            className='max-w-[200px] sm:max-w-xs max-h-30 rounded-md border border-gray-300'
          />
        </div>
      </div>
    )}
  </div>
);

export default FileUpload;
