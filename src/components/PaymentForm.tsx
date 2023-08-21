import { Button, FormControl, Typography } from '@mui/material';
import { PaymentElement } from '@stripe/react-stripe-js';
import { usePaymentForm } from '@/hooks';

export interface PaymentFormProps {
  onSubmit: () => void;
}

export default function PaymentForm({ onSubmit }: PaymentFormProps) {
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
        Xác nhận thanh toán
      </Button>
      {message && <Typography>{message}</Typography>}
    </FormControl>
  );
}
