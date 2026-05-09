import api from './axiosInstance';


export const getClientSecretStripe = ({ amount, currency }) =>
  api.post("/order/stripe-client-secret", { amount, currency });

export const stripePaymentConfirmation = ({ paymentBody }) =>
  api.post(`/order/users/payments/confirmOrder`, paymentBody);

export const getAllOrdersAdmin = ({ pageNumber, pageSize }) =>
  api.get(`/admin/orders?pageNumber=${pageNumber}&pageSize=${pageSize}`);

export const updateOrderStatus = ({ orderId, status }) =>
  api.patch(`/admin/orders/${orderId}/orderStatus/${status}`);
