import api from './axiosInstance';


export const getAllCategories = () =>
  api.get(`/public/categories`);

export const createCategory = (categoryName) =>
  api.post(`/admin/category`, { categoryName });

export const updateCategory = ({ categoryId, categoryName }) =>
  api.put(`/admin/categories/${categoryId}`, { categoryName });

export const deleteCategory = (categoryId) =>
  api.delete(`/admin/categories/${categoryId}`);