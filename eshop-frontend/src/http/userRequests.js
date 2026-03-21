import api from './axiosInstance';

export const updateUserData = (userId, userData) => 
  api.put(`/users/${userId}`, userData);