import { useState } from 'react';
import Spinner from '../../Spinner/Spinner';
import { useUserEdit } from '../../../hooks/user/useUserEdit';
import { EditUserProps } from '../../../Interfaces/UserInterface';

const UserEditModal: React.FC<EditUserProps> = ({ userId, onClose }) => {
  const { formData, handleChange, handleSubmit, loading } = useUserEdit(
    userId,
    onClose
  );

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center backdrop-blur-lg bg-opacity-40 p-20'>
      {loading && (
        <div className='fixed inset-0 flex items-center justify-center bg-blur bg-opacity-40 z-50'>
          <Spinner />
        </div>
      )}
      <div className='bg-white rounded-lg shadow-lg w-full max-w-md p-6 h-auto max-h-[90vh] overflow-y-auto relative mt-12 mb-12'>
        <button
          onClick={onClose}
          className='absolute top-2 right-2 text-gray-500 hover:text-gray-700'
        >
          ✕
        </button>

        <h2 className='text-lg font-semibold mb-4'>Editar Usuario</h2>

        <form onSubmit={handleSubmit}>
          <div className='mb-4'>
            <label
              htmlFor='username'
              className='block text-sm font-medium text-gray-700 mb-1'
            >
              Nombre de usuario
            </label>
            <input
              id='username'
              type='text'
              name='username'
              placeholder='Ingrese un nombre de usuario'
              value={formData.username}
              onChange={handleChange}
              className='w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400'
            />
          </div>

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
              placeholder='Ingrese un email válido'
              value={formData.email}
              onChange={handleChange}
              className='w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400'
            />
          </div>

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
      </div>
    </div>
  );
};

export default UserEditModal;
