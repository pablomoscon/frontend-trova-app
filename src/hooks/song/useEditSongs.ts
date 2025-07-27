import { useState } from 'react';
import { Song } from '../../Interfaces/SongInterface';
import { editSongs } from '../../services/songsService';

export const useEditSongs = (
    initialSongs: Song[],
    onSuccess: () => void
) => {
    const [editedSongs, setEditedSongs] = useState<Song[]>(initialSongs);
    const [loading, setLoading] = useState(false);

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
                    editSongs(song.id!, {
                        name: song.name,
                        duration: song.duration,
                        artistName: song.artistName,
                    })
                )
            );

            onSuccess();
        } catch (error) {
            throw error;
        } finally {
            setLoading(false);
        }
    };

    return {
        editedSongs,
        setEditedSongs,
        handleEditedSongChange,
        saveSongs,
        loading,
    };
};
