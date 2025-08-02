import axios from 'axios';
import { SignInData, SignupData } from '../Interfaces/AuthInterface';

const baseURL = import.meta.env.VITE_API_BASE_URL

export const signIn = async (data: SignInData) => {
  const response = await axios.post(`${baseURL}/auth/sign-in`, data);
  return response.data;
};

export const signUp = async (data: SignupData) => {
  const response = await axios.post(`${baseURL}/auth/sign-up`, data);
  return response.data;
};

