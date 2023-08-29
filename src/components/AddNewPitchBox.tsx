import { yupResolver } from '@hookform/resolvers/yup';
import { RoomOutlined } from '@mui/icons-material';
import { Box, Button, Divider, MenuItem, Modal, Select, TextField, Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { number, object } from 'yup';
import { SelectBox } from './SelectBox';
import { PitchCategoryEnum } from '@/common/enums/pitch-category.enum';
import { CreatePitchDto } from '@/services/pitch/pitch.dto';
import { pitchCategoryKeys } from '@/services/pitch_category/pitch-category.query';
import { getPitchCategories } from '@/services/pitch_category/pitch-category.service';
import { Venue } from '@/services/venue/venue.dto';

export interface SearchSortProps {
  venue: Venue;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: CreatePitchDto) => void;
}

const schema = object({
  no: number().required(),
  price: number().required().min(0),
  pitchCategory: number().required(),
  venue: number().required(),
});

export const AddNewPitchBox = ({ venue, isOpen, onClose, onSubmit }: SearchSortProps) => {
  const pitchCategoryInstance = pitchCategoryKeys.list();

  const { data: categories } = useQuery({ ...pitchCategoryInstance, staleTime: Infinity });

  const {
    handleSubmit,
    register,
    setValue,
    reset,
    formState: { errors },
  } = useForm<CreatePitchDto>({ resolver: yupResolver(schema) });

  const onSubmitHandler = (data: CreatePitchDto) => {
    onSubmit(data);
    reset();
  };

  useEffect(() => {
    setValue('venue', venue._id);
  }, [setValue, venue._id]);

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      aria-labelledby='parent-modal-title'
      aria-describedby='parent-modal-description'
      sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
    >
      <Box
        minWidth={400}
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
        <Box component='form' onSubmit={handleSubmit(onSubmitHandler)}>
          <Typography variant='h5' fontWeight={700} textAlign='center' marginY={2}>
            Thêm sân bóng
          </Typography>
          <Divider />
          <Box padding={4}>
            <Box paddingY={2}>
              <Typography>Tên sân</Typography>
              <TextField placeholder='...' type='number' fullWidth {...register('no')} />
              {errors.no && (
                <Typography variant='caption' color='error.main'>
                  * Vui lòng nhập tên sân
                </Typography>
              )}
            </Box>
            <Box paddingY={2}>
              <Typography>Giá sân theo giờ</Typography>
              <TextField placeholder='...' type='number' fullWidth {...register('price')} />
              {errors.price && (
                <Typography variant='caption' color='error.main'>
                  * Vui lòng nhập giá sân
                </Typography>
              )}
            </Box>
            <Box paddingY={2}>
              <Typography>Loại Sân</Typography>
              <Select {...register('pitchCategory')} fullWidth>
                {categories?.data.map((item) => <MenuItem value={item._id}>{item.name}</MenuItem>)}
              </Select>
              {errors.pitchCategory && (
                <Typography variant='caption' color='error.main'>
                  * Vui lòng chọn loại sân
                </Typography>
              )}
            </Box>
            <Box display='flex' justifyContent='end' gap={2} paddingY={2}>
              <Button variant='contained' type='submit'>
                Thêm
              </Button>
              <Button color='secondary' onClick={onClose}>
                Hủy
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};
