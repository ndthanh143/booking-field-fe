import { Delete, Edit } from '@mui/icons-material';
import { Box, Button, IconButton, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { useEffect, useState } from 'react';
import { AddNewPitchBox } from '../AddNewPitchBox';
import { ConfirmBox } from '../ConfirmBox';
import { UpdatePitchBox } from '../UpdatePitchBox';
import { useBoolean, useVenueByCurrentUser } from '@/hooks';
import { usePitchMutation } from '@/hooks/usePitchMutation';
import { CreatePitchDto, Pitch, UpdatePitchDto } from '@/services/pitch/pitch.dto';

export const PitchesManagement = () => {
  const { data: venue, refetch: venueRefetch } = useVenueByCurrentUser();

  const {
    createPitchMutation,
    updatePitchMutation,
    deletePitchMutation,
    isCreateSuccess,
    isDeleteSuccess,
    isUpdateSuccess,
    resetCreate,
    resetDelete,
    resetUpdate,
  } = usePitchMutation();

  const [seletedPitch, setSeletedPitch] = useState<Pitch | null>();

  const { value: isOpenConfirmBox, setFalse: closeConfirmBox, setTrue: openConfirmBox } = useBoolean(false);
  const { value: isOpenAddPitchBox, setFalse: closeAddPitchBox, setTrue: openAddPitchBox } = useBoolean(false);
  const { value: isOpenUpdatePitchBox, setFalse: closeUpdatePitchBox, setTrue: openUpdatePitchBox } = useBoolean(false);

  const handleDeletePitch = () => {
    if (seletedPitch) {
      deletePitchMutation(seletedPitch.id);
    }
  };

  const handleCreatePitch = (payload: CreatePitchDto) => {
    createPitchMutation(payload);
  };

  const handleUpdatePitch = (data: UpdatePitchDto) => {
    if (seletedPitch) {
      updatePitchMutation({ id: seletedPitch.id, data });
    }
  };

  useEffect(() => {
    if (isCreateSuccess) {
      venueRefetch();
      closeAddPitchBox();
      resetCreate();
    }
  }, [isCreateSuccess, closeAddPitchBox, resetCreate, venueRefetch]);

  useEffect(() => {
    if (isUpdateSuccess) {
      venueRefetch();
      closeUpdatePitchBox();
      resetUpdate();
    }
  }, [isUpdateSuccess, closeUpdatePitchBox, venueRefetch, resetUpdate]);

  useEffect(() => {
    if (isDeleteSuccess) {
      venueRefetch();
      closeConfirmBox();
      resetDelete();
    }
  }, [isDeleteSuccess, closeConfirmBox, venueRefetch, resetDelete]);

  return (
    <>
      <Button variant='contained' onClick={openAddPitchBox}>
        Thêm mới
      </Button>
      {venue && (
        <>
          <Box>
            <Table size='small' sx={{ marginY: 2 }}>
              <TableHead>
                <TableRow>
                  <TableCell>Tên sân</TableCell>
                  <TableCell>Giá</TableCell>
                  <TableCell>Loại</TableCell>
                  <TableCell>Thao tác</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {venue.pitches.map((pitch) => (
                  <TableRow key={pitch.id}>
                    <TableCell>{pitch.name}</TableCell>
                    <TableCell>{pitch.price}</TableCell>
                    <TableCell>{pitch.pitchCategory.name}</TableCell>
                    <TableCell>
                      <Box display='flex' gap={2}>
                        <IconButton
                          color='primary'
                          onClick={() => {
                            setSeletedPitch(pitch);
                            openConfirmBox();
                          }}
                        >
                          <Delete />
                        </IconButton>
                        <IconButton
                          onClick={() => {
                            setSeletedPitch(pitch);
                            openUpdatePitchBox();
                          }}
                        >
                          <Edit />
                        </IconButton>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Box>
          <ConfirmBox
            title='Bạn có chắc muốn xóa'
            subTitle='Bạn sẽ không thể khôi phục dữ liệu sau khi đã xóa'
            isOpen={isOpenConfirmBox}
            onClose={closeConfirmBox}
            onAccept={handleDeletePitch}
          />
          <AddNewPitchBox
            venue={venue}
            isOpen={isOpenAddPitchBox}
            onClose={closeAddPitchBox}
            onSubmit={(payload) => handleCreatePitch(payload)}
          />
          {seletedPitch && (
            <UpdatePitchBox
              pitch={seletedPitch}
              isOpen={isOpenUpdatePitchBox}
              onClose={() => {
                setSeletedPitch(null);
                closeUpdatePitchBox();
              }}
              onSubmit={(payload) => handleUpdatePitch(payload)}
            />
          )}
        </>
      )}
    </>
  );
};
