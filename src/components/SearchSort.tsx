import { Check, Close } from '@mui/icons-material';
import { Box, Divider, List, ListItem, ListItemButton, ListItemText, Modal, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import { useSearchParams } from 'react-router-dom';

export interface SearchSortProps {
  isOpen: boolean;
  sortParams: string;
  onClose: () => void;
}
export const SearchSort = ({ isOpen, sortParams, onClose }: SearchSortProps) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const sortOptions = [
    { key: 0, value: 'ASC', label: 'Giá từ thấp đến cao' },
    { key: 1, value: 'DESC', label: 'Giá từ cao đến thấp' },
  ];

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
        <Box display='flex' alignItems='center' justifyContent='space-between' paddingBottom={2} padding={2}>
          <Typography id='parent-modal-title' textAlign='center' variant='h5' fontWeight={700}>
            Sắp xếp
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
        <List>
          {sortOptions.map((item) => (
            <>
              <ListItem
                disablePadding
                onClick={() => {
                  searchParams.set('sort', item.value);
                  setSearchParams((prev) => [...prev]);
                  onClose();
                }}
              >
                <ListItemButton>
                  <ListItemText primary={item.label} />
                  {sortParams === item.value && <Check />}
                </ListItemButton>
              </ListItem>
            </>
          ))}
        </List>
      </Box>
    </Modal>
  );
};
