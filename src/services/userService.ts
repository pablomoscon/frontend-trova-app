import { User } from '../Interfaces/UserInterface';
import axiosInstance from '../api/axiosInstance';

export const fetchUsers = async (): Promise<User[]> => {
  const response = await axiosInstance.get<User[]>('http://localhost:8081/user');
  return response.data;
};

export const fetchUserById = async (id: string): Promise<User> => {
  const response = await axiosInstance.get<User>(
    `http://localhost:8081/user/${id}`
  );
  return response.data;
};

export const patchUser = async (
  id: string,
  updateUser: Partial<User>
): Promise<User> => {
  const response = await axiosInstance.patch<User>(`http://localhost:8081/user/${id}`, updateUser);
  return response.data;
};

export const deleteUser = async (id: string): Promise<void> => {
  await axiosInstance.delete(`http://localhost:8081/user/${id}`);
};

