import React, { useRef, useEffect, useState } from 'react';
import {
    Avatar,
    Alert,
    Button,
    CssBaseline,
    TextField,
    FormControlLabel,
    Checkbox,
    Link,
    Grid2 as Grid,
    Box,
    Paper,
    Typography,
    IconButton,
    Tooltip,
} from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { resetPassword } from '../Utils/BackendAPICalls';
import { t } from 'i18next';
import Animation from '../CommonComponents/Animation';
import { Animations } from '../Types/allTypes';
import { Visibility, VisibilityOff } from '@mui/icons-material';

const NewPassword: React.FC = () => {
    const isMountedRef = useRef(true);
    const history = useNavigate();
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
    const { token } = useParams<{ token: string }>();
    const [alertInfo, setAlertInfo] = useState<{
        open: boolean;
        message: string;
        severity: "error" | "info" | "success";
    }>({
        open: false,
        message: "",
        severity: "info",
    });

    useEffect(() => {
        return () => {
            isMountedRef.current = false;
        };
    }, []);

    const showAlert = (message: string, severity: "error" | "info" | "success") => {
        setAlertInfo({ open: true, message, severity });
        setTimeout(() => {
            handleCloseAlert();
        }, 6000);
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        data.append('token', token || '');
        validateFormData(data);
    };

    const handleCloseAlert = () => {
        setAlertInfo((prev) => ({ ...prev, open: false }));
    };

    const validateFormData = async (data: FormData) => {
        if (!data.get('confirmPassword') || !data.get('newPassword')) {
            showAlert(t("AllFieldsRequired"), "error");
            return;
        }
        if (data.get('newPassword') !== data.get('confirmPassword')) {
            showAlert(t("PasswordMismatch"), "error");
            return;
        } else {
            resetPassword({
                password: data.get('newPassword') as string,
                token: data.get('token') as string,
            }).then((response) => {
                if (response.error) {
                    showAlert(t(response.error), "error");
                    return;
                }
                if (isMountedRef.current) {
                    showAlert(t("ResetPasswordSuccess"), "success");
                    setTimeout(() => {
                        history('/login');
                    }, 1000);
                }
            }).catch((error) => {
                console.error("An error occurred:", error);
                showAlert(t("ResetPasswordFailed"), "error");
            });
        }
    };

    const handleShowPassword = (id: string) => {
        if (id === 'newPassword') {
            setShowPassword(!showPassword);
        } else {
            setShowConfirmPassword(!showConfirmPassword);
        }
    };

    const buildTextField = (
        name: string,
        id: string,
        label: string,
        show: boolean,
    ) => (
        <TextField
            sx={{my: 2}}
            type={show ? 'text' : 'password'}
            name={name}
            required
            fullWidth
            id={id}
            label={label}
            slotProps={{
                input: {
                    endAdornment: (
                        <Tooltip title={show ? t("HidePassword") : t("ShowPassword")}>
                            <IconButton
                                onClick={() => handleShowPassword(id)}
                                style={{ minWidth: '2rem' }}
                            >
                                {show ? <VisibilityOff /> : <Visibility/>}
                            </IconButton>
                        </Tooltip>
                    ),
                }
            }}
            autoFocus
        />
    );

    return (
        <Grid container component="main" sx={{ height: '100vh' }}>
            <CssBaseline />
            <Grid size={{xs:false, sm:4, md:7}}
                sx={{
                    // backgroundImage: getRandomImage(),
                    backgroundRepeat: 'no-repeat',
                    backgroundColor: (t) =>
                        t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            />
            <Grid size={{xs: 12, sm: 8, md: 5}} component={Paper} elevation={6} square>
                <Box sx={{ my: 8, mx: 4, display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                    <Animation size={{width: 50, height: 50}} animationData={Animations.LOCK} /> 
                    <Typography component="h1" variant="h5">{t("ResetPasswordTitle")}</Typography>
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                        {alertInfo.open && (
                            <Box sx={{ paddingBottom: '1rem' }}>
                                <Alert onClose={handleCloseAlert} severity={alertInfo.severity}>
                                    {alertInfo.message}
                                </Alert>
                            </Box>
                        )}
                        {buildTextField('newPassword', 'newPassword', t("NewPassword"), showPassword)}
                        {buildTextField('confirmPassword', 'confirmPassword', t("ConfirmPassword"), showConfirmPassword)}
                        <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} >{t("ResetPassword")}</Button>
                        <Grid container justifyContent={'space-between'}>
                            <Grid>
                                <Link href="/login" variant="body2">{t("ReturnToSignIn")}</Link>
                            </Grid>
                            <Grid>
                                <Link href="/signup" variant="body2">{t("NoAccountText")}</Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Grid>
        </Grid>
    );
}

export default NewPassword;
