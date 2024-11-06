import React, { useState } from 'react';
import {
  Alert,
  Button,
  CssBaseline,
  TextField,
  Link,
  Grid2 as Grid,
  Box,
  Paper,
  Typography,
  createTheme,
  ThemeProvider
} from '@mui/material';
import { forgotPassword } from '../Utils/BackendAPICalls';
import LoadingOverlay from '../CommonComponents/LoadingOverlay';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@mui/material/styles';
import Animation from '../CommonComponents/Animation';
import { Animations } from '../Types/allTypes';

const ForgotPassword: React.FC = () => {
  const [alertInfo, setAlertInfo] = useState<{
    open: boolean;
    message: string;
    severity: 'info' | 'success' | 'warning' | 'error';
  }>({
    open: false,
    message: '',
    severity: 'info'
  });

  const { t } = useTranslation();
  const theme = useTheme();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  
  const showAlert = (message: string, severity: 'info' | 'success' | 'warning' | 'error') => {
    setAlertInfo({ open: true, message, severity });
    setTimeout(() => {
      handleCloseAlert();
    }, 6000);
  };

  const handleCloseAlert = () => {
    setAlertInfo({ ...alertInfo, open: false });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    setIsLoading(true);
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get('email') as string;

    if (!email || !email.includes('@') || !email.includes('.')) {
      showAlert(t('AllFieldsRequiredFormat'), 'error');
      setIsLoading(false);
      return;
    }

    forgotPassword(email).then((response) => {
      if (response.message === 'PasswordResetEmailSent') {
        showAlert(t('PasswordResetEmailSent'), 'success');
        setTimeout(() => {
          setIsLoading(false);
        }, 2000);
      } else {
        setIsLoading(false);
        showAlert(response.error, 'error');
      }
    }).catch((error) => {
      setIsLoading(false);
      console.error('Error:', error);
      showAlert(t('PasswordResetEmailFailed'), 'error');
    });
  };

  const buildForgotPassword = () => {
    return (
        <Grid container component="main">
          <CssBaseline />
          <Grid size={{xs: false, sm: 4, md: 7}}
            sx={{
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
          <Grid size={{xs: 12, sm: 8, md: 5}} component={Paper} elevation={6} square>
            <Box sx={{ my: 8, mx: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <Animation size={{ width: 50, height: 50 }} animationData={Animations.LOCK} />
              <Typography component="h1" variant="h5">{t('ForgotPasswordTitle')}</Typography>
              <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                {alertInfo.open && (
                  <Box sx={{ paddingBottom: '1rem' }}>
                    <Alert onClose={handleCloseAlert} severity={alertInfo.severity}>{alertInfo.message}</Alert>
                  </Box>
                )}
                <Typography component="h3" variant="subtitle1">{t('ForgotPasswordDescription')}</Typography>
                <TextField margin="normal" required fullWidth id="email" label={t('EmailAddress')} name="email" autoComplete="email" autoFocus />
                <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>{t('PasswordReset')}</Button>
                <Grid container justifyContent="flex-end">
                  <Grid>
                    <Link href="/login" variant="body2">{t('ReturnToSignIn')}</Link>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Grid>
        </Grid>
    );
  };

  return (
    <>
      <LoadingOverlay isLoading={isLoading}/>
      {buildForgotPassword()}
    </>
  );
};

export default ForgotPassword;
