import { useEffect, useState } from 'react';
import { fetchSummaryStats } from '../../services/statsService';
import { SummaryStats } from '../../Interfaces/StatsInterfaces';

export const useStatsSummary = () => {
    const [summary, setSummary] = useState<SummaryStats | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchSummaryStats()
            .then(setSummary)
            .catch((err) => setError(err.message))
            .finally(() => setLoading(false));
    }, []);

    return { summary, loading, error };
};
