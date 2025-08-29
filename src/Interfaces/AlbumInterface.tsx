import type { Artist } from './ArtistInterface';
import type { Song } from './SongInterface';

export type Status = 'ACTIVE' | 'SUSPENDED';

export interface FileUploadProps {
  imagePreview?: string | null;
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface OptionalStepNavigation {
  goToSongsStep?: () => void;
}

export interface ArtistModalControl {
  setShowArtistModal?: (show: boolean) => void;
}

// Base interface with common Album link fields
interface AlbumLinks {
  appleMusicLink: string;
  spotifyLink: string;
  amazonMusicLink: string;
}

// Album main interface
export interface Album extends AlbumLinks {
  id: number;
  title: string;
  details: string;
  cdNumber: string;
  photo: string;
  year: number;
  listOfSongs?: Song[];
  artistName: string;
  displayArtistName: string;
  genres: string[];
  createdAt: Date;
  status?: Status;
}

// Album form data (for create/update)
export interface AlbumFormData extends AlbumLinks {
  title: string;
  artistId: number;
  details: string;
  cdNumber: string;
  year?: number;
  photo?: File | string;
  genres: string[];
  displayArtistName: string;
  listOfSongs: Song[];
  status?: Status;
}

// Pagination data for albums
export interface AlbumsData {
  albums: Album[];
  totalElements: number;
  totalPages: number;
  currentPage: number;
}

export interface AlbumCardProps {
  album: Album;
  onClick?: (albumId: number) => void;
  onImageLoad?: () => void;
}

export interface AlbumListProps {
  albums: Album[];
  onClick?: (albumId: number) => void;
  page: number;
  totalPages: number;
  setPage: (page: number) => void;
  pageSize: number;
  setPageSize: (size: number) => void;
  albumsLoading?: boolean;
  disableGlobalScroll?: (state: boolean) => void;
}

export interface EditAlbumProps {
  albumId: number;
  onClose: () => void;
}

export interface AlbumSongsModalProps {
  isOpen: boolean;
  albumId: number;
  onClose: () => void;
}

// Combined Album form fields props, reusing smaller interfaces
export interface AlbumFormFieldsProps
  extends FileUploadProps,
    OptionalStepNavigation,
    ArtistModalControl {
  formData: AlbumFormData;
  songsInput: string;
  setSongsInput: (val: string) => void;
  handleChange: (e: React.ChangeEvent<any>) => void;
  artists: Artist[];
  isEditMode: boolean;
}

export interface AlbumsByArtistResponse {
  albums: Album[];
  totalAlbums: number;
  currentPage: number;
  totalPages: number;
}

export interface AlbumImageFileUploadProps extends FileUploadProps {
  selectedFileName: string;
  setSelectedFileName: (name: string) => void;
}

export interface AlbumArtistSelectorProps extends ArtistModalControl {
  artistId: number;
  artists: Artist[];
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  isEditMode: boolean;
}

export interface AlbumGenreSelectorProps {
  selectedGenres: string[];
  onChange: (e: any) => void;
}

export interface AlbumSongInputsProps extends OptionalStepNavigation {
  listOfSongs: { name: string; duration: string }[];
  handleChange: (e: any) => void;
  isEditMode: boolean;
}

export interface TextInputProps {
  label: string;
  name: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  colSpan?: string;
  wrapperClass?: string;
  type?: string;
}

export interface TextAreaInputProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  rows?: number;
  colSpan?: string;
}

export interface AlbumRowProps {
  album: Album;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
  onToggleStatus: (album: Album) => void;
}

export interface EditAlbumSongsModalProps {
  songsInput: string;
  setSongsInput: React.Dispatch<React.SetStateAction<string>>;
  goBack: () => void;
  songs: Song[];
}

export interface AlbumFilterParams {
  page: number;
  size: number;
  artistName?: string[];
  year?: number[];
  genre?: string[];
  sort?: 'asc' | 'desc';
}

export interface AlbumFilterResponse {
  albums: Album[];
  currentPage: number;
  totalElements: number;
  totalPages: number;
}

export interface SearchAlbumsProps {
  albums: Album[];
  isLoading: boolean;
  error: string | null;
  totalPages: number;
  refresh: () => void;
  currentPage: number;
}

export interface UseManagementAlbumProps {
  page: number;
  setPage: (p: number) => void;
  pageSize: number;
  searchTerm: string;
}

export interface SearchAlbumsResultsProps {
  initialQuery?: string;
  pageSize?: number;
  onAlbumClick?: (id: number) => void;
}

export interface UseFetchAndSearchAlbumsResult {
  albums: Album[];
  totalPages: number;
  loading: boolean;
  error: string | null;
  reload: () => void;
}

export interface AlbumPlatformLinksProps {
  spotifyLink?: string;
  youtubeLink?: string;
  amazonMusicLink?: string;
  appleMusicLink?: string;
  iconSize?: string;
  spacing?: string;
  variant?: 'default' | 'colored';
}

export interface AlbumFiltersResponse {
  artists: string[];
  genres: string[];
  decades: string[];
};