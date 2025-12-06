import React from 'react';
import { AlbumImageFileUploadProps } from '../../../../Interfaces/AlbumInterface';
import FileUpload from './FileUpload';


const ImageFileUpload: React.FC<AlbumImageFileUploadProps> = ({
  handleFileChange,
  selectedFileName,
  setSelectedFileName,
  imagePreview,
}) => {
  return (
    <FileUpload
      label='Cargar imagen'
      selectedFileName={selectedFileName}
      setSelectedFileName={setSelectedFileName}
      onFileChange={handleFileChange} // ← aquí hacemos el mapeo
      previewSrc={imagePreview || undefined}
    />
  );
};

export default ImageFileUpload;
