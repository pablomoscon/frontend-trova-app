export interface User {
  id: string;
  username: string;
  name: string;
  email: string;
  role: 'ADMIN' | 'USER';
  token: string;
  createdAt?: string;
  status?: 'ACTIVE' | 'SUSPENDED' | 'DELETED';
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

export interface UsersData {
 content: User[];
  totalPages: number;
  currentPage: number;
  totalElements: number;
}
export interface SearchUsersProps {
  content: User[];
  isLoading: boolean;
  error: string | null;
  totalPages: number;
  refresh: () => void;
  currentPage: number;
}

export interface DetailRowProps {
  icon: React.ReactNode;
  label?: string;
  value: string | React.ReactNode;
}
