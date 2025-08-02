import React, { useRef } from 'react';
import { X } from 'lucide-react';
import { useCloseOnOutside } from '../../../hooks/shared/useCloseOnOutside';

interface ImageModalProps {
  imageUrl: string;
  onClose: () => void;
}

const ImageModal: React.FC<ImageModalProps> = ({ imageUrl, onClose }) => {
  const modalRef = useRef<HTMLDivElement>(null);
  useCloseOnOutside(modalRef, onClose);

  return (
    <div className='fixed inset-0 backdrop-blur-lg bg-opacity-75 flex justify-center items-center z-50'>
      <div ref={modalRef} className='relative'>
        <button
          className='absolute top-10 right-10 text-gray-500 hover:text-red-600'
          onClick={onClose}
        >
          <span className='sr-only'>Cerrar modal</span>
          <X size={38} />
        </button>
        <img
          src={imageUrl}
          alt='Album full'
          loading='lazy'
          className='max-w-full max-h-full rounded shadow-lg'
        />
      </div>
    </div>
  );
};

export default ImageModal;
