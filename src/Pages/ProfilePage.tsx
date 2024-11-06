import React, { useState } from 'react';
import {
    Box,
    Paper,
    Typography,
    TextField,
    Button,
    IconButton,
    Avatar,
    Container,
    CircularProgress,
    Grid2 as Grid,
    Snackbar,
    Alert,
} from '@mui/material';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import { useAuth } from '../Context/authContext';
import { useTheme } from '@mui/material/styles';
import { useDispatch, useSelector } from 'react-redux';
import { Actions } from '../Redux/Reducer/rootReducer';
import { userEditSuccess, userError, userIsLoading } from '../Redux/selectors';
import LoadingOverlay from '../CommonComponents/LoadingOverlay';
import { deleteImage, uploadImage, uploadMultipleImages } from '../Utils/CloudCalls';

const ProfilePage: React.FC = () => {
    const { user } = useAuth();
    const [avatar, setAvatar] = useState<string | null>(user?.avatar || null);
    const [firstName, setFirstName] = useState<string>(user?.firstName || '');
    const [lastName, setLastName] = useState<string>(user?.lastName || '');
    const [email, setEmail] = useState<string>(user?.email || '');
    const [phone, setPhone] = useState<string>(user?.phone || '');
    const [bio, setBio] = useState<string>(user?.bio || '');
    const isEditSuccess = useSelector(userEditSuccess);
    const isLoading = useSelector(userIsLoading);
    const updateFailed = useSelector(userError);
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [deletedImage, setDeletedImage] = useState<string>('');
    const [alertInfo, setAlertInfo] = useState<{
        open: boolean;
        message: string;
        severity: 'info' | 'success' | 'error';
    }>({
        open: false,
        message: "",
        severity: 'info'
    });
    const dispatch = useDispatch();

    const handleCloseAlert = () => {
        setAlertInfo({ ...alertInfo, open: false });
    };

    const showAlert = (message: string, severity: 'info' | 'success' | 'error') => {
        setAlertInfo({ open: true, message, severity });
        setTimeout(() => {
            handleCloseAlert();
        }, 6000);
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (avatar?.startsWith('https://')) {
            const index = avatar.indexOf('/', avatar.indexOf('://') + 3) + 1;
            const imageName = avatar.slice(index);
            setDeletedImage(imageName);
        }

        if (event.target.files && event.target.files[0]) {
            const file = event.target.files[0];
            setImageFile(file);
            setAvatar(URL.createObjectURL(file));
            event.target.value = '';
        }
    };

    const validateUpdate = () => {
        if (avatar === user?.avatar && firstName === user?.firstName && lastName === user?.lastName && email === user?.email && phone === user?.phone && bio === user?.bio) {
            return false;
        }
        return true;
    };

    const handleClick = async (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        if (!validateUpdate()) {
            showAlert('No changes made', 'info');
            return;
        }
        if (deletedImage) {
            await deleteImage(deletedImage);
        }
        let imageUrl = avatar || '';
        if (imageFile) {
            imageUrl = (await uploadImage(imageFile)) || '';
            setAvatar(imageUrl);
        }
        dispatch(Actions.user.fetch.editUserActions.request(
            {user: { 
                _id: user?._id || '',
                firstName,
                lastName,
                email,
                phone,
                bio,
                avatar: imageUrl,
                isAdmin: user?.isAdmin || false,
            }}
        ));

        if (!isLoading && isEditSuccess) {
            showAlert('User updated successfully', 'success');
        } else if (!isLoading && !isEditSuccess && updateFailed) {
            showAlert('Error updating user', 'error');
        }
    };

    const calculateCompletion = () => {
        let completion = 0;
        if (firstName) completion += 5;
        if (lastName) completion += 5;
        if (email) completion += 20;
        if (phone) completion += 20;
        if (bio) completion += 20;
        if (avatar) completion += 10;
        return completion;
    };

    const theme = useTheme();

    return (
        <>
        <LoadingOverlay isLoading={isLoading} />
        <Container maxWidth="lg" sx={{ mt: 2, mb: 2 }}>
            <Snackbar open={alertInfo.open} autoHideDuration={6000} onClose={handleCloseAlert}>
                <Alert onClose={handleCloseAlert} severity={alertInfo.severity}>
                    {alertInfo.message}
                </Alert>
            </Snackbar>
            <Paper elevation={3} sx={{ p: 4 }}>
                <Grid container spacing={4}>
                    <Grid size={{xs: 12, sm: 4}} sx={{ textAlign: 'center' }}>
                        <Box sx={{ position: 'relative', display: 'inline-block' }}>
                            <Avatar
                                src={avatar || '/default-profile.png'}
                                sx={{ width: 150, height: 150, mx: 'auto' }}
                            />
                            <CircularProgress
                                variant="determinate"
                                value={calculateCompletion()}
                                size={150}
                                thickness={1}
                                sx={{
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    zIndex: 1,
                                }}
                            />
                            <input
                                accept="image/*"
                                id="profile-pic-upload"
                                type="file"
                                style={{ display: 'none' }}
                                onChange={handleFileChange}
                            />
                            <label htmlFor="profile-pic-upload">
                                <IconButton
                                    component="span"
                                    sx={{
                                        position: 'absolute',
                                        bottom: 0,
                                        right: 0,
                                        zIndex: 2,
                                        bgcolor: theme.palette.background.paper,
                                    }}
                                >
                                    <PhotoCameraIcon />
                                </IconButton>
                            </label>
                        </Box>
                        <Typography variant="h5" sx={{ mt: 2 }}>
                            {firstName} {lastName}
                        </Typography>
                        <Typography variant="body1" sx={{ mb: 1, mt: 2 }}>
                            Profile Completion:
                        </Typography>
                        <Typography variant="body2">
                            {calculateCompletion()}%
                        </Typography>
                    </Grid>
                    <Grid size={{xs: 12, sm: 8}}>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                            <TextField
                                label="First Name"
                                variant="outlined"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                disabled // Optional: you might want to enable this for editing
                            />
                            <TextField
                                label="Last Name"
                                variant="outlined"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                disabled // Optional: you might want to enable this for editing
                            />
                            <TextField
                                label="Email"
                                variant="outlined"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                disabled // Optional: you might want to enable this for editing
                            />
                            <TextField
                                label="Phone"
                                variant="outlined"
                                type="tel"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                            />
                            <TextField
                                label="Bio"
                                variant="outlined"
                                multiline
                                rows={4}
                                value={bio}
                                onChange={(e) => setBio(e.target.value)}
                            />
                            <Button variant="contained" sx={{ mt: 2 }} onClick={handleClick}>
                                Save Changes
                            </Button>
                        </Box>
                    </Grid>
                </Grid>
            </Paper>
        </Container>
        </>
    );
};

export default ProfilePage;
