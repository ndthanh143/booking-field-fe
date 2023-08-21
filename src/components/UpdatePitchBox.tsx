import { yupResolver } from '@hookform/resolvers/yup';
import { RoomOutlined } from '@mui/icons-material';
import { Box, Button, Divider, Modal, TextField, Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { number, object } from 'yup';
import { SelectBox } from './SelectBox';
import { Pitch, UpdatePitchDto } from '@/services/pitch/pitch.dto';
import { getAllCategories } from '@/services/pitch_category/pitch-category.service';

export interface SearchSortProps {
  pitch: Pitch;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: UpdatePitchDto) => void;
}

const schema = object({
  no: number(),
  price: number().min(0),
  pitchCategory: number(),
});

export const UpdatePitchBox = ({ pitch, isOpen, onClose, onSubmit }: SearchSortProps) => {
  const { data: categories } = useQuery({ queryKey: ['categories'], queryFn: getAllCategories, staleTime: Infinity });

  const [pitchCategory, setPitchCategory] = useState<string>('');

  const { handleSubmit, register, setValue } = useForm({ resolver: yupResolver(schema) });

  const onSubmitHandler = (data: UpdatePitchDto) => {
    onSubmit(data);
  };

  useEffect(() => {
    setPitchCategory(pitch.pitchCategory.name);
  }, [pitch.pitchCategory.name]);

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
              <Typography>Số sân</Typography>
              <TextField placeholder='...' type='number' fullWidth {...register('no')} defaultValue={pitch.no} />
            </Box>
            <Box paddingY={2}>
              <Typography>Giá sân theo giờ</Typography>
              <TextField placeholder='...' fullWidth type='number' {...register('price')} defaultValue={pitch.price} />
            </Box>
            <Box paddingY={2}>
              <Typography>Loại Sân</Typography>
              <SelectBox
                value={pitchCategory}
                onChange={(data) => setPitchCategory(data)}
                placeHolder='Loại sân bạn muốn đặt'
              >
                {categories?.data.map((item) => (
                  <Box
                    onClick={() => {
                      setValue('pitchCategory', item._id);
                      setPitchCategory(item.name);
                    }}
                    display='flex'
                    alignItems='center'
                    padding={1}
                    sx={{ cursor: 'pointer', ':hover': { bgcolor: '#ccc' } }}
                    key={item._id}
                  >
                    <RoomOutlined sx={{ fontSize: 20, opacity: 0.7, marginRight: 1 }} />
                    {item.name}
                  </Box>
                ))}
              </SelectBox>
            </Box>
            <Box display='flex' justifyContent='end' gap={2} paddingY={2}>
              <Button variant='contained' type='submit'>
                Lưu thay đổi
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
