import { AlbumFormData } from "../Interfaces/AlbumInterface";

export const getChangedData = (
    initial: AlbumFormData,
    current: AlbumFormData
): AlbumFormData => {
    const changed: Partial<AlbumFormData> = {};

    const compare = (a: any, b: any) => JSON.stringify(a) !== JSON.stringify(b);

    if (initial.title.trim() !== current.title.trim()) changed.title = current.title.trim();
    if (initial.details.trim() !== current.details.trim()) changed.details = current.details.trim();
    if (initial.cdNumber !== current.cdNumber) changed.cdNumber = current.cdNumber;
    if (
        (typeof initial.photo === 'string' ? initial.photo.trim() : initial.photo) !==
        (typeof current.photo === 'string' ? current.photo.trim() : current.photo)
    ) {
        changed.photo = typeof current.photo === 'string' ? current.photo.trim() : current.photo;
    }
    if (initial.year !== current.year) changed.year = current.year;
    if (initial.artistId !== current.artistId) changed.artistId = current.artistId;
    if (initial.displayArtistName.trim() !== current.displayArtistName.trim())
        changed.displayArtistName = current.displayArtistName.trim();
    if (compare(initial.genres, current.genres)) changed.genres = current.genres;

    return changed as AlbumFormData;
};
