import axiosInstance from "../api/axiosInstance";
import { Song } from "../Interfaces/SongInteface";

export const fetchSongsById = async (id: number): Promise<Song> => {
  const response = await axiosInstance.get<Song>(`http://localhost:8081/songs/${id}`);
  return response.data;
};

export const editSongs = async (id: number, updatedSong: Partial<Song>): Promise<Song> => {
    const response = await axiosInstance.patch<Song>(`http://localhost:8081/songs/${id}`, updatedSong);
    return response.data;
}
    