import { Box, Button, Grid, TextField, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { UserAccountLayout } from '@/components/UserAccountLayout';
import { useAuth, useBoolean } from '@/hooks';

export const AccountProfile = () => {
  const { value: isUpdating, setTrue, setFalse } = useBoolean(false);

  const { profile } = useAuth();

  const navigate = useNavigate();

  if (!profile) {
    navigate('/');
  }

  return (
    profile && (
      <UserAccountLayout>
        <Box marginLeft={4}>
          <Box display='flex' justifyContent='space-between' marginY={4}>
            <Typography variant='h4' fontWeight={500}>
              Hồ sơ của tôi
            </Typography>
            {isUpdating ? (
              <Box display='flex' gap={2}>
                <Button variant='contained'>Lưu</Button>
                <Button variant='text' onClick={setFalse}>
                  Hủy
                </Button>
              </Box>
            ) : (
              <Button variant='outlined' color='secondary' onClick={setTrue}>
                Chỉnh sửa
              </Button>
            )}
          </Box>
          <Grid
            container
            display='flex'
            alignItems='center'
            paddingY={2}
            borderBottom={1}
            borderColor='secondary.light'
          >
            <Grid item xs={5}>
              <Typography fontSize={18}>Số điện thoại</Typography>
            </Grid>
            <Grid item xs={7}>
              <Typography fontWeight={500}>{profile.phone}</Typography>
            </Grid>
          </Grid>
          <Grid
            container
            display='flex'
            alignItems='center'
            paddingY={2}
            borderBottom={1}
            borderColor='secondary.light'
          >
            <Grid item xs={5}>
              <Typography fontSize={18}>Họ và Tên</Typography>
            </Grid>
            <Grid item xs={7}>
              {isUpdating ? (
                <Box display='flex' justifyContent='space-between' gap={2}>
                  <TextField value={profile.firstName} />
                  <TextField value={profile.lastName} />
                </Box>
              ) : (
                <Typography fontWeight={500}>{`${profile.firstName} ${profile.lastName}`}</Typography>
              )}
            </Grid>
          </Grid>
          <Grid
            container
            display='flex'
            alignItems='center'
            paddingY={2}
            borderBottom={1}
            borderColor='secondary.light'
          >
            <Grid item xs={5}>
              <Typography fontSize={18}>Email</Typography>
            </Grid>
            <Grid item xs={7}>
              {isUpdating ? (
                <Box display='flex' justifyContent='space-between'>
                  <TextField value={profile.email} sx={{ flex: 1 }} />
                </Box>
              ) : (
                <Typography fontWeight={500}>{profile.email}</Typography>
              )}
            </Grid>
          </Grid>
        </Box>
      </UserAccountLayout>
    )
  );
};
