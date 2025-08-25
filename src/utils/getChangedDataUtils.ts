import { AlbumFormData } from "../Interfaces/AlbumInterface";

export const getChangedData = (
    initial: AlbumFormData,
    current: AlbumFormData
): Partial<AlbumFormData> => {
    const changed: Partial<AlbumFormData> = {};

    const compare = (a: any, b: any) => JSON.stringify(a) !== JSON.stringify(b);

    if ((initial.title ?? '').trim() !== (current.title ?? '').trim()) changed.title = current.title.trim();
    if ((initial.details ?? '').trim() !== (current.details ?? '').trim()) changed.details = current.details.trim();
    if (initial.cdNumber !== current.cdNumber) changed.cdNumber = current.cdNumber;

    const trimOrKeep = (val: any) => (typeof val === 'string' ? val.trim() : val);

    if (trimOrKeep(initial.photo) !== trimOrKeep(current.photo)) {
        changed.photo = trimOrKeep(current.photo);
    }
    if (initial.year !== current.year) changed.year = current.year;
    if (initial.artistId !== current.artistId) changed.artistId = current.artistId;

    if ((initial.displayArtistName ?? '').trim() !== (current.displayArtistName ?? '').trim()) {
        changed.displayArtistName = current.displayArtistName.trim();
    }

    if (compare(initial.genres, current.genres)) changed.genres = current.genres;

    if ((initial.appleMusicLink ?? '').trim() !== (current.appleMusicLink ?? '').trim()) {
        changed.appleMusicLink = current.appleMusicLink.trim();
    }
    if ((initial.spotifyLink ?? '').trim() !== (current.spotifyLink ?? '').trim()) {
        changed.spotifyLink = current.spotifyLink.trim();
    }
    if ((initial.amazonMusicLink ?? '').trim() !== (current.amazonMusicLink ?? '').trim()) {
        changed.amazonMusicLink = current.amazonMusicLink.trim();
    }

    if (compare(initial.listOfSongs, current.listOfSongs)) {
        changed.listOfSongs = current.listOfSongs;
    }

    return changed;
};
