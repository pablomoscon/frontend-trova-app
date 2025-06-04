import React, { useEffect, useState } from 'react';
import { fetchUsers } from '../../../services/userService';
import { User } from '../../../Interfaces/UserInterface';
import Spinner from '../../shared/Spinner';
import UserCard from './UserCard';

const UserDashboardDetails: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const data = await fetchUsers();
        setUsers(data);
      } catch (err) {
        console.error(err);
        setError('Error al cargar los usuarios');
      } finally {
        setLoading(false);
      }
    };

    loadUsers();
  }, []);

  if (loading) return <Spinner />;
  if (error) return <p className='text-red-500 text-center mt-4'>{error}</p>;

  return (
    <div className='min-h-full p-8 pt-40  content-center w-full'>
 
          <h1 className='text-2xl font-semibold text-gray-800 mb-4 text-center border-b pb-2 text-center'>
         Usuarios
          </h1>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 py-8'>
        {users.map((user) => (
          <UserCard key={user.id} user={user} />
        ))}
      </div>
    </div>
  );
};

export default UserDashboardDetails;
