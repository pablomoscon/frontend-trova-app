import { useEffect, useState } from "react";
import { Artist } from "../../Interfaces/ArtistInterface";
import { AlbumFormData } from "../../Interfaces/AlbumInterface";
import { useAlbumForm } from "./useAlbumForm";
import { fetchArtist } from "../../services/artistService";
import { editAlbum, fetchAlbumById } from "../../services/albumService";
import { showErrorAlert, showSuccessAlert } from "../../utils/showAlertUtils";
import { getChangedData } from "../../utils/getChangedData";
import { useLoading } from "../common/useLoading";


export const useAlbumEdit = (albumId: number, onClose: () => void) => {
    const { formData, handleChange, songsInput, setSongsInput, setFormData } = useAlbumForm();
    const { loading, startLoading, stopLoading } = useLoading();

    const [artists, setArtists] = useState<Artist[]>([]);
    const [initialData, setInitialData] = useState<AlbumFormData | null>(null);

    useEffect(() => {
        const handleEscKey = (event: KeyboardEvent) => {
            if (event.key === 'Escape') onClose();
        };
        document.addEventListener('keydown', handleEscKey);
        return () => document.removeEventListener('keydown', handleEscKey);
    }, [onClose]);

    useEffect(() => {
        const loadData = async () => {
            try {
                startLoading();
                const album = await fetchAlbumById(albumId);
                const allArtists = await fetchArtist();

                const matchingArtist = allArtists.find(a => a.name === album.artistName);
                const loadedData: AlbumFormData = {
                    title: album.title,
                    year: album.year ?? 0,
                    photo: album.photo,
                    artistId: matchingArtist?.id ? Number(matchingArtist.id) : 0,
                    details: album.details,
                    cdNumber: album.cdNumber,
                    genres: album.genres ?? [],
                    listOfSongs: album.listOfSongs,
                    displayArtistName: album.displayArtistName,
                };

                setFormData(loadedData);
                setInitialData(loadedData);
                const songsText = album.listOfSongs.map(song => song.name).join(', ');
                setSongsInput(songsText);
                setArtists(allArtists);
            } catch (error) {
                console.error('Error al cargar álbum', error);
            } finally {
                stopLoading();
            }
        };

        loadData();
    }, [albumId]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!initialData) return;

        const updatedData = getChangedData(initialData, formData);
        if (Object.keys(updatedData).length === 0) {
            showErrorAlert('No se han realizado cambios');
            return;
        }

        try {
            await editAlbum(albumId, updatedData);
            showSuccessAlert('Álbum editado correctamente');
            onClose();
        } catch (error) {
            showErrorAlert('Error al editar álbum');
        }
    };

    return {
        formData,
        handleChange,
        songsInput,
        setSongsInput,
        artists,
        loading,
        handleSubmit,
    };
};
