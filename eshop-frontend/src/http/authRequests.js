import api from './axiosInstance';


export const login = (credentials) =>
  api.post('/auth/signin', credentials);

export const register = (userData) =>
  api.post('/auth/signup', userData);

export const logout = () =>
  api.post('/auth/signout');

export const getLoggedInUser = () => 
  api.get('/auth/LoggedInUser');

export const updatePasswordOfLoggedInUser = (data) => 
  api.post('/auth/changeLoggedInUserPassword',data)