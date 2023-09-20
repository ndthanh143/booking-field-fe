import { StripePaymentPayload } from './stripe.dto';
import axiosInstance from '@/utils/axiosConfig';

const stripeService = {
  getClientSecret: async (payload: StripePaymentPayload) => {
    const { currency, amount } = payload;
    const { data } = await axiosInstance.post('/stripe/create-payment-intent', {
      currency,
      amount,
    });

    return data.clientSecret;
  },
};

export default stripeService;
