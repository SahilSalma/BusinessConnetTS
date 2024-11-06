import * as React from 'react';
import {
    Button,
    TextField,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@mui/material/styles';
import { useDispatch } from 'react-redux';
import { Actions } from '../Redux/Reducer/rootReducer';

interface DeleteAccountProps {
    open: boolean;
    setOpen: (open: boolean) => void;
    setAlertInfo: (alert: { open: boolean; message: string; severity: 'success' | 'error' }) => void;
}

const DeleteAccount: React.FC<DeleteAccountProps> = ({
    open,
    setOpen,
    setAlertInfo
}) => {
    const theme = useTheme();
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const handleClose = () => {
        setOpen(false);
    };

    const handleOnSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const password = formData.get('password') as string; // Ensure it's a string
        
        dispatch(Actions.user.fetch.deleteUserActions.request({ password }));

        // if (response === true) {
        //     setAlertInfo({ open: true, message: t("AccountDeleted"), severity: "success" });
        //     handleClose();
        //     logout();
        // } else {
        //     setAlertInfo({ open: true, message: t(response.error), severity: "error" });
        //     handleClose();
        // }
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
            <DialogTitle sx={{ color: theme.palette.error.main, fontWeight: '700' }}>{t("DeleteAccountWarningTitle")}</DialogTitle>
            <DialogContent>
                <DialogContentText variant='subtitle1'>{t("DeleteAccountWarningDescription")}</DialogContentText>
                <br />
                <DialogContentText fontWeight='700' variant='subtitle2'>{t("DeleteAccountWarningDescriptionTwo")}</DialogContentText>
                <TextField autoFocus required margin="dense"
                    id="password"
                    name="password"
                    label={t("Password")}
                    type="password"
                    fullWidth
                    variant="standard"
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button sx={{ color: theme.palette.error.main }} type="submit">{t("DeleteAccount")}</Button>
            </DialogActions>
        </Dialog>
    );
}

export default DeleteAccount;
