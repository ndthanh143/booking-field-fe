import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, Divider, MenuItem, Modal, Select, TextField, Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { number, object } from 'yup';
import { Pitch, UpdatePitchDto } from '@/services/pitch/pitch.dto';
import { pitchCategoryKeys } from '@/services/pitch_category/pitch-category.query';

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
  const pitchCategoryInstance = pitchCategoryKeys.list();

  const { data: categories } = useQuery({ ...pitchCategoryInstance, staleTime: Infinity });

  const { handleSubmit, register } = useForm({ resolver: yupResolver(schema) });

  const onSubmitHandler = (data: UpdatePitchDto) => {
    onSubmit(data);
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
              <Select defaultValue={pitch.pitchCategory._id} {...register('pitchCategory')} fullWidth>
                {categories?.data.map((item) => <MenuItem value={item._id}>{item.name}</MenuItem>)}
              </Select>
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
