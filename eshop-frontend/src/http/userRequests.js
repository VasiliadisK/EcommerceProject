import api from './axiosInstance';

export const updateUserData = (userId, userData) => 
  api.put(`/users/${userId}`, userData);

export const getAllUsersAdmin = ({ pageNumber, pageSize }) =>
    api.get(`/admin/users?pageNumber=${pageNumber}&pageSize=${pageSize}`);

export const createUserAdmin = (userData) =>
    api.post(`/admin/users`, userData);

export const updateUserAdmin = ({ userId, userData }) =>
    api.put(`/users/${userId}`, userData);

export const deleteUserAdmin = (userId) =>
    api.delete(`/admin/users/${userId}`);