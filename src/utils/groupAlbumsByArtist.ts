import { Album } from "../Interfaces/AlbumInterface";


export const groupAlbumsByArtist = (albums: Album[]) => {
    return albums.reduce((acc, album) => {
        const artist = album.artistName || 'Unknown Artist';
        if (!acc[artist]) acc[artist] = [];
        acc[artist].push(album);
        return acc;
    }, {} as Record<string, Album[]>);
};