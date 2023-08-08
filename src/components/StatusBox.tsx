import { Box, Typography } from '@mui/material';

export interface IStatusBoxProps {
  time: string;
  price: number;
  duration: number;
  isBooked?: boolean;
}

export const StatusBox = ({ time, price, duration, isBooked }: IStatusBoxProps) => {
  return (
    <Box
      bgcolor={!isBooked ? 'primary.light' : 'footer.main'}
      sx={{
        ':hover': {
          bgcolor: !isBooked ? 'primary.dark' : 'inherit',
        },
        cursor: !isBooked ? 'pointer' : 'default',
      }}
      padding={2}
      borderRadius={2}
      textAlign='center'
      border={1}
      width={100}
      height={100}
      borderColor={!isBooked ? 'primary.dark' : 'footer.dark'}
    >
      <Typography fontSize={16} fontWeight={500}>
        {time}
      </Typography>
      <Typography fontSize={12}>{isBooked ? 'Đã đặt' : `${price}đ`}</Typography>
      <Typography fontSize={12}>{`${duration} phút`}</Typography>
    </Box>
  );
};
