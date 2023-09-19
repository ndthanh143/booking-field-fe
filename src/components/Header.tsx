import { KeyboardArrowDown } from '@mui/icons-material';
import { Box, Button, Grid, Menu, MenuItem } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { MenuNotification, MenuActions } from '.';
import Logo from '@/assets/logo';
import { DEFAULT_MAX_PRICE, DEFAULT_MIN_PRICE } from '@/common/constants';
import { defaultLocations } from '@/common/datas/location.data';
import { useMenu } from '@/hooks';
import { pitchCategoryKeys } from '@/services/pitch_category/pitch-category.query';

export const Header = () => {
  const navigate = useNavigate();

  const { anchorEl: anchorCategory, isOpen: isOpenCategory, onClose: closeCategory, onOpen: openCategory } = useMenu();

  const pitchCategoryInstance = pitchCategoryKeys.list({});
  const { data: pitchCategories } = useQuery({ ...pitchCategoryInstance, staleTime: Infinity });

  return (
    <Grid
      container
      alignItems='center'
      justifyContent='space-between'
      paddingY={2}
      borderBottom={1}
      borderColor='secondary.light'
    >
      <Grid item xs={4} md={4} alignItems='center' justifyContent='space-between'>
        <Box display='flex' justifyContent='space-between' alignItems='center'>
          <Box
            sx={{
              cursor: 'pointer',
              objectFit: 'cover',
            }}
            onClick={() => navigate('/')}
          >
            <Logo />
          </Box>
          <Button
            variant='text'
            onClick={openCategory}
            color='secondary'
            sx={{
              display: {
                xs: 'none',
                md: 'none',
                lg: 'flex',
              },
            }}
          >
            Danh mục sân bóng
            <KeyboardArrowDown />
          </Button>
          <Menu
            id='category-menu'
            anchorEl={anchorCategory}
            open={isOpenCategory}
            onClose={closeCategory}
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
          <Button variant='text' color='secondary'>
            Tiếng Việt
          </Button>
          <Button
            variant='outlined'
            href='https://docs.google.com/forms/d/e/1FAIpQLScCtwnRHg0BcfpQ_I2fKWAMY5CDwFytHWhx1oI8YlOA99wu2Q/viewform'
            color='secondary'
            target='_blank'
            sx={{
              display: {
                xs: 'none',
                md: 'block',
              },
            }}
          >
            Dành cho đối tác
          </Button>

          <MenuNotification variant='primary' />

          <MenuActions variant='primary' />
        </Box>
      </Grid>
    </Grid>
  );
};
