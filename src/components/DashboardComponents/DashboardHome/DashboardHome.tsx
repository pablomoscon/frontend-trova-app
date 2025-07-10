import React from 'react';
import { useStats } from '../../../hooks/stats/useStats';
import DashboardHeader from './DashboardHeader';
import DashboardSummary from './DashboardSummary';
import ChartSection from './DashboardCharts';

const DashboardHome: React.FC = () => {
  const { summary, mostVisitedAlbums, mostVisitedArtists, loading, error } =
    useStats();

  if (loading) return <div className='p-8'>Loading statistics...</div>;
  if (error) return <div className='p-8 text-red-600'>{error}</div>;

  return (
    <div className='min-h-screen w-full'>
      <div className='flex-1 px-8 py-8 bg-[#E5E6E4]'>
        <DashboardHeader />
        <DashboardSummary summary={summary} />
        <div className='mt-16 grid grid-cols-1 lg:grid-cols-1 gap-12 pb-20 px-4 lg:px-24'>
          <ChartSection
            title='Álbumes más visitados'
            data={mostVisitedAlbums}
            dataKey='title'
          />
          <ChartSection
            title='Artistas más visitados'
            data={mostVisitedArtists}
            dataKey='name'
          />
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
