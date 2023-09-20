import { Box, Button, Divider, Modal, Slider, TextField, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { convertDecimalToTime } from '@/utils';

export interface TimeSelectionProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (value: number[]) => void;
  timeRange: number[];
}

export const TimeSelection = ({ isOpen, onClose, onSave, timeRange }: TimeSelectionProps) => {
  const minDistance = 1;

  const [timeSelection, setTimeSelection] = useState<number[]>(timeRange);

  const valueLabelFormat = (value: number) => `${convertDecimalToTime(value)}`;

  const handleTimeRangeChange = (_: Event, newValue: number | number[], activeThumb: number) => {
    if (!Array.isArray(newValue)) {
      return;
    }

    if (newValue[1] - newValue[0] < minDistance) {
      if (activeThumb === 0) {
        const clamped = Math.min(newValue[0], 100 - minDistance);
        setTimeSelection([clamped, clamped + minDistance]);
      } else {
        const clamped = Math.max(newValue[1], minDistance);
        setTimeSelection([clamped - minDistance, clamped]);
      }
    } else {
      setTimeSelection(newValue as number[]);
    }
  };

  const valueText = (value: number) => {
    return `${convertDecimalToTime(value)}`;
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
        bgcolor='primary.contrastText'
        borderRadius={4}
        textAlign='center'
        component={motion.div}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{
          duration: 0.3,
        }}
      >
        <Typography variant='h6' paddingY={2} paddingX={3}>
          Chọn thời gian
        </Typography>
        <Divider />
        <Box paddingBottom={3} paddingX={3}>
          <Box justifyContent='space-between' paddingY={1}>
            <Slider
              value={timeSelection || timeRange}
              onChange={handleTimeRangeChange}
              valueLabelDisplay='auto'
              getAriaValueText={valueText}
              valueLabelFormat={valueLabelFormat}
              min={timeRange[0]}
              max={timeRange[1]}
              step={0.5}
              disableSwap
            />
            <Box display='flex' justifyContent='space-between'>
              <TextField value={`${convertDecimalToTime(timeSelection[0])}`} label='Giờ bắt đầu' />
              <TextField value={`${convertDecimalToTime(timeSelection[1])}`} label='Giờ kết thúc' />
            </Box>
          </Box>

          <Button
            variant='contained'
            sx={{ marginTop: 1 }}
            onClick={() => {
              onSave(timeSelection);
              onClose();
            }}
          >
            Lưu
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};
