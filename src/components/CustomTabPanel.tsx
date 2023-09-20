import { Box } from '@mui/material';
import { ReactNode } from 'react';

interface TabPanelProps {
  children?: ReactNode;
  index: number;
  value: number;
}

export const CustomTabPanel = (props: TabPanelProps) => {
  const { children, value, index, ...other } = props;

  const isSelected = value === index;

  return (
    <Box
      role='tabpanel'
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {isSelected && <Box sx={{ padding: 3 }}>{children}</Box>}
    </Box>
  );
};
