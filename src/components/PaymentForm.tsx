import { Button, FormControl, Typography } from '@mui/material';
import { PaymentElement } from '@stripe/react-stripe-js';
import { usePaymentForm } from '@/hooks';
import { useLocale } from '@/locales';

export interface PaymentFormProps {
  onSubmit: () => void;
}

export default function PaymentForm({ onSubmit }: PaymentFormProps) {
  const { formatMessage } = useLocale();

  const { handleSubmit, isProcessing, message, stripe, elements } = usePaymentForm();

  return (
    <FormControl sx={{ width: '100%' }}>
      <PaymentElement />
      <Button
        variant='contained'
        disabled={isProcessing || !stripe || !elements}
        sx={{ marginY: 2 }}
        onClick={(e) => {
          handleSubmit(e);
          onSubmit();
        }}
      >
        {formatMessage({ id: 'app.booking.payment.button.submit' })}
      </Button>
      {message && <Typography>{message}</Typography>}
    </FormControl>
  );
}
