import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useMutation } from '@tanstack/react-query';
import { FormEvent, useState } from 'react';
import { IStripePaymentPayload } from '@/services/stripe/stripe.dto';
import { stripePayment } from '@/services/stripe/stripe.service';

export const usePaymentForm = () => {
  const { mutate } = useMutation({
    mutationKey: ['stripe'],
    mutationFn: ({ paymentMethodId, amount }: IStripePaymentPayload) => stripePayment({ paymentMethodId, amount }),
  });
  const stripe = useStripe();
  const elements = useElements();

  const [message, setMessage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    const amountToCharge = 100;

    const cardElement = elements?.getElement(CardElement);

    if (!stripe || !elements || !cardElement) {
      return;
    }

    const stripeResponse = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
    });

    const { error, paymentMethod } = stripeResponse;

    if (error || !paymentMethod) {
      return;
    }

    const paymentMethodId = paymentMethod.id;

    mutate({ paymentMethodId, amount: amountToCharge });

    setIsProcessing(true);

    const { error: stripeError } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Make sure to change this to your payment completion page
        return_url: `${window.location.origin}/completion`,
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
