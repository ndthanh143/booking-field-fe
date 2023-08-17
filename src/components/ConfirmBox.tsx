import { ErrorOutline } from '@mui/icons-material';
import { Box, Button, Modal, Typography } from '@mui/material';
import { motion } from 'framer-motion';

export interface ISearchSortProps {
  title: string;
  subTitle?: string;
  isOpen: boolean;
  onClose: () => void;
  onAccept: () => void;
}
export const ConfirmBox = ({ title, subTitle, isOpen, onClose, onAccept }: ISearchSortProps) => {
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
        <Box textAlign='center' padding={2}>
          <ErrorOutline fontSize='large' sx={{ color: 'primary.main' }} />
        </Box>
        <Typography textAlign='center' variant='h5' fontWeight={500}>
          {title}
        </Typography>
        <Typography textAlign='center' variant='body2' marginY={1}>
          {subTitle}
        </Typography>
        <Box display='flex' justifyContent='center' gap={4} padding={4}>
          <Button variant='contained' onClick={onAccept}>
            Đồng ý
          </Button>
          <Button variant='text' onClick={onClose}>
            Quay lại
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};
