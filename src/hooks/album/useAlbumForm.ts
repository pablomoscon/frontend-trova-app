import { useState, useEffect } from "react";
import { AlbumFormData } from "../../Interfaces/AlbumInterface";

export const useAlbumForm = () => {
    const [formData, setFormData] = useState<AlbumFormData>({
        title: '',
        artistId: 0,
        listOfSongs: [{ title: '', duration: '' }],
        details: '',
        genres: [],
        cdNumber: '',
        year: undefined,
        photo: undefined,
        displayArtistName: '',
    });

    const [songsInput, setSongsInput] = useState<string>('');
    const [imagePreview, setImagePreview] = useState<string | null>(null);

    useEffect(() => {
        if (formData.photo instanceof File) {
            const url = URL.createObjectURL(formData.photo);
            setImagePreview(url);

            return () => URL.revokeObjectURL(url); 
        } else if (typeof formData.photo === 'string') {
            setImagePreview(formData.photo); 
        } else {
            setImagePreview(null);
        }
    }, [formData.photo]);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement> | { target: { name: string, value: any } }
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setFormData((prev) => ({
                ...prev,
                photo: file,
            }));
        }
    };

    const resetForm = () => {
        setFormData({
            title: '',
            artistId: 0,
            genres: [],
            details: '',
            cdNumber: '',
            year: undefined,
            photo: undefined,
            listOfSongs: [{ title: '', duration: '' }],
            displayArtistName: '',
        });
        setSongsInput('');
        setImagePreview(null);
    };

    return {
        formData,
        handleChange,
        songsInput,
        setSongsInput,
        resetForm,
        setFormData,
        handleFileChange,
        imagePreview,
    };
};
