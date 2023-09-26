import { Close } from '@mui/icons-material';
import { Box, Button, Divider, FormControlLabel, Modal, Radio, RadioGroup, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { PriceFilter } from './PriceFilter';
import { useLocale } from '@/locales';

export interface SearchFilterProps {
  isOpen: boolean;
  priceRange: number[];
  onClose: () => void;
}

export const SearchFilter = ({ isOpen, priceRange, onClose }: SearchFilterProps) => {
  const { formatMessage } = useLocale();

  const [price, setPrice] = useState(priceRange);

  const [rating, setRating] = useState('1');

  const [searchParams, setSearchParams] = useSearchParams();

  const handleFilter = () => {
    searchParams.set('minPrice', String(price[0]));
    searchParams.set('maxPrice', String(price[1]));

    setSearchParams((prev) => [...prev]);
  };

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      aria-labelledby='parent-modal-title'
      aria-describedby='parent-modal-description'
      sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
    >
      <Box
        minWidth={{ xs: 300, md: 600 }}
        bgcolor='primary.contrastText'
        borderRadius={4}
        component={motion.div}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{
          duration: 0.3,
        }}
      >
        <Box display='flex' alignItems='center' justifyContent='space-between' paddingBottom={2} padding={2}>
          <Typography id='parent-modal-title' textAlign='center' variant='h5' fontWeight={700}>
            {formatMessage({ id: 'search.tool.filter.title' })}
          </Typography>
          <Close
            onClick={onClose}
            sx={{
              cursor: 'pointer',
              ':hover': { opacity: 0.7 },
            }}
          />
        </Box>
        <Divider />
        <Box padding={2}>
          <Box marginY={2}>
            <Typography variant='body1'> {formatMessage({ id: 'search.tool.filter.price.range' })}</Typography>
            <PriceFilter priceRange={price} onChange={(value) => setPrice(value)} minDistance={100000} />
          </Box>
          <Divider />
          <Box marginY={2}>
            <Typography variant='body1'> {formatMessage({ id: 'search.tool.filter.rating.title' })}</Typography>
            <RadioGroup
              aria-labelledby='demo-controlled-radio-buttons-group'
              name='controlled-radio-buttons-group'
              value={rating}
              onChange={(e) => setRating(e.target.value)}
            >
              <FormControlLabel value='1' control={<Radio />} label='Tất cả' />
              <FormControlLabel value='2' control={<Radio />} label='4.5 trở lên' />
              <FormControlLabel value='3' control={<Radio />} label='4 trở lên' />
              <FormControlLabel value='4' control={<Radio />} label='3.5 trở lên' />
            </RadioGroup>
          </Box>
        </Box>
        <Divider />
        <Button
          variant='contained'
          sx={{ float: 'right', margin: 2 }}
          onClick={() => {
            handleFilter();
            onClose();
          }}
        >
          {formatMessage({ id: 'search.tool.filter.button' })}
        </Button>
      </Box>
    </Modal>
  );
};
