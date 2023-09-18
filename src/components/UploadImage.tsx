import { CloudUpload } from '@mui/icons-material';
import { Box, Typography } from '@mui/material';
import { DetailedHTMLProps, InputHTMLAttributes, forwardRef, useEffect, useState } from 'react';

export interface UploadImageProps extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  files: FileList | null;
  url?: string;
  number?: number;
}
export const UploadImage = forwardRef<HTMLInputElement, UploadImageProps>(
  ({ files, url, number, ...props }: UploadImageProps, ref) => {
    const [previewUrl, setPreviewUrl] = useState<string | null>();

    useEffect(() => {
      if (files) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreviewUrl(reader.result as string);
        };
        reader.readAsDataURL(files[0]);
      } else {
        setPreviewUrl(null);
      }

      if (url) {
        setPreviewUrl(url);
      }
    }, [files, url]);

    return (
      <Box
        component='label'
        htmlFor={`file-upload-${number}`}
        width='100%'
        height='100%'
        display='flex'
        justifyContent='center'
        alignItems='center'
        border={1}
        borderColor='secondary.light'
        borderRadius={4}
        overflow='hidden'
        bgcolor='primary.contrastText'
        sx={{
          ':hover': {
            bgcolor: 'secondary.light',
          },
          cursor: 'pointer',
        }}
      >
        {previewUrl && (
          <Box
            width='100%'
            height='100%'
            position='relative'
            sx={{
              ':hover': {
                '.change-image': {
                  display: 'flex',
                },
              },
            }}
          >
            <Box component='img' src={previewUrl} width='100%' height='100%' sx={{ objectFit: 'cover' }} />
            <Box
              position='absolute'
              sx={{ inset: 0 }}
              bgcolor='rgba(0, 0, 0, 0.6)'
              display='none'
              justifyContent='center'
              alignItems='center'
              className='change-image'
            >
              <CloudUpload sx={{ color: 'primary.contrastText' }} fontSize='large' />
            </Box>
          </Box>
        )}
        {!previewUrl && (
          <Box textAlign='center'>
            <CloudUpload />
            <Typography>Upload</Typography>
          </Box>
        )}
        <input ref={ref} hidden type='file' id={`file-upload-${number}`} accept='image/*' {...props} />
      </Box>
    );
  },
);
