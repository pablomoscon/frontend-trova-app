import { useEffect, useState } from 'react';
import { fetchMostVisitedArtists } from '../../services/statsService';
import { VisitStat } from '../../Interfaces/StatsInterfaces';

export const useMostVisitedArtists = () => {
    const [artists, setArtists] = useState<VisitStat[]>([]);
    useEffect(() => {
        fetchMostVisitedArtists().then(setArtists);
    }, []);
    return artists;
};
