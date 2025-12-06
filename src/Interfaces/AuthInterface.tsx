import { User } from "./UserInterface";

export interface AuthContextType {
  user: User | null;
  login: (userData: User) => void;
  logout: () => void;
  isAdmin: boolean;
  isAuthenticated: boolean;
  token: string | null;
}

export interface SignInData {
  username: string;
  password: string;
}

export interface SignupData {
  username: string;
  name: string;
  photo?: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface SignupErrors {
  name: string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: string;
}

export interface SignInValidationResult {
  isValid: boolean;
  errors: {
    username?: string;
    password?: string;
  };
  }

export interface AuthLayoutProps {
  title?: string;
  children: React.ReactNode;
}

export interface InputFieldProps {
  label: string;
  name?: string;
  id?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  placeholder?: string;
  error?: string | null;
}

export interface Credentials {
  username: string;
  password: string;
}

export interface SubmitButtonProps {
  text: string;
  disabled?: boolean;
}

export interface ScrollContextInterface {
  localActive: boolean;
  setLocalActive: (state: boolean) => void;
}

