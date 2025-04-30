import axios from 'axios';
import { User } from '../Interfaces/UserInterface';
import axiosInstance from '../api/axiosInstance';

export const fetchUsers = async (): Promise<User[]> => {
  const response = await axiosInstance.get<User[]>('http://localhost:8081/user');
  return response.data;
};

export const fetchUserById = async (id: String): Promise<User[]> => {
  const response = await axiosInstance.get<User[]>(`http://localhost:8081/user/${id}`);
  return response.data;
};

export const patchUser = async (
  id: string,
  data: Partial<User>
): Promise<User> => {
  const response = await axiosInstance.patch<User>(`http://localhost:8081/user/${id}`, data);
  return response.data;
};

export const deleteUser = async (id: number): Promise<void> => {
  await axiosInstance.delete(`http://localhost:8081/user/${id}`);
};

