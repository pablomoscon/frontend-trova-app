import { Album } from '../Interfaces/AlbumInterface';

export const groupAlbumsByArtist = (albums: Album[]): Record<string, Album[]> => {
    const grouped = albums.reduce((acc, album) => {
        const artist = album.artistName || 'Unknown Artist';
        if (!acc[artist]) acc[artist] = [];
        acc[artist].push(album);
        return acc;
    }, {} as Record<string, Album[]>);

    Object.values(grouped).forEach((list) =>
        list.sort((a, b) => a.title.localeCompare(b.title))
    );

    const ordered: Record<string, Album[]> = {};
    Object.keys(grouped)
        .sort((a, b) => a.localeCompare(b))
        .forEach((artist) => {
            ordered[artist] = grouped[artist];
        });

    return ordered;
};
