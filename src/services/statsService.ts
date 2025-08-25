import { SummaryStats, VisitStat } from '../Interfaces/StatsInterfaces';
import axiosInstance from '../api/axiosInstance';

export const fetchSummaryStats = async (): Promise<SummaryStats> => {
    try {
        const response = await axiosInstance.get<SummaryStats>('/stats/summary');
        console.log('Request URL:', axiosInstance.defaults.baseURL + '/stats/summary');
        console.log('Fetched summary statistics:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error fetching summary statistics:', error);
        throw error;
    }
};

export const fetchMostVisitedAlbums = async (): Promise<VisitStat[]> => {
    try {
        const response = await axiosInstance.get<VisitStat[]>('/stats/most-visited-albums');
        return response.data;
    } catch (error) {
        console.error('Error fetching most visited albums:', error);
        throw error;
    }
};

export const fetchMostVisitedArtists = async (): Promise<VisitStat[]> => {
    try {
        const response = await axiosInstance.get<VisitStat[]>('/stats/most-visited-artists');
        return response.data;
    } catch (error) {
        console.error('Error fetching most visited artists:', error);
        throw error;
    }
};


