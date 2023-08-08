import { Button, FormControl, Typography } from '@mui/material';
import { PaymentElement } from '@stripe/react-stripe-js';
import { usePaymentForm } from '@/hooks';

export default function PaymentForm() {
  const { handleSubmit, isProcessing, message, stripe, elements } = usePaymentForm();

  return (
    <FormControl onSubmit={handleSubmit} sx={{ width: '100%' }}>
      <PaymentElement />
      <Button
        variant='contained'
        disabled={isProcessing || !stripe || !elements}
        sx={{ marginY: 2 }}
        onClick={handleSubmit}
      >
        Xác nhận thanh toán
      </Button>
      {message && <Typography>{message}</Typography>}
    </FormControl>
  );
}
