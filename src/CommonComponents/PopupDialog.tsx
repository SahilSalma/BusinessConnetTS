import React from 'react';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle
} from '@mui/material';
import { DeleteAccountProps } from '../Types/allTypes';

const DeleteAccount: React.FC<DeleteAccountProps> = ({
    open,
    setOpen,
    handleOnClose,
    handleOnSubmit,
    title,
    description,
    description2,
    cancelButtonName,
    submitButtonName
}) => {
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      PaperProps={{
        component: 'form',
        onSubmit: handleOnSubmit,
      }}
    >
      <DialogTitle sx={{ fontWeight: '700' }}>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText variant='subtitle1'>{description}</DialogContentText>
        <br />
        {description2 && (
          <DialogContentText fontWeight='700' variant='subtitle2'>{description2}</DialogContentText>
        )}
      </DialogContent>
      {(cancelButtonName || submitButtonName) && (
        <DialogActions>
          {cancelButtonName && (
            <Button sx={{ color: 'red' }} onClick={handleOnClose}>
              {cancelButtonName}
            </Button>
          )}
          {submitButtonName && (
            <Button type="submit">
              {submitButtonName}
            </Button>
          )}
        </DialogActions>
      )}
    </Dialog>
  );
};

export default DeleteAccount;
