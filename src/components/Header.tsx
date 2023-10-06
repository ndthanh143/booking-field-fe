import { KeyboardArrowDown } from '@mui/icons-material';
import { Box, Button, Container, Grid, Menu, MenuItem } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { MenuNotification, MenuActions, LangueSwitcher } from '.';
import { DEFAULT_MAX_PRICE, DEFAULT_MIN_PRICE } from '@/common/constants';
import { defaultLocations } from '@/common/datas/location.data';
import { useMenu } from '@/hooks';
import { useLocale } from '@/locales';
import { pitchCategoryKeys } from '@/services/pitch_category/pitch-category.query';

export const Header = () => {
  const navigate = useNavigate();

  const { formatMessage } = useLocale();

  const {
    anchorEl: anchorCategoryMenu,
    isOpen: isOpenCategoryMenu,
    onClose: closeCategoryMenu,
    onOpen: openCategoryMenu,
  } = useMenu();

  const pitchCategoryInstance = pitchCategoryKeys.list();
  const { data: pitchCategories } = useQuery({ ...pitchCategoryInstance, staleTime: Infinity });

  return (
    <Box sx={{ borderBottomWidth: 1, borderBottomColor: 'secondary.light', borderBottomStyle: 'solid' }}>
      <Container maxWidth='xl'>
        <Grid component='header' container alignItems='center' justifyContent='space-between' paddingY={2}>
          <Grid item xs={6} md={4} alignItems='center' justifyContent='space-between'>
            <Box display='flex' justifyContent='space-between' alignItems='center'>
              <Box
                sx={{
                  cursor: 'pointer',
                  objectFit: 'cover',
                }}
                onClick={() => navigate('/')}
              >
                <Box component='img' src='/logo.png' alt='go2play-logo' height={50} width='100%' />
              </Box>
              <Button
                variant='text'
                onClick={openCategoryMenu}
                color='secondary'
                sx={{
                  display: {
                    xs: 'none',
                    md: 'none',
                    lg: 'flex',
                  },
                }}
              >
                {formatMessage({
                  id: 'app.home.header.category',
                })}
                <KeyboardArrowDown />
              </Button>
              <Menu
                id='category-menu'
                anchorEl={anchorCategoryMenu}
                open={isOpenCategoryMenu}
                onClose={closeCategoryMenu}
                MenuListProps={{
                  'aria-labelledby': 'basic-button',
                }}
              >
                {pitchCategories?.data.map((item) => (
                  <MenuItem
                    key={item.id}
                    onClick={() =>
                      navigate(
                        `/search?location=${defaultLocations[0]}&pitchCategory=${item.id}&minPrice=${DEFAULT_MIN_PRICE}&maxPrice=${DEFAULT_MAX_PRICE}`,
                      )
                    }
                  >
                    {item.name}
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Box display='flex' justifyContent='end' alignItems='center' gap={2}>
              <Box display={{ xs: 'none', md: 'flex' }}>
                <LangueSwitcher />
              </Box>
              <Button
                variant='outlined'
                color='secondary'
                sx={{
                  display: {
                    xs: 'none',
                    md: 'block',
                  },
                }}
                onClick={() => navigate('/register-venue')}
              >
                {formatMessage({
                  id: 'app.home.header.for-business',
                })}
              </Button>

              <MenuNotification />

              <MenuActions />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};
