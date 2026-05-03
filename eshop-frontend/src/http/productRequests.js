import api from './axiosInstance';

export const getAllProductsWithPagination = (params) =>
  api.get(`/public/products`, { params });

export const getUserCart = () =>
  api.get(`/carts/users/cart`);

export const addProductToUserCart = ({ productId, productQuantity }) =>
  api.post(`/carts/products/${productId}/quantity/${productQuantity}`);

export const updateProductQuantityForCart = ({ productId, productQuantity }) =>
  api.put(`/cart/products/${productId}/quantity/${productQuantity}`); // το quantity παει 1 ή -1

export const removeProductFromCart = ({ productId }) =>
  api.delete(`/carts/userCart/product/${productId}`);

export const clearCart = () => 
  api.post(`/carts/userCart/clearCart`);

export const deleteProductAdmin = (productId) => 
  api.delete(`/admin/products/${productId}`)