import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useQuery } from '@tanstack/react-query';
import PaymentForm from './PaymentForm';
import { getClientSecret } from '@/services/stripe/stripe.service';

export default function StripeContainer() {
  const STRIPE_PUBLIC_KEY =
    'pk_test_51NcKR1LDtYPH3BFaBLNrHLRTIzM59sjFue1gM6PftXHg3ySDAEBMdQdez1e0WtDIcNPGMKL6bEJK8FYRIG7dyExd00tVWZhaOq';

  const stripePromise = loadStripe(STRIPE_PUBLIC_KEY);

  const { data: clientSecret } = useQuery({ queryKey: ['ClientSecretKey'], queryFn: getClientSecret });

  return (
    <>
      {clientSecret && stripePromise && (
        <Elements stripe={stripePromise} options={{ clientSecret }}>
          <PaymentForm />
        </Elements>
      )}
    </>
  );
}
