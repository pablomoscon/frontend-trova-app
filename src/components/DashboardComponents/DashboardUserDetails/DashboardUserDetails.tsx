import React, { useState, useEffect } from 'react';
import Spinner from '../../shared/Spinner';
import PaginationControls from '../../shared/PaginationControls';
import UserCard from './UserCard';
import { useFetchUsers } from '../../../hooks/user/useFetchUsers';

const DashboardUserDetails: React.FC<{ pageSize?: number }>= ({
  pageSize = 9,
}) => {
  const [page, setPage] = useState(() => {
    const saved = sessionStorage.getItem('userDashboardPage');
    return saved ? Number(saved) : 1;
  });

  const { users, totalPages, isLoading, error } = useFetchUsers(
    page - 1,
    pageSize
  );

  useEffect(() => {
    sessionStorage.setItem('userDashboardPage', String(page));
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [page]);

  if (isLoading) return <Spinner />;
  if (error) return <p className='text-red-500 text-center mt-4'>{error}</p>;

  return (
    <div className='min-h-full p-8 pt-40 content-center w-full'>
      <h1 className='text-2xl font-semibold text-gray-800 mb-4 text-center border-b pb-2'>
        Usuarios
      </h1>

      <div className='flex flex-wrap justify-center gap-4 py-8'>
        {users.map((user) => (
          <UserCard key={user.id} user={user} />
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
    </div>
  );
};

export default DashboardUserDetails;
