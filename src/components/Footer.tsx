import { Box, Divider, Grid, Typography } from '@mui/material';
import { Copyright } from './Copyright';
import { Link } from './Link';
import { PaymentImages } from '@/assets/images/payment';
import { useLocale } from '@/locales';

export const Footer = () => {
  const { formatMessage } = useLocale();

  return (
    <Box bgcolor='footer.light' paddingTop={2} paddingX={2} textAlign={{ xs: 'center', md: 'left' }}>
      <Grid container spacing={1}>
        <Grid item xs={12} md={3}>
          <Typography variant='body1' fontWeight={500} marginY={2}>
            {formatMessage({ id: 'app.footer.support.title' })}
          </Typography>
          <Box>
            <Link
              href='/'
              display='block'
              sx={{
                ':hover': {
                  color: 'primary.main',
                },
              }}
              marginY={0.5}
              color='inherit'
              fontWeight={300}
              underline='none'
            >
              {formatMessage({ id: 'app.footer.support.item.hotline' })}: 0354 560 042
            </Link>
            <Link
              href='/'
              display='block'
              sx={{
                ':hover': {
                  color: 'primary.main',
                },
              }}
              marginY={0.5}
              color='inherit'
              fontWeight={300}
              underline='none'
            >
              {formatMessage({ id: 'app.footer.support.item.support' })}: cskh@go.vn
            </Link>
            <Link
              href='/'
              display='block'
              sx={{
                ':hover': {
                  color: 'primary.main',
                },
              }}
              marginY={0.5}
              color='inherit'
              fontWeight={300}
              underline='none'
            >
              {formatMessage({ id: 'app.footer.support.item.colab' })}: support@go.vn
            </Link>
            <Link
              href='/'
              display='block'
              sx={{
                ':hover': {
                  color: 'primary.main',
                },
              }}
              marginY={0.5}
              color='inherit'
              fontWeight={300}
              underline='none'
            >
              {formatMessage({ id: 'app.footer.support.item.sub-title' })}
            </Link>
          </Box>
        </Grid>
        <Grid item xs={12} md={3}>
          <Typography variant='body1' fontWeight={500} marginY={2}>
            {formatMessage({ id: 'app.footer.introduce.title' })}
          </Typography>
          <Box>
            <Link
              href='/'
              display='block'
              sx={{
                ':hover': {
                  color: 'primary.main',
                },
              }}
              marginY={0.5}
              color='inherit'
              fontWeight={300}
              underline='none'
            >
              {formatMessage({ id: 'app.footer.introduce.item.about' })}
            </Link>
            <Link
              href='/'
              display='block'
              sx={{
                ':hover': {
                  color: 'primary.main',
                },
              }}
              marginY={0.5}
              color='inherit'
              fontWeight={300}
              underline='none'
            >
              {formatMessage({ id: 'app.footer.introduce.item.blog' })}
            </Link>
            <Link
              href='/'
              display='block'
              sx={{
                ':hover': {
                  color: 'primary.main',
                },
              }}
              marginY={0.5}
              color='inherit'
              fontWeight={300}
              underline='none'
            >
              {formatMessage({ id: 'app.footer.introduce.item.rule' })}
            </Link>
            <Link
              href='/'
              display='block'
              sx={{
                ':hover': {
                  color: 'primary.main',
                },
              }}
              marginY={0.5}
              color='inherit'
              fontWeight={300}
              underline='none'
            >
              {formatMessage({ id: 'app.footer.introduce.item.for-business' })}
            </Link>
          </Box>
        </Grid>
        <Grid item xs={12} md={3}>
          <Typography variant='body1' fontWeight={500} marginY={2}>
            {formatMessage({ id: 'app.footer.business.title' })}
          </Typography>
          <Grid container gap={2} justifyContent={{ xs: 'center', md: 'left' }}>
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
            {formatMessage({ id: 'app.footer.download.title' })}
          </Typography>
        </Grid>
      </Grid>
      <Divider sx={{ marginY: 2 }} />
      <Copyright />
    </Box>
  );
};
