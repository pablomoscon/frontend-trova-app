import { useEffect, useState } from 'react';
import { Song } from '../../Interfaces/SongInterface';
import { editSong } from '../../services/songsService';

export const useEditSongs = (
    initialSongs: Song[],
    onSuccess: () => void,
    externalSetSongs?: React.Dispatch<React.SetStateAction<Song[]>>
) => {
    const [editedSongs, setEditedSongs] = useState<Song[]>(initialSongs);
    const setSongs = externalSetSongs || setEditedSongs;
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setEditedSongs(initialSongs);
        if (externalSetSongs) externalSetSongs(initialSongs);
    }, [initialSongs, externalSetSongs]);

    const handleEditedSongChange = (
        index: number,
        field: keyof Song,
        value: string
    ) => {
        setEditedSongs((prev) =>
            prev.map((song, i) =>
                i === index ? { ...song, [field]: value } : song
            )
        );
    };

    const saveSongs = async () => {
        setLoading(true);
        try {
            const songsToEdit = editedSongs.filter((song) => song.id !== undefined);
            if (songsToEdit.length === 0) {
                setLoading(false);
                return;
            }

            await Promise.all(
                songsToEdit.map((song) =>
                    editSong(song.id!, {
                        name: song.name,
                        duration: song.duration,
                        artistName: song.artistName,
                    })
                )
            );

            onSuccess();
        } catch (err) {
            console.log(err)
            throw err;
        } finally {
            setLoading(false);
        }
    };

    return {
        editedSongs,
        handleEditedSongChange,
        setEditedSongs: setSongs,
        saveSongs,
        loading,
    };
};
