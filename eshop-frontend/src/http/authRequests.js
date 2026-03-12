import api from './axiosInstance';
import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient();

export const login = (credentials) =>
  api.post('/auth/signin', credentials);

export const register = (userData) =>
  api.post('/auth/signup', userData);

export const logout = () =>
  api.post('/auth/signout');