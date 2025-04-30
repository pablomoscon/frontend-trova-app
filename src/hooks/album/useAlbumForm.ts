import { useState } from "react";
import { AlbumFormData } from "../../Interfaces/AlbumInterface";

export const useAlbumForm = () => {
    const [formData, setFormData] = useState<AlbumFormData>({
        title: '',
        artistId: 0,
        listOfSongs: [{ name: '', duration: '' }], 
        details: '',
        genres: [],
        cdNumber: '',
        year: undefined,
        photo: '',
        displayArtistName: '',

    });

    const [songsInput, setSongsInput] = useState<string>('');

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement> | { target: { name: string, value: any } }
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const resetForm = () => {
        setFormData({
            title: '',
            artistId: 0,
            genres: [],
            details: '',
            cdNumber: '',
            year: undefined,
            photo: '',
            listOfSongs: [{ name: '', duration: '' }], 
            displayArtistName: '',
        });
        setSongsInput('');
    };

    return {
        formData,
        handleChange,
        songsInput,
        setSongsInput,
        resetForm,
        setFormData,
    };
};
