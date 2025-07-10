import { useEffect, useState } from "react";
import { fetchSummaryStats, fetchMostVisitedAlbums, fetchMostVisitedArtists } from "../../services/statsService";
import { StatsState, SummaryStats, VisitStat } from "../../Interfaces/StatsInterfaces";

export function useStats() {
    const [state, setState] = useState<StatsState>({
        summary: null,
        mostVisitedAlbums: [],
        mostVisitedArtists: [],
        loading: true,
        error: null,
    });

    useEffect(() => {
        const loadStats = async () => {
            try {
                const [summaryData, albumsData, artistsData] = await Promise.all([
                    fetchSummaryStats(),
                    fetchMostVisitedAlbums(),
                    fetchMostVisitedArtists(),
                ]);

                setState({
                    summary: summaryData,
                    mostVisitedAlbums: albumsData,
                    mostVisitedArtists: artistsData,
                    loading: false,
                    error: null,
                });
            } catch (err) {
                setState({
                    summary: null,
                    mostVisitedAlbums: [],
                    mostVisitedArtists: [],
                    loading: false,
                    error: (err as Error).message,
                });
            }
        };

        loadStats();
    }, []);

    return state;
}
