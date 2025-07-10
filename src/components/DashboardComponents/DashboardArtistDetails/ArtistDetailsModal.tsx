import React, { useRef } from 'react';
import { X } from 'lucide-react';
import { ArtistDetailsModalProps } from '../../../Interfaces/ArtistInterface';
import { useCloseOnOutside } from '../../../hooks/shared/useCloseOnOutside';

const ArtistDetailsModal: React.FC<ArtistDetailsModalProps> = ({
  artist,
  onClose,
}) => {
  const modalRef = useRef<HTMLDivElement | null>(null);
  useCloseOnOutside(modalRef, onClose);

  return (
    <div className='fixed inset-0 bg-opacity-40 backdrop-blur-xl flex items-center justify-center z-50 px-4'>
      <div
        ref={modalRef}
        className='bg-gray-100 rounded-3xl p-8 max-w-xl w-full shadow-2xl border border-gray-300'
      >
        <button
          onClick={onClose}
          className='absolute top-3 right-3 text-gray-500 hover:text-gray-700'
          aria-label='Cerrar'
        >
          <X size={20} />
        </button>
        <h2 className='text-xl font-bold text-gray-800 mb-4'>{artist.name}</h2>
        <p className='text-gray-700 whitespace-pre-line'>{artist.details}</p>
      </div>
    </div>
  );
};

export default ArtistDetailsModal;
