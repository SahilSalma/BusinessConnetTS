import React, { useEffect, useState } from 'react';
import {
    Avatar,
    Button,
    CssBaseline,
    TextField,
    Link,
    Grid2 as Grid,
    Box,
    Paper,
    Typography,
    FormControlLabel,
    Checkbox,
    Alert,
    IconButton,
    Tooltip,
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import SuccessDialog from '../CommonComponents/SuccessDialog';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@mui/material/styles';
import GoogleSignIn from '../CommonComponents/GoogleSignIn';
import { useAuth } from '../Context/authContext';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { emailRegex } from '../Utils/Utils';
import { useDispatch, useSelector } from 'react-redux';
import { userError, userToken as currentUserToken } from '../Redux/selectors';
import { Actions } from '../Redux/Reducer/User';
import Animation from '../CommonComponents/Animation';
import { Animations } from '../Types/allTypes';

const SignUp: React.FC = () => {
    const [signUpDialog, setSignUpDialog] = useState<boolean>(false);
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
    
    const signUpFailure = useSelector(userError);
    const userToken = useSelector(currentUserToken);
    const { isLoading, isAuthenticated } = useAuth();
    const [alertInfo, setAlertInfo] = useState<{
        open: boolean;
        message: string;
        severity: "info" | "success" | "error";
    }>({
        open: false,
        message: "",
        severity: "info",
    });

    const navigate = useNavigate();
    const theme = useTheme();
    const { t } = useTranslation();
    const dispatch = useDispatch();


    useEffect(() => {
        if (!isLoading && isAuthenticated) {
            navigate('/');
        }
    }, []);

    useEffect(() => {
        if (!isLoading && userToken) {
            setSignUpDialog(true);
            showAlert(t("SignUpSuccess"), "success");
        }
    }, [userToken]);

    const showAlert = (message: string, severity: "info" | "success" | "error") => {
        setAlertInfo({ open: true, message, severity });
        setTimeout(() => {
            handleCloseAlert();
        }, 6000);
    };

    const handleCloseAlert = () => {
        setAlertInfo({ ...alertInfo, open: false });
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        validateFormData(data);
    };

    const handleShowPassword = (id: string) => {
        if (id === 'password') {
            setShowPassword(!showPassword);
        } else {
            setShowConfirmPassword(!showConfirmPassword);
        }
    };

    const buildTextField = (
        name: string,
        autoComplete: string,
        id: string,
        label: string,
        isSmall?: boolean,
        password?: boolean
    ) => (
        <Grid size={{xs: 12, sm:isSmall ? 6 : false }} key={id}>
            <TextField
                autoComplete={autoComplete}
                type={(!password) ? 'text' : 'password'}
                name={name}
                required
                fullWidth
                id={id}
                label={label}
                slotProps={{
                    input: {
                        endAdornment: (id === 'password' || id === 'confirmPassword') ? (
                            <Tooltip title={!password ? t("HidePassword") : t("ShowPassword")}>
                                <IconButton
                                    onClick={() => handleShowPassword(id)}
                                    style={{ minWidth: '2rem' }}
                                >
                                    {!password ? <VisibilityOff /> : <Visibility/>}
                                </IconButton>
                            </Tooltip>
                        ) : null,
                    }
                }}
                autoFocus
            />
        </Grid>
    );

    const handleSignUp = async () => {
        dispatch(Actions.fetch.signUpUserActions.request({
            email: (document.getElementById('email') as HTMLInputElement)?.value,
            password: (document.getElementById('password') as HTMLInputElement)?.value,
            firstName: (document.getElementById('firstName') as HTMLInputElement)?.value,
            lastName: (document.getElementById('lastName') as HTMLInputElement)?.value,
        }));
        if (signUpFailure && !isLoading) {
            showAlert(t(signUpFailure), "error");
            return;
        } else if (!isLoading && userToken) {
            setSignUpDialog(true);
            showAlert(t("SignUpSuccess"), "success");
        }
    };

    const returnToLogin = () => {
        navigate('/');
    };

    const validateFormData = (data: FormData) => {
        const password = data.get('password') as string;
        const confirmPassword = data.get('confirmPassword') as string;
        const firstName = data.get('firstName') as string;
        const lastName = data.get('lastName') as string;
        const email = data.get('email') as string;

        if (!firstName || !lastName || !email || !password || !confirmPassword) {
            showAlert(t("AllFieldsRequired"), "error");
            return;
        }
        if (!emailRegex.test(email)) {
            showAlert(t("InvalidEmail"), "error");
            return;
        }
        if (password !== confirmPassword) {
            showAlert(t("PasswordsDoNotMatch"), "error");
            return;
        }
        handleSignUp();
    };

    return (
        <>
            <SuccessDialog
                title={t("SignUpSuccessDialogTitle")}
                description={t("SignUpSuccessDialogDescription")}
                description2={t("SignUpSuccessDialogDescriptionTwo")}
                open={signUpDialog}
                actionName={t("Login")}
                actionFunction={returnToLogin}
                setOpen={setSignUpDialog}
            />
            <Grid container component="main" sx={{ height: '100vh' }}>
                <CssBaseline />
                <Grid size={{xs:false,sm:4,md:7}}
                    sx={{
                        // backgroundImage: getRandomImage(),
                        backgroundRepeat: 'no-repeat',
                        backgroundColor: theme.palette.background.default,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                />
                <Grid size={{xs:12,sm:8,md:5}} component={Paper} elevation={6} square>
                    <Box sx={{ my: 8, mx: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <Animation size={{ width: 50, height: 50 }} animationData={Animations.LOCK} />
                        <Typography component="h1" variant="h5">{t("SignUp")}</Typography>
                        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                            {alertInfo.open && (
                                <Box sx={{ paddingBottom: '1rem' }}>
                                    <Alert onClose={() => handleCloseAlert()} severity={alertInfo.severity}>
                                        {alertInfo.message}
                                    </Alert>
                                </Box>
                            )}
                            <Grid container spacing={2}>
                                {buildTextField("firstName", "given-name", "firstName", t("FirstName"), true, false)}
                                {buildTextField("lastName", "family-name", "lastName", t("LastName"), true, false)}
                                {buildTextField("email", "email", "email", t("EmailAddress"), false, false)}
                                {buildTextField("password", "new-password", "password", t("Password"), false, !showPassword)}
                                {buildTextField("confirmPassword", "new-password", "confirmPassword", t("ConfirmPassword"), false, !showConfirmPassword)}
                            </Grid>
                            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                                {t("SignUp")}
                            </Button>
                            <GoogleSignIn />
                            <Grid container justifyContent="flex-end">
                                <Grid>
                                    <Link href="/login" variant="body2">{t("ExistingAccountText")}</Link>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </>
    );
}

export default SignUp;
