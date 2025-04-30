import { Artist } from "./ArtistInterface";
import { Song } from "./SongInteface";
import { User } from './UserInterface';

export interface Album {
  id: number;
  title: string;
  details: string;
  cdNumber: string;
  photo: string;
  year: number;
  listOfSongs: Song[];
  artistName: string;
  displayArtistName: string;
  genres: string[];
  createdAt: Date;
}

export interface AlbumFormData {
  title: string;
  artistId: number;
  details: string;
  cdNumber: string;
  year: number | undefined;
  photo: string;
  genres: string[];
  displayArtistName: string;
  listOfSongs: Song[];
}

export interface AlbumCardProps {
  album: Album;
  onClick?: () => void;
}

export interface AlbumGridProps {
  albums: Album[];
  onClick?: (album: Album) => void;
}

export interface EditAlbumProps {
  albumId: number;
  onClose: () => void;
}

export interface AlbumSongsModalProps {
  isOpen: boolean;
  album: Album;
  onClose: () => void;
}

export interface AlbumFormFieldsProps {
  formData: AlbumFormData;
  songsInput: string;
  setSongsInput: (val: string) => void;
  handleChange: (e: React.ChangeEvent<any>) => void;
  artists: Artist[];
  setShowArtistModal?: (val: boolean) => void;
  isEditMode: boolean;
  goToSongsStep?: () => void;
}

export type EditAlbumSongsProps = {
  songsInput: string;
  setSongsInput: (value: string) => void;
  goBack: () => void;
};

export interface AlbumFormLayoutProps {
  artists: Artist[];
  formData: any;
  songsInput: string[];
  setSongsInput: (songs: string[]) => void;
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  handleSubmit: (e: React.FormEvent) => void;
  setShowArtistModal: (value: boolean) => void;
}