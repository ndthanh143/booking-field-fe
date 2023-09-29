import { Check, KeyboardArrowDown } from '@mui/icons-material';
import { Box, Button, Container, Grid, Menu, MenuItem, Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { MenuNotification, MenuActions } from '.';
import { LanguageImages } from '@/assets/images/language';
import { DEFAULT_MAX_PRICE, DEFAULT_MIN_PRICE } from '@/common/constants';
import { defaultLocations } from '@/common/datas/location.data';
import { useLocalStorage, useMenu } from '@/hooks';
import { Locale, useLocale } from '@/locales';
import { pitchCategoryKeys } from '@/services/pitch_category/pitch-category.query';

export const Header = () => {
  const navigate = useNavigate();

  const { formatMessage } = useLocale();

  const locale = (localStorage.getItem('locale') as Locale) || 'vi';

  const { storedValue: currentLocale, setValue: setCurrentLocale } = useLocalStorage('locale', locale);

  const {
    anchorEl: anchorCategoryMenu,
    isOpen: isOpenCategoryMenu,
    onClose: closeCategoryMenu,
    onOpen: openCategoryMenu,
  } = useMenu();
  const {
    anchorEl: anchorTranslationMenu,
    isOpen: isOpenTranslationMenu,
    onClose: closeTranslationMenu,
    onOpen: openTranslationMenu,
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
              <Button
                variant='text'
                color='secondary'
                sx={{
                  display: {
                    xs: 'none',
                    md: 'flex',
                  },
                }}
                onClick={openTranslationMenu}
              >
                <Box
                  component='img'
                  src={LanguageImages[currentLocale]}
                  alt={currentLocale}
                  height={20}
                  width={20}
                  borderRadius='50%'
                  sx={{ objectFit: 'cover' }}
                  marginRight={1}
                />
                {formatMessage({
                  id: currentLocale === 'vi' ? 'app.home.header.translate.vi' : 'app.home.header.translate.en',
                })}
              </Button>
              <Menu
                id='translation-menu'
                anchorEl={anchorTranslationMenu}
                open={isOpenTranslationMenu}
                onClose={closeTranslationMenu}
                MenuListProps={{
                  'aria-labelledby': 'basic-button',
                }}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
              >
                <MenuItem
                  onClick={() => {
                    closeTranslationMenu();
                    setCurrentLocale('en_US');
                  }}
                  sx={{ paddingLeft: 6, position: 'relative' }}
                >
                  {currentLocale === 'en_US' && (
                    <Box position='absolute' left={12}>
                      <Check />
                    </Box>
                  )}
                  <Typography>
                    {formatMessage({
                      id: 'app.home.header.translate.en',
                    })}
                  </Typography>
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    closeTranslationMenu();
                    setCurrentLocale('vi');
                  }}
                  sx={{ paddingLeft: 6 }}
                >
                  {currentLocale === 'vi' && (
                    <Box position='absolute' left={12}>
                      <Check />
                    </Box>
                  )}
                  <Typography>
                    {formatMessage({
                      id: 'app.home.header.translate.vi',
                    })}
                  </Typography>
                </MenuItem>
              </Menu>
              <Button
                variant='outlined'
                href={import.meta.env.BUSINESS_FORM_URL}
                color='secondary'
                target='_blank'
                sx={{
                  display: {
                    xs: 'none',
                    md: 'block',
                  },
                }}
              >
                {formatMessage({
                  id: 'app.home.header.for-business',
                })}
              </Button>

              <MenuNotification variant='primary' />

              <MenuActions variant='primary' />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};
