import axios from 'axios';
import axiosInstance from '../api/axiosInstance';
import { Song } from '../Interfaces/SongInterface';


const baseURL = import.meta.env.VITE_API_BASE_URL

//Fetch a single song by ID
export const fetchSongById = async (id: number): Promise<Song> => {
  const response = await axiosInstance.get<Song>(`/songs/${id}`);
  return response.data;
};


 // Fetch all songs for a given album ID
export const fetchSongsByAlbumId = async (albumId: number): Promise<Song[]> => {
  const response = await axios.get<Song[]>(`${ baseURL }/songs/albums/${albumId}`);
  return response.data;
};


//Edit a song by ID
export const editSong = async (id: number, updatedSong: Partial<Song>): Promise<Song> => {
  const response = await axiosInstance.patch<Song>(`/songs/${id}`, updatedSong);
  return response.data;
};


//Delete multiple songs by IDs
export const deleteSongs = async (ids: number[]): Promise<void> => {
  if (!Array.isArray(ids) || ids.some(id => typeof id !== 'number')) {
    throw new Error('Invalid song ID list');
  }

  await axiosInstance.delete('/songs', {
    data: ids,
    headers: {
      'Content-Type': 'application/json',
    },
  });
};
