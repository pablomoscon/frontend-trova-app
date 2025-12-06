import React, { useState } from 'react';
import Spinner from '../../Shared/Spinner';
import PaginationControls from '../../Shared/PaginationControls/PaginationControls';
import { useFetchUsers } from '../../../hooks/user/useFetchUsers';
import { User } from '../../../Interfaces/UserInterface';
import { useScroll } from '../../../hooks/shared/useScroll';
import UserCard from './UserCard';
import UserDetailModal from './UserDetailModal';

const DashboardUserDetails: React.FC<{ pageSize?: number }> = ({
  pageSize = 9,
}) => {
  const [page, setPageState] = useState(() => {
    const saved = sessionStorage.getItem('userDashboardPage');
    return saved ? Number(saved) : 1;
  });

  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const { users, totalPages, isLoading, error } = useFetchUsers(
    page - 1,
    pageSize
  );

  useScroll(null, {
    deps: [page],
    behavior: 'auto',
    enabled: true,
  });

  const setPage = (newPage: number) => {
    sessionStorage.setItem('userDashboardPage', String(newPage));
    setPageState(newPage);
  };

  if (isLoading) return <Spinner />;
  if (error) return <p className='text-red-500 text-center mt-4'>{error}</p>;

  return (
    <div className='min-h-full p-8 pt-40 content-center w-full'>
      <h1 className='text-2xl font-semibold text-gray-800 mb-4 text-center border-b pb-2'>
        Usuarios
      </h1>

      <div className='flex flex-wrap justify-center gap-4 py-8'>
        {users.map((user) => (
          <UserCard
            key={user.id}
            user={user}
            onClick={() => setSelectedUser(user)}
          />
        ))}
      </div>

      {totalPages > 1 && (
        <PaginationControls
          page={page}
          totalPages={totalPages}
          setPage={setPage}
          onPageChangeComplete={() =>
            window.scrollTo({ top: 0, behavior: 'auto' })
          }
        />
      )}

      {selectedUser && (
        <UserDetailModal
          user={selectedUser}
          onClose={() => setSelectedUser(null)}
        />
      )}
    </div>
  );
};

export default DashboardUserDetails;
