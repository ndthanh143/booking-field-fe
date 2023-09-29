import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { Box, BoxProps } from '@mui/material';
import { CSSProperties, PropsWithChildren } from 'react';
import ReactSlider, { Settings } from 'react-slick';

export type SliderProps = PropsWithChildren<Settings> & BoxProps;

export interface ArrowProps {
  className?: string;
  style?: CSSProperties;
  onClick?: () => void;
}

const SliderPrevArrow = ({ onClick }: ArrowProps) => {
  return (
    <Box
      onClick={onClick}
      sx={{
        position: 'absolute',
        top: '50%',
        transform: 'translateY(-50%)',
        left: 20,
        zIndex: 1,
        background: 'rgba(255, 255, 255, 0.5)',
        padding: 1.5,
        display: 'flex',
        cursor: 'pointer',
        borderRadius: '50%',
        ':hover': {
          opacity: 0.8,
        },
        transition: 'all 0.2',
      }}
    >
      <NavigateBeforeIcon sx={{ fontWeight: 300 }} />
    </Box>
  );
};

const SliderNextArrow = ({ onClick }: ArrowProps) => {
  return (
    <Box
      onClick={onClick}
      sx={{
        position: 'absolute',
        top: '50%',
        transform: 'translateY(-50%)',
        right: 20,
        zIndex: 1,
        background: 'rgba(255, 255, 255, 0.5)',
        padding: 1.5,
        display: 'flex',
        cursor: 'pointer',
        borderRadius: '50%',
        ':hover': {
          opacity: 0.8,
        },
      }}
    >
      <NavigateNextIcon />
    </Box>
  );
};

export const Slider = ({ children, ...props }: SliderProps) => {
  return (
    <Box
      component={ReactSlider}
      prevArrow={<SliderPrevArrow />}
      nextArrow={<SliderNextArrow />}
      overflow='hidden'
      {...props}
    >
      {children}
    </Box>
  );
};
