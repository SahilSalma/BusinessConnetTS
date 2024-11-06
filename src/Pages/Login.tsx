import React, { useEffect, useState } from 'react';
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
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useAuth } from '../Context/authContext';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@mui/material/styles';
import GoogleSignIn from '../CommonComponents/GoogleSignIn';
import LoadingOverlay from '../CommonComponents/LoadingOverlay';
import { useSelector } from 'react-redux';
import { userError } from '../Redux/selectors';
import Animation from '../CommonComponents/Animation';
import { Animations } from '../Types/allTypes';

const Login: React.FC = () => {
    const { login, isLoading, isAuthenticated } = useAuth();
    const navigate = useNavigate();
    const userLoginError = useSelector(userError);
    const [showPassword, setShowPassword] = useState(false);
    const { t } = useTranslation();
    const theme = useTheme();
    const [alertInfo, setAlertInfo] = useState<{
        open: boolean;
        message: string;
        severity: 'success' | 'error' | 'info' | 'warning';
    }>({
        open: false,
        message: "",
        severity: "info"
    });

    const showAlert = (message: string, severity: 'success' | 'error' | 'info' | 'warning') => {
        setAlertInfo({ open: true, message, severity });
        setTimeout(() => {
            handleCloseAlert();
        }, 6000);
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        await validateFormData(data);
    };

    const handleCloseAlert = () => {
        setAlertInfo({ ...alertInfo, open: false });
    };

    const validateFormData = async (data: FormData) => {
        const email = data.get('email') as string;
        const password = data.get('password') as string;

        if (!email || !password) {
            showAlert(t("AllFieldsRequired"), "error");
            return;
        }
        if (!email.includes('@') || !email.includes('.')) {
            showAlert(t("InvalidEmail"), "error");
            return;
        } else {
            const loginResponse = await login(data);
            if (!loginResponse && userLoginError) {
                showAlert(t(userLoginError), "error");
                return;
            } else {
                navigate('/');
            }
        }
    };

    return (
        <>
        <LoadingOverlay isLoading={isLoading}/>
        <Grid container component="main">
            <CssBaseline />
            <Grid size={{xs: false, sm: 4, md: 7}}
                sx={{
                    // backgroundImage: getRandomImage(),
                    backgroundRepeat: 'no-repeat',
                    backgroundColor: theme.palette.background.default,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            />
            <Grid size={{xs: 12, sm: 8, md: 5}} component={Paper} elevation={6} square>
                <Box sx={{ my: 8, mx: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <Animation size={{ width: 50, height: 50 }} animationData={Animations.LOCK} />
                    <Typography component="h1" variant="h5">{t("SignIn")}</Typography>
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                        {alertInfo.open && (
                            <Box sx={{ paddingBottom: '1rem' }}>
                                <Alert onClose={handleCloseAlert} severity={alertInfo.severity}>
                                    {alertInfo.message}
                                </Alert>
                            </Box>
                        )}
                        <TextField margin="normal" required fullWidth id="email" label={t("EmailAddress")} name="email" autoComplete="email" autoFocus />
                        <TextField margin="normal" required fullWidth id="password" label={t("Password")} name="password" type={showPassword ? "text" : "password"} autoComplete="current-password" />
                        <FormControlLabel control={<Checkbox onChange={() => setShowPassword(!showPassword)} value="showPassword" />} label={t("ShowPassword")} />
                        <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>{t("SignIn")}</Button>
                        <GoogleSignIn />
                        <Grid container justifyContent={'space-between'}>
                            <Grid>
                                <Link href="/forgotpassword" variant="body2">{t("ForgotPassword")}</Link>
                            </Grid>
                            <Grid>
                                <Link href="/signup" variant="body2">{t("NoAccountText")}</Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Grid>
        </Grid>
        </>
    );
};

export default Login;
