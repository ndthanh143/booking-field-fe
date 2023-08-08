import { IStripePaymentPayload } from './stripe.dto';
import axiosInstance from '@/utils/axiosConfig';

export const stripePayment = async (payload: IStripePaymentPayload) => {
  const { paymentMethodId, amount } = payload;
  console.log('Hahaha');
  const { data } = await axiosInstance.post('/charge', {
    id: paymentMethodId,
    amount,
  });

  return data;
};

export const getClientSecret = async () => {
  const { data } = await axiosInstance.post('/charge/create-payment-intent');

  return data.clientSecret;
};
