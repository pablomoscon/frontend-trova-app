import axios from 'axios';
import { Album, AlbumFormData, AlbumsResponse} from '../Interfaces/AlbumInterface';
import axiosInstance from '../api/axiosInstance';


export const fetchAlbums = async (
  page: number,
  size: number
): Promise<AlbumsResponse> => {

  const response = await axios.get<AlbumsResponse>(
    `http://localhost:8081/albums?page=${page - 1}&size=${size}`
  );
  return response.data;
};

export const fetchAlbumById = async (id: number): Promise<Album> => {
  const response = await axios.get<Album>(`http://localhost:8081/albums/${id}`);
  return response.data;
};

export const fetchAlbumsByArtist = async (
  artistId: number,
  page: number = 1,
  size: number = 15
): Promise<AlbumsResponse> => {
  try {
    const response = await axios.get<AlbumsResponse>(
      `http://localhost:8081/albums/by-artist/${artistId}?page=${
        page - 1
      }&size=${size}`
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching albums by artist', error);
    throw error;
  }
};

export const createAlbum = async (newAlbum: FormData): Promise<Album> => {
  try {
    const response = await axiosInstance.post <Album>(
      'http://localhost:8081/albums',
      newAlbum,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error creating album', error);
    throw error;
  }
};

export const editAlbum = async (
  id: number,
  updatedAlbum: Partial<AlbumFormData>
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

