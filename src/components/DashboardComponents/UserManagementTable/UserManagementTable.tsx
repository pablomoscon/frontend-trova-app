import React from 'react';
import Spinner from '../../Shared/Spinner';
import SearchInput from '../../Shared/inputs/SearchInput';
import { useManagementUser } from '../../../hooks/user/useManagementUser';
import PaginationControls from '../../Shared/PaginationControls/PaginationControls';
import UserRow from './UserRow';
import UserEditModal from './UserEditModal';

const UserManagementTable: React.FC = () => {
  const {
    users,
    isLoading,
    page,
    setPage,
    error,
    searchTerm,
    onSearchChange,
    onSearchKeyDown,
    scrollRef,
    totalPages,
    selectedUserId,
    showModal,
    handleEdit,
    handleCloseModal,
    handleDelete,
    toggleStatus,
  } = useManagementUser();

  if (isLoading) return <Spinner />;

  if (error)
    return (
      <p className='text-center text-red-500 mt-4 text-xs sm:text-sm md:text-base'>
        {error}
      </p>
    );

  return (
    <div
      ref={scrollRef}
      className='min-h-screen bg-[#E5E6E4] flex-1 overflow-y-auto'
    >
      <div className='flex flex-col w-full mt-10 px-4 sm:px-8 md:px-16 pt-30 pb-6'>
        <h2 className='text-xl sm:text-2xl md:text-3xl font-semibold mb-4 text-center'>
          Usuarios
        </h2>

        <SearchInput
          placeholder='Buscar usuarios'
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          onEnter={onSearchKeyDown}
          className='w-full sm:w-80 mb-4 text-sm sm:text-sm md:text-base bg-gray-100'
        />

        <div className='overflow-x-auto w-full pb-12'>
          <table className='min-w-full table-auto text-left border border-gray-300'>
            <thead className='bg-gray-200 text-center'>
              <tr>
                <th className='px-2 py-2 text-xs sm:text-sm md:text-base'>
                  Nombre
                </th>
                <th className='px-2 py-2 text-xs sm:text-sm md:text-base'>
                  Email
                </th>
                <th className='px-2 py-2 text-xs sm:text-sm md:text-base'>
                  Rol
                </th>
                <th className='px-2 py-2 text-xs sm:text-sm md:text-base'>
                  Estado
                </th>
                <th className='px-2 py-2 text-xs sm:text-sm md:text-base'>
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody>
              {users.length > 0 ? (
                users.map((user) => (
                  <UserRow
                    key={user.id}
                    user={user}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                    onToggleStatus={toggleStatus}
                  />
                ))
              ) : (
                <tr>
                  <td
                    colSpan={5}
                    className='text-center py-4 text-gray-500 text-xs sm:text-sm md:text-base'
                  >
                    No se encontraron usuarios.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {totalPages > 1 && (
          <PaginationControls
            page={page}
            totalPages={totalPages}
            setPage={setPage}
          />
        )}

        {showModal && selectedUserId && (
          <UserEditModal userId={selectedUserId} onClose={handleCloseModal} />
        )}
      </div>
    </div>
  );
};

export default UserManagementTable;
