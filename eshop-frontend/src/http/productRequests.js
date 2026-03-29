import api from './axiosInstance';


export const getAllProductsWithPagination = (params) => 
  api.get(`/public/products`, {params});