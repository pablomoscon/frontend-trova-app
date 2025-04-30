import React, { useState, useEffect } from 'react';
import Spinner from '../../Spinner/Spinner';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { TrashIcon, PencilIcon } from '@heroicons/react/24/solid';
import { fetchUsers } from '../../../services/userService';
import {
  showDeleteConfirmation,
  showErrorAlert,
  showSuccessAlert,
} from '../../../utils/showAlertUtils';
import { User } from '../../../Interfaces/UserInterface';
import UserEditModal from '../UserEditModal/UserEditModal';

const UserManagementTable: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);

  const loadUsers = async () => {
    try {
      setIsLoading(true);
      const data = await fetchUsers();
      setUsers(data);
    } catch (err) {
      setError('Error al cargar los usuarios');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const handleDelete = async (id: string) => {
    const confirmed = await showDeleteConfirmation();
    if (!confirmed) return;

    try {
      // Aquí iría el deleteUser, si estuviera definido en el service
      // await deleteUser(id);
      showSuccessAlert('Usuario eliminado con éxito');
      loadUsers();
    } catch (err) {
      showErrorAlert('Error al eliminar usuario');
    }
  };

  const handleEdit = (id: string) => {
    setSelectedUserId(id);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedUserId(null);
    loadUsers();
  };

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) return <Spinner />;
  if (error) return <p>{error}</p>;

  return (
    <div className='min-h-screen bg-[#E5E6E4] flex-1'>
      <div className='flex flex-col w-full mt-10 px-4 sm:px-8 md:px-16 py-30'>
        <h2 className='text-xl font-semibold mb-4 text-center'>Usuarios</h2>

        <div className='w-full md:w-96 mb-4'>
          <div className='relative'>
            <input
              type='text'
              placeholder='Buscar usuarios'
              className='w-full p-2 pr-10 rounded-md border border-gray-300 focus:outline-none'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className='absolute top-2 right-2'>
              <MagnifyingGlassIcon className='h-5 w-5 text-gray-500' />
            </div>
          </div>
        </div>

        <div className='overflow-x-auto w-full'>
          <table className='min-w-full table-auto text-left border border-gray-300'>
            <thead className='bg-gray-200 text-center'>
              <tr>
                <th className='px-4 py-2 text-sm font-semibold text-gray-700'>
                  Nombre
                </th>
                <th className='px-4 py-2 text-sm font-semibold text-gray-700'>
                  Email
                </th>
                <th className='px-4 py-2 text-sm font-semibold text-gray-700'>
                  Rol
                </th>
                <th className='px-4 py-2 text-sm font-semibold text-gray-700'>
                  Status
                </th>
                <th className='px-4 py-2 text-sm font-semibold text-gray-700'>
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user.id} className='border-b border-gray-300 text-center'>
                  <td className='px-4 py-2 text-sm text-gray-700'>
                    {user.name}
                  </td>
                  <td className='px-4 py-2 text-sm text-gray-700'>
                    {user.email}
                  </td>
                  <td className='px-4 py-2 text-sm text-gray-700'>
                    {user.role}
                  </td>
                  <td className='px-4 py-2 text-sm text-gray-700'>
                    {user.status}
                  </td>
                  <td className='px-4 py-2 text-sm'>
                    <div className='flex justify-center space-x-4'>
                      <button
                        onClick={() => handleEdit(user.id)}
                        className='text-sm text-gray-800 hover:bg-gray-100 px-3 py-2 rounded-md'
                        aria-label='Editar usuario'
                      >
                        <PencilIcon className='w-5 h-5 text-gray-800' />
                      </button>
                      <button
                        onClick={() => handleDelete(user.id)}
                        className='text-sm text-gray-600 hover:bg-gray-100 px-3 py-2 rounded-md'
                        aria-label='Eliminar usuario'
                      >
                        <TrashIcon className='w-5 h-5 text-gray-600' />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredUsers.length === 0 && !isLoading && (
                <tr>
                  <td
                    colSpan={3}
                    className='px-4 py-4 text-sm text-gray-500 text-center'
                  >
                    No se encontraron usuarios.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && selectedUserId !== null && (
        <UserEditModal userId={selectedUserId} onClose={handleCloseModal} />
      )}
    </div>
  );
};

export default UserManagementTable;
