import { Box } from '@mui/material';
import { TimeSelection } from '.';
import { useBoolean } from '@/hooks';
import { TimeInterval } from '@/pages/Booking';

export interface TimeSelectProps extends TimeInterval {
  onSave: (value: number[]) => void;
}

export const TimeSelect = ({ onSave, startTime, endTime, id }: TimeSelectProps) => {
  const isFreeTime = id === -1;
  const { value, setTrue, setFalse } = useBoolean();

  return (
    <>
      <Box
        key={startTime}
        height='40px'
        display='flex'
        width={`${((endTime - startTime) * 100) / 24}%`}
        bgcolor={isFreeTime ? 'primary.main' : 'primary.light'}
        position='relative'
        sx={{
          ':hover': isFreeTime
            ? {
                border: 1,
                borderColor: 'primary.dark',
                bgcolor: 'primary.dark',
                boxShadow: 10,
              }
            : {},
          cursor: isFreeTime ? 'pointer' : 'not-allowed',
        }}
        onClick={setTrue}
      />
      <TimeSelection isOpen={value} onClose={setFalse} onSave={onSave} timeRange={[startTime, endTime]} />
    </>
  );
};
