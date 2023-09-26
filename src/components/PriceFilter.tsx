import { Box, Slider, TextField } from '@mui/material';
import { useLocale } from '@/locales';

export interface PriceFilterProps {
  priceRange: number[];
  onChange: (data: number[]) => void;
  minDistance: number;
}

export const PriceFilter = ({ priceRange, onChange, minDistance }: PriceFilterProps) => {
  const { formatMessage } = useLocale();

  const handlePriceRangeChange = (_: Event, newValue: number | number[], activeThumb: number) => {
    if (!Array.isArray(newValue)) {
      return;
    }

    if (newValue[1] - newValue[0] < minDistance) {
      if (activeThumb === 0) {
        const clamped = Math.min(newValue[0], 100 - minDistance);
        onChange([clamped, clamped + minDistance]);
      } else {
        const clamped = Math.max(newValue[1], minDistance);
        onChange([clamped - minDistance, clamped]);
      }
    } else {
      onChange(newValue as number[]);
    }
  };

  const valueText = (value: number) => {
    return `${value}đ`;
  };

  return (
    <>
      <Slider
        value={priceRange}
        onChange={handlePriceRangeChange}
        valueLabelDisplay='auto'
        getAriaValueText={valueText}
        max={1000000}
        min={0}
        step={10000}
        disableSwap
      />
      <Box display='flex' justifyContent='space-between' gap={2}>
        <TextField value={`${priceRange[0]}đ`} label={formatMessage({ id: 'search.tool.filter.price.min' })} />
        <TextField value={`${priceRange[1]}đ`} label={formatMessage({ id: 'search.tool.filter.price.max' })} />
      </Box>
    </>
  );
};
