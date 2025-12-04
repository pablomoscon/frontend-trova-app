import { AlbumFormData } from "../Interfaces/AlbumInterface";

// Compara strings ignorando espacios
const stringsDiffer = (a?: string | null, b?: string | null): boolean =>
    (a ?? "").trim() !== (b ?? "").trim();

// Para arrays simples (strings, canciones, etc.)
const shallowArrayDiff = <T>(a: T[], b: T[]): boolean => {
    if (a.length !== b.length) return true;
    return a.some((el, i) => el !== b[i]);
};

// Para strings o valores simples
const trimIfString = <T>(v: T): T =>
    typeof v === "string" ? (v.trim() as T) : v;

export const getChangedData = (
    initial: AlbumFormData,
    current: AlbumFormData
): Partial<AlbumFormData> => {

    const changed: Partial<AlbumFormData> = {};

    // --- STRINGS ---
    if (stringsDiffer(initial.title, current.title))
        changed.title = current.title.trim();

    if (stringsDiffer(initial.details, current.details))
        changed.details = current.details.trim();

    if (stringsDiffer(initial.displayArtistName, current.displayArtistName))
        changed.displayArtistName = current.displayArtistName.trim();

    if (stringsDiffer(initial.appleMusicLink, current.appleMusicLink))
        changed.appleMusicLink = current.appleMusicLink.trim();

    if (stringsDiffer(initial.spotifyLink, current.spotifyLink))
        changed.spotifyLink = current.spotifyLink.trim();

    if (stringsDiffer(initial.amazonMusicLink, current.amazonMusicLink))
        changed.amazonMusicLink = current.amazonMusicLink.trim();

    // --- NUMÉRICOS ---
    if (initial.cdNumber !== current.cdNumber)
        changed.cdNumber = current.cdNumber;

    if (initial.year !== current.year)
        changed.year = current.year;

    if (initial.artistId !== current.artistId)
        changed.artistId = current.artistId;

    // --- FILES / STRINGS (foto) ---
    const initialPhoto = trimIfString(initial.photo);
    const currentPhoto = trimIfString(current.photo);
    if (initialPhoto !== currentPhoto)
        changed.photo = currentPhoto;

    // --- ARRAYS ---
    if (shallowArrayDiff(initial.genres, current.genres))
        changed.genres = current.genres;

    // Comparación shallow para listOfSongs (por nombre)
    if (
        initial.listOfSongs.length !== current.listOfSongs.length ||
        initial.listOfSongs.some((s, i) => s.name !== current.listOfSongs[i].name)
    ) {
        changed.listOfSongs = current.listOfSongs;
    }

    return changed;
};
