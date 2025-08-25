import { User, UsersData } from '../Interfaces/UserInterface';
import axiosInstance from '../api/axiosInstance';

export const fetchUsers = async (
  page: number,
  size: number
): Promise<UsersData> => {
  const { data } = await axiosInstance.get<UsersData>('/user', {
    params: { page, size },
  });
  return data;
};

export const fetchUserById = async (id: string): Promise<User> => {
  const response = await axiosInstance.get<User>(
    `/user/${id}`
  );
  return response.data;
};

export const searchUsers = async (
  query: string,
  page: number,
  size: number
): Promise<UsersData> => {
  if (query.trim() === '') {
    return {
      content: [],
      totalPages: 0,
      totalElements: 0,
      currentPage: 0
    };
  }
  const { data } = await axiosInstance.get<UsersData>('/user/search', {
    params: { q: query, page, size },
  });
  return data;
};

export const editUser = async (
  id: string,
  updateUser: Partial<User>
): Promise<User> => {
  const response = await axiosInstance.patch<User>(`/user/${id}`, updateUser);
  return response.data;
};

export const suspendUser = async (id: string): Promise<void> => {
  await axiosInstance.put(`/user/suspend/${id}`);
};

export const deleteUser = async (id: string): Promise<void> => {
  await axiosInstance.delete(`/user/${id}`);
};

