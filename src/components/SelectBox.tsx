import { Autocomplete, InputBase, Popper } from '@mui/material';
import { motion } from 'framer-motion';
import { PropsWithChildren } from 'react';
import { defaultLocations } from '@/common/datas/location.data';
import { useBoolean } from '@/hooks';

export interface SelectBoxProps extends PropsWithChildren {
  value: string;
  onChange: (data: string) => void;
  placeHolder: string;
}

export const SelectBox = ({ value, onChange, placeHolder, children, ...props }: SelectBoxProps) => {
  const { value: isOpen, setFalse, setTrue } = useBoolean(false);

  return (
    <Autocomplete
      disablePortal
      id='combo-box-address'
      options={defaultLocations}
      open={isOpen}
      onClose={setFalse}
      onOpen={setTrue}
      onInputChange={(_, newValue) => onChange(newValue)}
      value={value}
      fullWidth
      {...props}
      PopperComponent={(props) => (
        <Popper
          sx={{
            maxWidth: '80%',
            maxHeight: 500,
            overflowY: 'scroll',
            bgcolor: 'primary.contrastText',
            boxShadow: 4,
            borderRadius: 2,
            paddingY: 1,
            '&::-webkit-scrollbar': {
              width: '0',
            },
          }}
          {...props}
          onMouseDown={(e) => e.preventDefault()}
        >
          {children}
        </Popper>
      )}
      renderInput={(params) => (
        <InputBase
          sx={{
            display: 'flex',
            height: '100%',
            paddingTop: 4,
            paddingLeft: 8,
            paddingBottom: 1,
            position: 'relative',
          }}
          ref={params.InputProps.ref}
          {...params}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          fullWidth
          placeholder={placeHolder}
        />
      )}
    />
  );
};
