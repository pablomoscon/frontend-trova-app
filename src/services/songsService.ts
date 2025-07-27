import axiosInstance from '../api/axiosInstance';
import { Song } from '../Interfaces/SongInterface';

export const fetchSongsById = async (id: number): Promise<Song> => {
  const response = await axiosInstance.get<Song>(
    `http://localhost:8081/songs/${id}`
  );
  return response.data;
};


export const editSongs = async (
  id: number,
  updatedSong: Partial<Song>
): Promise<Song> => {
  const response = await axiosInstance.patch<Song>(
    `http://localhost:8081/songs/${id}`,
    updatedSong
  );
  return response.data;
};


export const deleteSongs = async (ids: number[]) => {
  if (!Array.isArray(ids) || ids.some(id => typeof id !== 'number')) {
    throw new Error('Invalid song ID list');
  }

  const response = await axiosInstance.delete('http://localhost:8081/songs', {
    data: ids,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return response.data;
};
