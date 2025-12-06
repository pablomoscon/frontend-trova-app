import axios from 'axios';
import { SignInData, SignupData } from '../Interfaces/AuthInterface';
import { User } from '../Interfaces/UserInterface';

const baseURL = import.meta.env.VITE_API_BASE_URL

export const signIn = async (data: SignInData) => {
  const response = await axios.post(`${baseURL}/auth/sign-in`, data);
  return response.data;
};

export const signUp = async (data: SignupData) => {
  const response = await axios.post(`${baseURL}/auth/sign-up`, data);
  return response.data;
};


const STORAGE_KEY = "user";

export const loadStoredUser = (): User | null => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) return null;

  try {
    return JSON.parse(stored) as User;
  } catch {
    localStorage.removeItem(STORAGE_KEY);
    return null;
  }
};

export const saveUser = (user: User) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
};

export const clearUser = () => {
  localStorage.removeItem(STORAGE_KEY);
};
