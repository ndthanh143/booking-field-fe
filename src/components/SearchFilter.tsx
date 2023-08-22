import { Close } from '@mui/icons-material';
import { Box, Button, Divider, FormControlLabel, Modal, Radio, RadioGroup, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { PriceFilter } from './PriceFilter';

export interface SearchFilterProps {
  isOpen: boolean;
  priceRange: number[];
  onClose: () => void;
}

export const SearchFilter = ({ isOpen, priceRange, onClose }: SearchFilterProps) => {
  const [price, setPrice] = useState(priceRange);

  const [searchParams, setSearchParams] = useSearchParams();

  const handleFilter = () => {
    searchParams.set('minPrice', price[0].toString());
    searchParams.set('maxPrice', price[1].toString());

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
        minWidth={600}
        paddingX={3}
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
        <Typography
          id='parent-modal-title'
          textAlign='center'
          variant='h5'
          fontWeight={700}
          paddingY={2}
          position='relative'
        >
          Bộ lọc
          <Close
            onClick={onClose}
            sx={{
              cursor: 'pointer',
              ':hover': { opacity: 0.7 },
              position: 'absolute',
              right: 0,
              top: '50%',
              transform: 'translateY(-50%)',
            }}
          />
        </Typography>
        <Divider />
        <Box marginY={2}>
          <Typography variant='body1'>Khoảng giá</Typography>
          <PriceFilter priceRange={price} onChange={(value) => setPrice(value)} minDistance={100000} />
        </Box>
        <Divider />
        <Box marginY={2}>
          <Typography variant='body1'>Điểm đánh giá</Typography>
          <RadioGroup
            aria-labelledby='demo-controlled-radio-buttons-group'
            name='controlled-radio-buttons-group'
            value={1}
          >
            <FormControlLabel value='1' control={<Radio />} label='Tất cả' />
            <FormControlLabel value='2' control={<Radio />} label='4.5 trở lên' />
            <FormControlLabel value='3' control={<Radio />} label='4 trở lên' />
            <FormControlLabel value='4' control={<Radio />} label='3.5 trở lên' />
          </RadioGroup>
        </Box>
        <Divider />
        <Button
          variant='contained'
          sx={{ float: 'right', marginY: 2 }}
          onClick={() => {
            handleFilter();
            onClose();
          }}
        >
          Lọc
        </Button>
      </Box>
    </Modal>
  );
};
