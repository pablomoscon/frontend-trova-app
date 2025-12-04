import { SummaryStats, VisitStat } from '../Interfaces/StatsInterfaces';
import axiosInstance from '../api/axiosInstance';

export const fetchSummaryStats = async (): Promise<SummaryStats> => {
    try {
        const response = await axiosInstance.get<SummaryStats>('/stats/summary');
        return response.data;
    } catch (err) {
        console.error('Error fetching summary statistics:', err);
        throw err;
    }
};

export const fetchMostVisitedAlbums = async (): Promise<VisitStat[]> => {
    try {
        const response = await axiosInstance.get<VisitStat[]>('/stats/most-visited-albums');
        return response.data;
    } catch (err) {
        console.error('Error fetching most visited albums:', err);
        throw err;
    }
};

export const fetchMostVisitedArtists = async (): Promise<VisitStat[]> => {
    try {
        const response = await axiosInstance.get<VisitStat[]>('/stats/most-visited-artists');
        return response.data;
    } catch (err) {
        console.error('Error fetching most visited artists:', err);
        throw err;
    }
};


