import { useEffect, useState } from 'react';
import { fetchMostVisitedAlbums } from '../../services/statsService';
import { VisitStat } from '../../Interfaces/StatsInterfaces';

export const useMostVisitedAlbums = () => {
    const [albums, setAlbums] = useState<VisitStat[]>([]); // 👈 no [] a secas
    useEffect(() => {
        fetchMostVisitedAlbums().then(setAlbums);
    }, []);
    return albums;
};
