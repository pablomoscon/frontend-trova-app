import { Album } from "../Interfaces/AlbumInterface";

export const sortAlbums = (albums: Album[] = []) => {
    return [...albums].sort((a, b) => (a.id ?? 0) - (b.id ?? 0));
};
