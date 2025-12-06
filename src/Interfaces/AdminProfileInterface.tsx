import { User } from "./UserInterface";

export interface AdminStatsProps {
  stats: {
    lastLogin?: string;
    createdAt?: string;
    failedAttempts?: number;
    activities?: string[];
  };
}
export interface AdminErrorMessageProps {
  message: string;
}

export interface AdminCoverImageProps {
  src: string;
  placeholder: string;
  alt: string;
}

export interface AdminAvatarProps {
  username: string;
}

export interface AdminMainContentProps {
  user: User;
}
