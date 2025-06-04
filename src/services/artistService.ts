import axios from 'axios';
import { Artist } from '../Interfaces/ArtistInterface';
import axiosInstance from '../api/axiosInstance';

export const fetchArtists = async (
  page: number = 0,
  size: number = 15
): Promise<Artist[]> => {
  const url = new URL('http://localhost:8081/artist');
  url.searchParams.append('page', page.toString());
  url.searchParams.append('size', size.toString());

  const response = await fetch(url.toString());

  if (!response.ok) {
    const text = await response.text();
    console.error('Server responded with:', text);
    throw new Error('Failed to fetch artists');
  }

  const data = await response.json();
  return data.content;
};

export const fetchArtistById = async (id: number): Promise<Artist> => {
  const response = await axios.get<Artist>(
    `http://localhost:8081/artist/${id}`
  );
  return response.data;
};

export const createArtist = async (formData: FormData): Promise<Artist> => {
  try {
    const response = await axiosInstance.post<Artist>(
      'http://localhost:8081/artist',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error creating artist', error);
    throw error;
  }
};

export const editArtist = async (
  id: number,
  updatedArtist: Partial <Artist>
): Promise<Artist> => {
  const response = await axiosInstance.patch<Artist>(
    `http://localhost:8081/artist/${id}`,
    updatedArtist
  );
  return response.data;
};

export const deleteArtist = async (id: number): Promise<void> => {
  await axiosInstance.delete(`http://localhost:8081/artist/${id}`);
};
