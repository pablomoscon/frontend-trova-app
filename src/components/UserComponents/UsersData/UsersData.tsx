import React, { useEffect, useState } from 'react';
import { fetchUsers } from '../../../services/userService';
import { User } from '../../../Interfaces/UserInterface';
import Spinner from '../../Spinner/Spinner';

const UsersData: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [showAllActivities, setShowAllActivities] = useState(false);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const data = await fetchUsers();
        setUsers(data);
      } catch (error) {
        console.error('Error fetching users:', error);
      } finally {
        setLoading(false);
      }
    };

    loadUsers();
  }, []);

  const toggleActivities = () => {
    setShowAllActivities(!showAllActivities);
  };

  if (loading) return <Spinner />;

  return (
    <div className='flex flex-col min-w-full justify-center items-center p-10 '>
      <h2 className='text-2xl font-bold mb-6'>Usuarios</h2>

      {/* ESFERAS */}
      <div className='flex flex-wrap justify-center gap-8'>
        {users.map((user) => (
          <div
            key={user.id}
            onClick={() => setSelectedUser(user)}
            className={`
              w-36 h-36 rounded-full flex items-center justify-center 
              text-white font-semibold text-lg tracking-wide cursor-pointer
              transition-all duration-300 transform hover:scale-105
              shadow-xl shadow-black/10
              ${
                user.status === 'active'
                  ? 'bg-gradient-to-br from-green-400 via-green-500 to-green-600'
                  : 'bg-gradient-to-br from-gray-300 via-gray-400 to-gray-500'
              }
              backdrop-blur bg-opacity-50 border border-white/10
            `}
            title={user.email}
          >
            <span className='text-center px-2'>
              {user.username.length > 12
                ? user.username.slice(0, 10) + '…'
                : user.username}
            </span>
          </div>
        ))}
      </div>

      {/* MODAL DE USUARIO SELECCIONADO */}
      {selectedUser && (
        <div className='min-w-full fixed backdrop-blur-lg flex items-center justify-center'>
          <div className='bg-white rounded-xl p-6 max-w-md shadow-xl relative'>
            <button
              onClick={() => setSelectedUser(null)}
              className='absolute top-2 right-2 text-gray-500 hover:text-black text-xl'
            >
              ✖
            </button>
            <h2 className='text-xl font-bold mb-4'>{selectedUser.name}</h2>
            <p>
              <strong>Username:</strong> {selectedUser.username}
            </p>
            <p>
              <strong>Email:</strong> {selectedUser.email}
            </p>
            <p>
              <strong>Rol:</strong> {selectedUser.role}
            </p>
            <p>
              <strong>Estado:</strong> {selectedUser.status}
            </p>
            <p>
              <strong>Creado:</strong>{' '}
              {selectedUser.createdAt &&
                new Date(selectedUser.createdAt).toLocaleString('es-AR', {
                  day: '2-digit',
                  month: '2-digit',
                  year: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                })}
            </p>
            <p>
              <strong>Último acceso:</strong>{' '}
              {selectedUser.lastLogin
                ? new Date(selectedUser.lastLogin).toLocaleString('es-AR', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                  })
                : 'No disponible'}
            </p>
            <p>
              <strong>Intentos fallidos:</strong>{' '}
              {selectedUser.failedLoginAttempts}
            </p>
            <div>
              <strong>Actividades:</strong>
              <ul>
                {/* Verificar si las actividades están definidas antes de acceder a su longitud */}
                {selectedUser.activities &&
                selectedUser.activities.length > 0 ? (
                  showAllActivities ? (
                    selectedUser.activities.map((activity, index) => (
                      <li key={index}>{activity}</li>
                    ))
                  ) : (
                    selectedUser.activities
                      .slice(0, 3)
                      .map((activity, index) => <li key={index}>{activity}</li>)
                  )
                ) : (
                  <li>No disponible</li>
                )}
              </ul>
              {/* Botón para mostrar o esconder todas las actividades */}
              {selectedUser.activities &&
                selectedUser.activities.length > 3 && (
                  <button
                    onClick={toggleActivities}
                    className='text-blue-500 mt-2'
                  >
                    {showAllActivities
                      ? 'Ver menos actividades'
                      : 'Ver todas las actividades'}
                  </button>
                )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UsersData;
