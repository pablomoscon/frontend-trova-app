export interface User {
  id: string;
  username: string;
  name: string;
  email: string;
  role: 'admin' | 'user';
  token: string;
  createdAt?: string;
  status?: 'ACTIVE' | 'SUSPENDED';
  lastLogin?: string; 
  failedLoginAttempts?: number;
  activities?: string[];
}

export interface EditUserProps {
  userId: string;
  onClose: () => void;
}
export interface UserCardProps {
  user: User;
}
export interface UserDetailModalProps {
  user: User;
  onClose: () => void;
}

export interface UserRowProps {
  user: User;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onToggleStatus: (user: User) => void;
}
