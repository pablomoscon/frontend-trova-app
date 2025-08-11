// src/components/user/UserEditModal.tsx
import React, { useRef } from 'react';
import Spinner from '../../shared/Spinner';
import { EditUserProps } from '../../../Interfaces/UserInterface';
import { useEditUser } from '../../../hooks/user/useEditUser';
import { useCloseOnOutside } from '../../../hooks/shared/useCloseOnOutside';

const UserEditModal: React.FC<EditUserProps> = ({ userId, onClose }) => {
  const { formData, handleChange, handleSubmit, isLoading } = useEditUser(
    userId,
    onClose
  );
  const panelRef = useRef<HTMLDivElement>(null);
useCloseOnOutside(panelRef, onClose);

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center backdrop-blur-lg bg-opacity-40 p-20'>
      {isLoading && (
          <Spinner />
      )}

      {/* ▼ Inner panel – clicking outside this ref triggers onClose */}
      <div
        ref={panelRef}
        className='bg-white rounded-lg shadow-lg w-full max-w-md p-6 h-auto max-h-[90vh] overflow-y-auto relative mt-12 mb-12'
      >
        <button
          onClick={onClose}
          className='absolute top-2 right-2 text-gray-500 hover:text-gray-700 cursor-pointer'
        >
          ✕
        </button>

        <h2 className='text-lg font-semibold mb-4'>Editar Usuario</h2>

        {/* Render form only after data is loaded */}
        {!isLoading && (
          <form onSubmit={handleSubmit} className='text-start'>
            {/* Username input */}
            <div className='mb-4'>
              <label
                htmlFor='username'
                className='block text-sm font-medium text-gray-700 mb-1'
              >
                Username
              </label>
              <input
                id='username'
                type='text'
                name='username'
                placeholder='Enter a username'
                value={formData.username || ''}
                onChange={handleChange}
                className='w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400'
              />
            </div>

            {/* Email input */}
            <div className='mb-4'>
              <label
                htmlFor='email'
                className='block text-sm font-medium text-gray-700 mb-1'
              >
                Email
              </label>
              <input
                id='email'
                type='email'
                name='email'
                placeholder='Enter a valid email'
                value={formData.email || ''}
                onChange={handleChange}
                className='w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400'
              />
            </div>

            {/* Role select */}
            <div className='mb-6'>
              <label
                htmlFor='role'
                className='block text-sm font-medium text-gray-700 mb-1'
              >
                Rol
              </label>
              <select
                id='role'
                name='role'
                value={formData.role || 'USER'}
                onChange={handleChange}
                className='w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400'
              >
                <option value='USER'>User</option>
                <option value='ADMIN'>Admin</option>
              </select>
            </div>

            {/* Action buttons */}
            <div className='mt-6 flex justify-center gap-3'>
              <button
                type='button'
                onClick={onClose}
                className='px-3 py-1.5 text-sm text-gray-600 hover:text-gray-800'
              >
                Cancelar
              </button>
              <button
                type='submit'
                className='px-3 py-1.5 bg-indigo-600 text-white text-sm rounded hover:bg-indigo-500'
              >
                Guardar Cambios
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default UserEditModal;
