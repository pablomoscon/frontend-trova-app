export interface User {
  id: string;
  username: string;
  name: string;
  email: string;
  role: 'admin' | 'user';
  token: string;
  createdAt?: string;
  status?: 'active' | 'inactive';
  lastLogin?: string; 
  failedLoginAttempts?: number;
  activities?: string[];
}

export interface EditUserProps {
  userId: string;
  onClose: () => void;
}
