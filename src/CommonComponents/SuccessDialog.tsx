import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import CheckIcon from '@mui/icons-material/Check';
import { Avatar, Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { Animations, SuccessDialogProps } from '../Types/allTypes';
import Animation from './Animation';

const SuccessDialog: React.FC<SuccessDialogProps> = ({
  title,
  description,
  description2,
  actionName,
  actionFunction,
  open,
  setOpen
}) => {
  const handleClose = () => {
    setOpen(false);
  };
  const theme = useTheme();

  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth={true}
      >
        <DialogTitle
          sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
          id="alert-dialog-title"
        >
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Animation size={{ width: 200, height: 200 }} animationData={Animations.CELEBRATE} />
            <Animation size={{ width: 200, height: 200 }} animationData={Animations.CELEBRATE} />
            <Animation size={{ width: 200, height: 200 }} animationData={Animations.CELEBRATE} />
          </Box>
          {title}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">{description}</DialogContentText>
          {description2 && (
            <DialogContentText id="alert-dialog-description-2">{description2}</DialogContentText>
          )}
        </DialogContent>
        <DialogActions sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Button variant='contained' onClick={actionFunction} autoFocus>
            {actionName}
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

export default SuccessDialog;
