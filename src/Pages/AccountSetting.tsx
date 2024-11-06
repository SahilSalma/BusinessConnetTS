import React, { useState } from 'react';
import { Alert, Box, Button, Grid2 as Grid, Container, Paper, Tab, Tabs, TextField, Typography } from '@mui/material';
import CustomTabPanel from '../CommonComponents/CustomTabPanel';
import DeleteAccount from '../Components/DeleteAccount';
import SuccessDialog from '../CommonComponents/SuccessDialog';
import { useAuth } from '../Context/authContext';
import { useTheme } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { Actions } from '../Redux/Reducer/rootReducer';

const AccountSetting: React.FC = () => {
    const [value, setValue] = useState<number>(0);
    const [deleteAccountPopup, setDeleteAccountPopup] = useState<boolean>(false);
    const [changePasswordToast, setChangePasswordToast] = useState<boolean>(false);
    const dispatch = useDispatch();
    const [alertInfo, setAlertInfo] = useState<{
        open: boolean;
        message: string;
        severity: 'error' | 'success' | 'info';
    }>({
        open: false,
        message: "",
        severity: "info"
    });
    const theme = useTheme();
    const { t } = useTranslation();

    const selectedTabStyle = { boxShadow: '0 3px 10px rgb(0 0 0 / 0.2)', fontWeight: 900 };
    const unselectedTabStyle = { fontWeight: 500 };
    const buttonSyle = { margin: '1rem' };

    const { user } = useAuth();

    const getDataDisplay = (label: string, displayValue: string, editable: boolean, id?: string) => {
        const notEditableStyle = { backgroundColor: theme.palette.text.disabled };
        return (
            <Grid container spacing={2} alignItems="center" sx={{ padding: '1rem' }}>
                <Grid size={{xs: 3}}>
                    <Typography align='left' sx={{ fontWeight: '900' }}>{label}</Typography>
                </Grid>
                <Grid size={{xs: 6}}>
                    <TextField
                        type={!editable ? 'text' : 'password'}
                        sx={!editable ? notEditableStyle : {}}
                        id={id ? id : "outlined-basic"}
                        label={displayValue}
                        variant="outlined"
                        fullWidth
                        disabled={!editable}
                    />
                </Grid>
            </Grid>
        );
    };

    const handleChange = (event: React.SyntheticEvent, newValue: number) => setValue(newValue);

    const handleChangePassword = () => {
        const currentPassword = (document.getElementById('current-password') as HTMLInputElement).value;
        const newPassword = (document.getElementById('new-password') as HTMLInputElement).value;
        const confirmPassword = (document.getElementById('confirm-password') as HTMLInputElement).value;

        validateFormData({
            currentPassword,
            newPassword,
            confirmPassword
        });
    };

    const validateFormData = ({
        currentPassword,
        newPassword,
        confirmPassword
    }: {
        currentPassword: string;
        newPassword: string;
        confirmPassword: string;
    }) => {
        if (!currentPassword || !newPassword || !confirmPassword) {
            setAlertInfo({ open: true, message: t("AllFieldsRequired"), severity: "error" });
            return;
        }
        if (newPassword !== confirmPassword) {
            setAlertInfo({ open: true, message: t("PasswordsDoNotMatch"), severity: "error" });
            return;
        }

        dispatch(Actions.user.fetch.updatePasswordActions.request({
            currentPassword,
            newPassword
        }));

        // userUpdatePassword({
        //     id: String(user?._id),
        //     currentPassword,
        //     newPassword
        // }).then(response => {
        //     if (response === true) {
        //         setAlertInfo({ open: true, message: t("ChangePasswordSuccess"), severity: "success" });
        //         setChangePasswordToast(true);
        //     } else {
        //         setAlertInfo({ open: true, message: t(response.error), severity: "error" });
        //     }
        // });
        setTimeout(() => {
            handleCloseAlert();
        }, 6000);
    };

    const handleCloseAlert = () => {
        setAlertInfo({ ...alertInfo, open: false });
    };

    const handleDeleteAccount = () => {
        setDeleteAccountPopup(true);
    };

    const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setChangePasswordToast(false);
    };

    return (
        <>
            <DeleteAccount setAlertInfo={setAlertInfo} open={deleteAccountPopup} setOpen={setDeleteAccountPopup} />
            <SuccessDialog
                title={t("ChangePasswordSuccessDialogTitle")}
                description={t("ChangePasswordSuccessDialogDescription")}
                open={changePasswordToast}
                actionName={t("OK")}
                actionFunction={handleClose}
                setOpen={setChangePasswordToast}
            />
            <Container maxWidth="xl" sx={{ mt: 2, mb: 2 }}>
                <Paper elevation={4} sx={{ minHeight: '30rem', backgroundColor: theme.palette.background.paper }}>
                    <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                        <Tab label={t("AccountInfo")} sx={value === 0 ? selectedTabStyle : unselectedTabStyle} />
                        <Tab label={t("ChangePassword")} sx={value === 1 ? selectedTabStyle : unselectedTabStyle} />
                    </Tabs>
                    <CustomTabPanel value={value} index={0}>
                        {alertInfo.open && <Box sx={{ paddingBottom: '1rem' }} >
                            <Alert onClose={() => handleCloseAlert()} severity={alertInfo.severity}>{alertInfo.message}</Alert>
                        </Box>}
                        <Grid container direction={'column'} spacing={2} justifyContent="center">
                            {getDataDisplay(t("FirstName"), user?.firstName || "", false)}
                            {getDataDisplay(t("LastName"), user?.lastName || "", false)}
                            {getDataDisplay(t("Email"), user?.email || "", false)}
                        </Grid>
                        <Button
                            variant="contained"
                            onClick={handleDeleteAccount}
                            sx={{ "&:hover": { backgroundColor: theme.palette.error.main, color: 'white' }, buttonSyle }}
                        >
                            {t("DeleteAccount")}
                        </Button>
                    </CustomTabPanel>
                    <CustomTabPanel value={value} index={1}>
                        {alertInfo.open && <Box sx={{ paddingBottom: '1rem' }} >
                            <Alert onClose={() => handleCloseAlert()} severity={alertInfo.severity}>{alertInfo.message}</Alert>
                        </Box>}
                        <Grid container direction={'column'} spacing={2} justifyContent="center">
                            {getDataDisplay(t("CurrentPassword"), t("CurrentPassword"), true, 'current-password')}
                            {getDataDisplay(t("NewPassword"), t("NewPassword"), true, 'new-password')}
                            {getDataDisplay(t("ConfirmPassword"), t("ConfirmPassword"), true, 'confirm-password')}
                        </Grid>
                        <Button variant="contained" sx={buttonSyle} onClick={handleChangePassword}>{t("ChangePassword")}</Button>
                    </CustomTabPanel>
                </Paper>
            </Container>
            {/* <ThemeToggle /> */}
        </>
    );
};

export default AccountSetting;
