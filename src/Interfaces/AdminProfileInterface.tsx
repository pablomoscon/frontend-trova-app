export interface AdminStatsProps {
  stats: {
    lastLogin?: string;
    createdAt?: string;
    failedAttempts?: number;
    activities?: string[];
  };
}
