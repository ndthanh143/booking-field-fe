import { Box, Divider, Grid, Typography } from '@mui/material';
import { Copyright } from './Copyright';
import { Link } from './Link';
import { PaymentImages } from '@/assets/images/payment';

export const Footer = () => {
  return (
    <Box bgcolor='footer.light' paddingTop={2} paddingX={2}>
      <Grid container>
        <Grid item xs={12} md={3}>
          <Typography variant='body1' fontWeight={500} marginY={2}>
            Hỗ trợ
          </Typography>
          <Box>
            <Link href='/' display='block' marginY={0.5} color='inherit' fontWeight={300} underline='none'>
              Hotline: 0354 560 042
            </Link>
            <Link href='/' display='block' marginY={0.5} color='inherit' fontWeight={300} underline='none'>
              Hỗ trợ khách hàng: cskh@go.vn
            </Link>
            <Link href='/' display='block' marginY={0.5} color='inherit' fontWeight={300} underline='none'>
              Liên hệ hợp tác: support@go.vn
            </Link>
            <Link href='/' display='block' marginY={0.5} color='inherit' fontWeight={300} underline='none'>
              Cơ chế giải quyết tranh chấp, khiếu nại
            </Link>
          </Box>
        </Grid>
        <Grid item xs={12} md={3}>
          <Typography variant='body1' fontWeight={500} marginY={2}>
            Giới thiệu
          </Typography>
          <Box>
            <Link href='/' display='block' marginY={0.5} color='inherit' fontWeight={300} underline='none'>
              Về chúng tôi
            </Link>
            <Link href='/' display='block' marginY={0.5} color='inherit' fontWeight={300} underline='none'>
              Trang blog
            </Link>
            <Link href='/' display='block' marginY={0.5} color='inherit' fontWeight={300} underline='none'>
              Quy chế hoạt động website
            </Link>
            <Link href='/' display='block' marginY={0.5} color='inherit' fontWeight={300} underline='none'>
              Dành cho đối tác
            </Link>
          </Box>
        </Grid>
        <Grid item xs={12} md={3}>
          <Typography variant='body1' fontWeight={500} marginY={2}>
            Đối tác thanh toán
          </Typography>
          <Grid container gap={2}>
            {PaymentImages.map((item) => (
              <Grid item xs={1} key={item.name}>
                <Box
                  component='img'
                  width={20}
                  borderRadius={2}
                  height={20}
                  alt={item.name}
                  src={item.src}
                  key={item.name}
                />
              </Grid>
            ))}
          </Grid>
        </Grid>
        <Grid item xs={12} md={3}>
          <Typography variant='body1' fontWeight={500} marginY={2}>
            Tải ứng dụng
          </Typography>
        </Grid>
      </Grid>
      <Divider sx={{ marginY: 2 }} />
      <Copyright />
    </Box>
  );
};
