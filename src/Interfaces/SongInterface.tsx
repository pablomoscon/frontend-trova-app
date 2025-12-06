export interface Song {
  id?: number;
  name: string;
  duration: string;
  artistName?: string;
}

export interface SongsSectionProps {
  title: string;
  songs: Song[];
  selectedSongIds?: number[];
  toggleSongSelection?: (id: number) => void;
  handleSongChange: (
    index: number,
    field: 'name' | 'duration',
    value: string
  ) => void;
  handleDeleteSong?: (songId: number) => void;
  onSubmit: (e: React.FormEvent) => void | Promise<void>;
  addEmptySong?: () => void;
  showCheckbox: boolean;
  showDeleteSelected?: boolean;
  onDeleteSelected?: () => void;
  disabled: boolean;
  submitButtonText: string;
}

export interface UseAlbumSongsResult {
  songs: Song[];
  loading: boolean;
  error: string | null;
}

export interface SongRowProps {
  song: Song;
  index: number;
  onUpdate: (index: number, field: 'name' | 'duration', value: string) => void;
}

export interface SongFieldProps {
  value: string;
  placeholder: string;
  onChange: (value: string) => void;
}