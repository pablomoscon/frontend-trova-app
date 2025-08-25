import axios from 'axios';
import { Artist, ArtistsData } from '../Interfaces/ArtistInterface';
import axiosInstance from '../api/axiosInstance';

const baseURL = import.meta.env.VITE_API_BASE_URL

export const fetchArtists = async (
  page: number,
  size: number,
  status?: string
): Promise<ArtistsData> => {
  const params: any = { page, size };
  if (status) {
    params.status = status;
  }
  const { data } = await axios.get<ArtistsData>(`${baseURL}/artist`, { params });
  return data;
};

export const fetchArtistById = async (id: number): Promise<Artist> => {
  const response = await axios.get<Artist>(
    `${baseURL}/artist/${id}`,
    { withCredentials: true }
  );
  return response.data;
};

export const fetchArtistsSummary = async (
  page: number,
  size: number,
  status?: string
): Promise<ArtistsData> => {
  const params: any = { page, size };
  if (status) {
    params.status = status;
  }
  const { data } = await axiosInstance.get<ArtistsData>('/artist/summary', { params });
  return data;
};

export const searchArtists = async (
  term: string,
  page: number,        
  size: number
): Promise<{ content: Artist[]; totalPages: number }> => {
  const { data } = await axiosInstance.get('/artist/search', {
    params: { q: term, page, size },
  });
  return data;
};

export const createArtist = async (formData: FormData): Promise<Artist> => {
  try {
    const response = await axiosInstance.post<Artist>(
      '/artist',
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
  formData: FormData
): Promise<Artist> => {
  const response = await axiosInstance.patch<Artist>(
    `/artist/${id}`,
    formData,
    { headers: { 'Content-Type': 'multipart/form-data' } }
  );
  return response.data;
};

export const deleteArtist = async (id: number): Promise<void> => {
  await axiosInstance.delete(`/artist/${id}`);
};

export const fetchArtistsWithAlbums = async (page: number, size: number): Promise<ArtistsData> => {
  const { data } = await axiosInstance.get<ArtistsData>('/artist/with-albums', {
    params: { page, size }
  });
  return data;
};
