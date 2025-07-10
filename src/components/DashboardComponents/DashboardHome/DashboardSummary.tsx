import React from 'react';
import { DashboardSummaryProps } from '../../../Interfaces/DashboardInterface';
import SummaryCard from './SummaryCard';


const DashboardSummary: React.FC<DashboardSummaryProps> = ({ summary }) => (
  <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
    <SummaryCard
      title='Álbumes'
      value={summary?.totalAlbums}
      note={`Activos: ${summary?.activeAlbums} | Suspendidos: ${summary?.suspendedAlbums}`}
      color='green'
    />
    <SummaryCard
      title='Artistas'
      value={summary?.totalArtists}
      note={`Activos: ${summary?.activeArtist} | Suspendidos: ${summary?.suspendedArtists}`}
      color='purple'
    />
    <SummaryCard
      title='Usuarios'
      value={summary?.totalUsers}
      note={`Activos: ${summary?.activeUsers} | Suspendidos: ${summary?.suspendedUsers} | Eliminados: ${summary?.deletedUsers}`}
      color='blue'
    />
  </div>
);

export default DashboardSummary;
