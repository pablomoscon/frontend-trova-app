import axios from 'axios';
import { Artist } from '../Interfaces/ArtistInterface';
import axiosInstance from '../api/axiosInstance';

export const fetchArtist = async (
  includeAlbums: boolean = false
): Promise<Artist[]> => {
  const response = await fetch(
    `http://localhost:8081/artist?includeAlbums=${includeAlbums}`
  );
  
  if (!response.ok) {
    const text = await response.text();
    console.error('Server responded with:', text);
    throw new Error('Failed to fetch artists');
  }
  return await response.json();
};

export const fetchArtistById = async (id: number): Promise<Artist> => {
  const response = await axios.get<Artist>(
    `http://localhost:8081/artist/${id}`
  );
  return response.data;
};

export const createArtist = async (newArtist: Artist): Promise<Artist> => {
  const response = await axiosInstance.post<Artist>(
    'http://localhost:8081/artist',
    newArtist
  );
  return response.data;
};

export const editArtist = async (
  id: number,
  updatedArtist: Artist
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
