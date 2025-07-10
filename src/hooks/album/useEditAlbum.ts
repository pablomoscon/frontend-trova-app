import { useEffect, useState } from "react";
import { Artist } from "../../Interfaces/ArtistInterface";
import { AlbumFormData } from "../../Interfaces/AlbumInterface";
import { useAlbumForm } from "./useAlbumForm";
import { editAlbum, fetchAlbumById } from "../../services/albumService";
import { showErrorAlert, showSuccessAlert } from "../../utils/showAlertUtils";
import { getChangedData } from "../../utils/getChangedData";
import { useLoading } from "../shared/useLoading";
import { fetchArtists } from "../../services/artistService";

export const useEditAlbum = (albumId: number, onClose: () => void) => {
    const {
        formData,
        handleChange,
        songsInput,
        setSongsInput,
        setFormData,
        handleFileChange,
        imagePreview,
    } = useAlbumForm();

    const { loading, startLoading, stopLoading } = useLoading();
    const [artists, setArtists] = useState<Artist[]>([]);
    const [initialData, setInitialData] = useState<AlbumFormData | null>(null);

    useEffect(() => {
        const loadData = async () => {
            try {
                startLoading();

                const album = await fetchAlbumById(albumId);

                const { content: artistList } = await fetchArtists(0, 100);  

                const matchingArtist = artistList.find(
                    (a) => a.name === album.artistName
                );
                
                const loadedData: AlbumFormData = {
                    title: album.title,
                    year: album.year ?? 0,
                    photo: album.photo,
                    artistId: matchingArtist?.id ?? 0,
                    details: album.details,
                    cdNumber: album.cdNumber,
                    genres: album.genres ?? [],
                    listOfSongs: album.listOfSongs ?? [],  
                    displayArtistName: album.displayArtistName,
                };

                setFormData(loadedData);
                setInitialData(loadedData);
                setSongsInput(
                    (album.listOfSongs ?? []).map((s) => s.title).join(", ")
                );
                setArtists(artistList);              
            } catch (error) {
                console.error("Error al cargar álbum", error);
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
            return showErrorAlert("No se han realizado cambios", "Editá algún campo para guardar.");
        }

        try {
            await editAlbum(albumId, updatedData);
            showSuccessAlert("Álbum editado correctamente", "Los cambios fueron guardados.");
            onClose();
        } catch (error) {
            showErrorAlert("Error al editar", "Intentalo nuevamente.");
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
        handleFileChange,
        imagePreview,
    };
};
