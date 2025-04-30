import axios from 'axios';
import { SignInData, SignupData } from '../Interfaces/AuthInterface';


export const signIn = async (data: SignInData) => {
  const response = await axios.post(`http://localhost:8081/auth/sign-in`, data);
  return response.data;
};

export const signUp = async (data: SignupData) => {
  const response = await axios.post(`http://localhost:8081/auth/sign-up`, data);
  return response.data;
};

