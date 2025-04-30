import { Album } from "./AlbumInterface";

export interface Artist {
  id?: number;
  name: string;
  details: string;
  nationality: string;
  photo: string;
  albums?: Album[];
  createdAt: Date;
}

export interface ArtistFormData {
  name: string;
  nationality: string;
  details: string;
  photo: string;
}

export interface ArtistProps {
  artistId: number;
}

export interface ArtistHeaderProps {
  artist: Artist;
  }

export interface NewArtistModalProps {
  formData: ArtistFormData;
  setFormData: React.Dispatch<React.SetStateAction<ArtistFormData>>;
  onClose: () => void;
  onSave: () => void;
}

export interface CreateArtistFormProps {
  onSave: (data: ArtistFormData) => void;
}