export interface SummaryStats {
  totalUsers: number;
  suspendedUsers: number;
  activeUsers: number;
  deletedUsers: number;
  totalAlbums: number;
  suspendedAlbums: number;
  totalArtists: number;
  suspendedArtists: number;
}

export interface VisitStat {
  albumId?: number;
  artistId?: number;
  title?: string;
  name?: string;
  visits: number;
  visitTime?: string;
}

export interface StatsState {
  summary: SummaryStats | null;
  mostVisitedAlbums: VisitStat[];
  mostVisitedArtists: VisitStat[];
  loading: boolean;
  error: string | null;
}
