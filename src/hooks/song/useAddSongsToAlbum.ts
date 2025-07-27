import { useState } from 'react';
import { Song } from '../../Interfaces/SongInterface';
import { addSongsToAlbum } from '../../services/albumService';

export const useAddSongsToAlbum = (
    albumId: number,
    onSuccess: () => void
) => {
    const [newSongs, setNewSongs] = useState<Song[]>([]);
    const [loading, setLoading] = useState(false);

    const handleNewSongChange = (
        index: number,
        field: keyof Song,
        value: string
    ) => {
        setNewSongs((prev) =>
            prev.map((song, i) =>
                i === index ? { ...song, [field]: value } : song
            )
        );
    };

    const addEmptyNewSong = () => {
        setNewSongs((prev) => [
            ...prev,
            { id: undefined, name: '', duration: '', artistName: '' },
        ]);
    };

    const addSongs = async (songsToAdd: Song[]) => {
        if (songsToAdd.length === 0) return;

        setLoading(true);
        try {
            const created = await addSongsToAlbum(albumId, songsToAdd);
            setNewSongs([]);
            onSuccess();
        } catch (error) {
            throw error;
        } finally {
            setLoading(false);
        }
    };

    return {
        newSongs,
        loading,
        handleNewSongChange,
        addEmptyNewSong,
        addSongs,
        setNewSongs,
    };
};
