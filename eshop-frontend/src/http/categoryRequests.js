import api from './axiosInstance';


export const getAllCategories = () => 
  api.get(`/public/categories`);