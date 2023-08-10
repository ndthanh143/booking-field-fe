import { useStripe, useElements } from '@stripe/react-stripe-js';
import { FormEvent, useState } from 'react';

export const usePaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const [message, setMessage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsProcessing(true);

    const { error: stripeError } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/booking/success`,
      },
    });

    if (stripeError.type === 'card_error' || stripeError.type === 'validation_error') {
      setMessage(stripeError.message || null);
    } else {
      setMessage('An unexpected error occured.');
    }

    setIsProcessing(false);
  };

  return {
    handleSubmit,
    message,
    isProcessing,
    stripe,
    elements,
  };
};
