import React from 'react';
import Spinner from '../../shared/Spinner';
import SearchInput from '../../shared/SearchInput';
import UserEditModal from '../UserEditModal/UserEditModal';
import UserRow from './UserRow';
import { useManagementUser } from '../../../hooks/user/useManagementUser';

const UserManagementTable: React.FC = () => {
  const {
    filteredUsers,
    isLoading,
    error,
    searchTerm,
    setSearchTerm,
    selectedUserId,
    showModal,
    handleEdit,
    handleCloseModal,
    triggerDelete,
    toggleStatus,
  } = useManagementUser();

  if (isLoading) return <Spinner />;
  if (error) return <p>{error}</p>;

  return (
    <div className='min-h-screen bg-[#E5E6E4] flex-1'>
      <div className='flex flex-col w-full mt-10 px-4 sm:px-8 md:px-16 py-30'>
        <h2 className='text-xl font-semibold mb-4 text-center'>Usuarios</h2>

        <SearchInput
          placeholder='Buscar usuarios'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <div className='overflow-x-auto w-full'>
          <table className='min-w-full table-auto text-left border border-gray-300'>
            <thead className='bg-gray-200 text-center'>
              <tr>
                <th className='px-4 py-2'>Nombre</th>
                <th className='px-4 py-2'>Email</th>
                <th className='px-4 py-2'>Rol</th>
                <th className='px-4 py-2'>Status</th>
                <th className='px-4 py-2'>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                  <UserRow
                    key={user.id}
                    user={user}
                    onEdit={handleEdit}
                    onDelete={triggerDelete}
                    onToggleStatus={toggleStatus}
                  />
                ))
              ) : (
                <tr>
                  <td colSpan={5} className='text-center py-4 text-gray-500'>
                    No se encontraron usuarios.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && selectedUserId && (
        <UserEditModal userId={selectedUserId} onClose={handleCloseModal} />
      )}
    </div>
  );
};

export default UserManagementTable;
