import { Box, Slider, TextField } from '@mui/material';
import { useLocale } from '@/locales';
import { convertCurrency } from '@/utils';

export interface PriceFilterProps {
  priceRange: number[];
  onChange: (data: number[]) => void;
  minDistance: number;
  min: number;
  max: number;
  step: number;
}

export const PriceFilter = ({ priceRange, onChange, min, max, step, minDistance }: PriceFilterProps) => {
  const { formatMessage } = useLocale();

  const handlePriceRangeChange = (_: Event, newValue: number | number[], activeThumb: number) => {
    if (!Array.isArray(newValue)) {
      return;
    }

    if (newValue[1] - newValue[0] < minDistance) {
      if (activeThumb === 0) {
        const clamped = Math.min(newValue[0], max - minDistance);

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
    return `${convertCurrency(value)}`;
  };

  return (
    <>
      <Slider
        value={priceRange}
        onChange={handlePriceRangeChange}
        valueLabelDisplay='auto'
        getAriaValueText={valueText}
        valueLabelFormat={valueText}
        max={max}
        min={min}
        step={step}
        disableSwap
      />
      <Box display='flex' justifyContent='space-between' gap={2}>
        <TextField
          InputProps={{
            readOnly: true,
          }}
          value={`${convertCurrency(priceRange[0])}`}
          label={formatMessage({ id: 'search.tool.filter.price.min' })}
        />
        <TextField
          InputProps={{
            readOnly: true,
          }}
          value={`${convertCurrency(priceRange[1])}`}
          label={formatMessage({ id: 'search.tool.filter.price.max' })}
        />
      </Box>
    </>
  );
};
