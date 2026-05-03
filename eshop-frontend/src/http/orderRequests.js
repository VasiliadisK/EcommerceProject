import api from './axiosInstance';


export const getClientSecretStripe = ({ amount, currency }) =>
  api.post("/order/stripe-client-secret", { amount, currency });

export const stripePaymentConfirmation = ({ paymentBody }) =>
  api.post(`/order/users/payments/confirmOrder`, paymentBody);
