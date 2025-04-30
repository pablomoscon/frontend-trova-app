import axios from 'axios';
import { Album, AlbumFormData} from '../Interfaces/AlbumInterface';
import axiosInstance from '../api/axiosInstance';

export const fetchAlbums = async (): Promise<Album[]> => {
  const response = await axios.get<Album[]>('http://localhost:8081/albums');
  return response.data;
};

export const fetchAlbumById = async (id: number): Promise<Album> => {
  const response = await axios.get<Album>(`http://localhost:8081/albums/${id}`);
  return response.data;
};

export const createAlbum = async (newAlbum: AlbumFormData): Promise<Album> => {
  const response = await axiosInstance.post<Album>(
    'http://localhost:8081/albums',
    newAlbum
  );
  return response.data;
};

export const editAlbum = async (
  id: number,
  updatedAlbum: AlbumFormData
): Promise<Album> => {
  const response = await axiosInstance.patch<Album>(
    `http://localhost:8081/albums/${id}`,
    updatedAlbum
  );
  return response.data;
};

export const deleteAlbum = async (id: number): Promise<void> => {
  await axiosInstance.delete(`http://localhost:8081/albums/${id}`);
};

