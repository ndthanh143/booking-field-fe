import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useQuery } from '@tanstack/react-query';
import PaymentForm, { PaymentFormProps } from './PaymentForm';
import { getClientSecret } from '@/services/stripe/stripe.service';

export interface SripeContainerProps extends PaymentFormProps {
  currency: string;
  amount: number;
}
export default function StripeContainer({ currency, amount, onSubmit }: SripeContainerProps) {
  const STRIPE_PUBLIC_KEY = import.meta.env.VITE_STRIPE_PUBLIC_KEY;

  const stripePromise = loadStripe(STRIPE_PUBLIC_KEY);

  const { data: clientSecret } = useQuery({
    queryKey: ['ClientSecretKey'],
    queryFn: () => getClientSecret({ currency, amount }),
  });

  return (
    <>
      {clientSecret && stripePromise && (
        <Elements stripe={stripePromise} options={{ clientSecret }}>
          <PaymentForm onSubmit={onSubmit} />
        </Elements>
      )}
    </>
  );
}
