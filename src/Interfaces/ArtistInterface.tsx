import { Album } from './AlbumInterface';

export interface Artist {
  id?: number;
  name: string;
  details: string;
  nationality: string;
  photo: string;
  albums?: Album[];
  createdAt: Date;
  status?: 'ACTIVE' | 'SUSPENDED';
}
export interface ArtistSelectProps {
  artistId: number;
  artists: Artist[];
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  setShowArtistModal?: React.Dispatch<React.SetStateAction<boolean>>;
  isEditMode: boolean;
}
export interface ArtistFormData {
  name: string;
  nationality: string;
  details: string;
  photo: File | undefined;
}
export interface ArtistProps {
  artistId: number;
}

export interface ArtistObjectProps {
  artist: Artist;
}

export interface NewArtistModalProps {
  formData: ArtistFormData;
  setFormData: React.Dispatch<React.SetStateAction<ArtistFormData>>;
  onClose: () => void;
  onSave: () => void;
}
export interface ArtistRowProps {
  artist: Artist;
  onDelete: (id: number) => void;
  onToggleStatus: (artist: Artist) => void;
  onEdit: (id: number) => void;
}

export interface CreateArtistFormProps {
  onSave: (data: ArtistFormData) => void;
}

export interface ArtistEditModalProps {
  artistId: number;
  onClose: () => void;
  onSaveSuccess: () => void;
}
export interface ArtistAlbumSectionProps {
  artistName: string;
  albums: Album[];
  onAlbumClick: (albumId: number) => void;
  page: number;
  totalPages: number;
  setPage: (page: number) => void;
  pageSize: number;
  setPageSize: (size: number) => void;
}

export interface ArtistEditModalProps {
  artistId: number;
  onClose: () => void;
  onSaveSuccess: () => void;
}

export interface ArtistsData {
  content: Artist[];
  totalPages: number;
  number: number;
  totalElements: number;
  size: number;
}

export interface ArtistDetailsModalProps {
  artist: Artist;
  onClose: () => void;
}
