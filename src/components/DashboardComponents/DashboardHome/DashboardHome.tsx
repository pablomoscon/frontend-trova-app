import React, { Suspense, useMemo } from 'react';
import Spinner from '../../Shared/Spinner';
import { useStatsSummary } from '../../../hooks/stats/useStatsSummary';
import { useMostVisitedAlbums } from '../../../hooks/stats/useMostVisitedAlbums';
import { useMostVisitedArtists } from '../../../hooks/stats/useMostVisitedArtists';
import DashboardHeader from './DashboardHeader';
import DashboardSummary from './DashboardSummary';

const ChartSection = React.lazy(() => import('./DashboardCharts'));

const LoadingOrError: React.FC<{
  loading: boolean;
  error: string | null;
  isDataReady: boolean;
  children: React.ReactNode;
}> = ({ loading, error, isDataReady, children }) => {
  if (loading || !isDataReady) return <Spinner />;
  if (error) return <div className='p-8 text-red-600'>{error}</div>;
  return <>{children}</>;
};

const useDashboardData = () => {
  const { summary, loading, error } = useStatsSummary();
  const mostVisitedAlbums = useMostVisitedAlbums();
  const mostVisitedArtists = useMostVisitedArtists();

  return { summary, loading, error, mostVisitedAlbums, mostVisitedArtists };
};

const DashboardHome: React.FC = () => {
  const { summary, loading, error, mostVisitedAlbums, mostVisitedArtists } =
    useDashboardData();

  const charts = useMemo(
    () => [
      {
        title: 'Álbumes más visitados',
        data: mostVisitedAlbums,
        dataKey: 'title',
      },
      {
        title: 'Artistas más visitados',
        data: mostVisitedArtists,
        dataKey: 'name',
      },
    ],
    [mostVisitedAlbums, mostVisitedArtists]
  );

  return (
    <div className='min-h-screen w-full'>
      <div className='flex-1 px-8 py-8 bg-[#E5E6E4]'>
        <DashboardHeader />

        <LoadingOrError loading={loading} error={error} isDataReady={!!summary}>
          <DashboardSummary summary={summary!} />

          <Suspense fallback={<div className='p-8'>Cargando gráficos...</div>}>
            <div className='mt-16 grid grid-cols-1 lg:grid-cols-1 gap-12 pb-20 px-4 lg:px-24'>
              {charts.map(({ title, data, dataKey }) => (
                <ChartSection
                  key={title}
                  title={title}
                  data={data}
                  dataKey={dataKey}
                />
              ))}
            </div>
          </Suspense>
        </LoadingOrError>
      </div>
    </div>
  );
};

export default DashboardHome;
