import React, { useEffect, useState } from 'react';
import { Artist, ArtistEditModalProps } from '../../../Interfaces/ArtistInterface';
import { fetchArtistById, editArtist } from '../../../services/artistService';

const ArtistEditModal: React.FC<ArtistEditModalProps> = ({
  artistId,
  onClose,
  onSaveSuccess,
}) => {
  const [artistData, setArtistData] = useState<Artist | null>(null);
  const [name, setName] = useState('');
  const [nationality, setNationality] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadArtist() {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchArtistById(artistId);
        setArtistData(data);
        setName(data.name);
        setNationality(data.nationality);
      } catch {
        setError('Error al cargar los datos del artista');
      } finally {
        setLoading(false);
      }
    }
    loadArtist();
  }, [artistId]);

  const handleSave = async () => {
    if (!artistData) return;
    if (!name.trim()) {
      setError('El nombre no puede estar vacío');
      return;
    }

    try {
      setSaving(true);
      setError(null);
      await editArtist(artistData.id!, { ...artistData, name, nationality });
      onSaveSuccess();
      onClose();
    } catch {
      setError('Error al guardar los cambios');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className='modal'>Cargando...</div>;

  return (
    <div className='fixed inset-0 backdrop-blur-lg bg-opacity-40 p-20 flex items-center justify-center z-50'>
      <div className='bg-white rounded-md p-6 w-full max-w-md'>
        <h2 className='text-xl font-semibold mb-4'>Editar Artista</h2>

        {error && <p className='text-red-600 mb-2'>{error}</p>}

        <label className='block mb-1'>Nombre:</label>
        <input
          placeholder='Nombre del artista'
          type='text'
          value={name}
          onChange={(e) => setName(e.target.value)}
          className='w-full border border-gray-300 rounded-md p-2 mb-4'
        />

        <label className='block mb-1'>Nacionalidad:</label>
        <input
          placeholder='Nacionalidad del artista'
          type='text'
          value={nationality}
          onChange={(e) => setNationality(e.target.value)}
          className='w-full border border-gray-300 rounded-md p-2 mb-4'
        />

        <div className='flex justify-end space-x-4'>
          <button
            onClick={onClose}
            disabled={saving}
            className='btn btn-secondary'
          >
            Cancelar
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className='btn btn-primary'
          >
            {saving ? 'Guardando...' : 'Guardar'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ArtistEditModal;
