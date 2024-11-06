import React, { useEffect, useState } from 'react';
import { TextField, Button, Typography, Box, Paper, Grid2, Avatar, Dialog, DialogActions, DialogTitle, DialogContentText, List, ListItem, Menu, MenuItem, DialogContent, ButtonGroup } from '@mui/material';
import { CloseOutlined, Photo } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { useAuth } from '../Context/authContext';
import { Actions } from '../Redux/Reducer/rootReducer';
import { businesses, postsLoading } from '../Redux/selectors';
import { t } from 'i18next';
import { uploadMultipleImages } from '../Utils/CloudCalls';
import LoadingOverlay from '../CommonComponents/LoadingOverlay';
import { useNavigate } from 'react-router-dom';
import EmojiPickerComponent from '../CommonComponents/EmojiPicker';
import { useTheme } from '@mui/material/styles';


const AddPost: React.FC = () => {
  const [content, setContent] = useState<string>('');
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const businessData = useSelector(businesses);
  const [business, setBusiness] = useState<string>(businessData?.[0]?._id || '');
  const isLoading = useSelector(postsLoading);
  const [tempImages, setTempImages] = useState<string[]>([]);
  const [images, setImages] = useState<File[]>([]);
  const { user, isAuthenticated } = useAuth();
  const theme = useTheme();
  const navigator = useNavigate();
  const dispatch = useDispatch();
  
  useEffect(() => {
    user?._id && dispatch(Actions.business.fetch.businessActions.request({ userListing: user?.email }));
  }, [user]);

  useEffect(() => {
    if ((businessData ?? []).length > 0) {
      setBusiness(businessData?.[0]._id || '');
    }
  }, [businessData]);

  const handleSubmit = async (event: React.FormEvent) => {
    if (content) {
        const uploadImages = await uploadMultipleImages(images);
        dispatch(Actions.posts.addPostActions.request({ post: {
            content, businessId: business,
            media: uploadImages,
            _id: '',
            businessName: '',
            userId: user?._id || '',
            avatar: '',
            comments: [],
            createdAt: ''
        }}));
        setContent('');
        setImages([]);
        setTempImages([]);
        setIsExpanded(false);
    }
  };

    interface ImageChangeEvent extends React.ChangeEvent<HTMLInputElement> {
        target: HTMLInputElement & {
            files: FileList;
        };
    }

    const handleImageChange = (e: ImageChangeEvent) => {
        const files = Array.from(e.target.files);
        if (!files) return;
        const imageUrls = files.map(file => URL.createObjectURL(file));
        setImages(prevImages => [...prevImages, ...files]);
        setTempImages(imageUrls);
    };

    const handleRemoveImage = (index: number) => {
        setImages(prevImages => prevImages.filter((_, i) => i !== index));
        setTempImages(prevImages => prevImages.filter((_, i) => i !== index));
    };



  const getDropdownField = () => {
    return (
        <TextField
            select={true}
            name="business"
            value={business}
            onChange={(event) => setBusiness(event.target.value)}
            variant="filled"
            sx={{
                '& .MuiFilledInput-root': {
                    backgroundColor: 'background.default',
                },
                '& .MuiFilledInput-underline:before': {
                    borderBottom: 'none',
                },
                '& .MuiFilledInput-underline:after': {
                    borderBottom: 'none',
                },
                '& .MuiFilledInput-underline:hover:not(.Mui-disabled):before': {
                    borderBottom: 'none',
                },
            }}
        >
            {businessData?.map((option) => (
                <MenuItem
                    sx={{ height: 60, borderBottom: '.02em solid #bbb' }}
                    key={option._id}
                    value={option._id}
                >
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Avatar sx={{ mr: 1, bgcolor: 'primary.main' }} src={option.photoUrls[0]} />
                        <Typography variant="h6" textAlign={'center'}>{option.name}</Typography>
                    </Box>
                </MenuItem>
            ))}
        </TextField>
    );
};

  const buildRegisterDialog = () => {
    return (
        <Dialog open={isExpanded} onClose={() => setIsExpanded(false)}>
            <DialogTitle color='error' sx={{ display: 'flex', alignItems: 'center' }}>
                {t('noBusinessDialogTitle')}
            </DialogTitle>
            <DialogContent sx={(theme) => ({
                [theme.breakpoints.up('lg')]: {
                    width: 550,
                }
            })}>
                <DialogContentText>
                    {t('noBusinessDialogDescription')}
                </DialogContentText>
            </DialogContent>
            <DialogActions sx={{display: 'flex', justifyContent: 'space-between'}}>
                <Button onClick={() => setIsExpanded(false)} >{t('close')}</Button>
                <Button onClick={() => navigator('/listHere')}>{t('noBusinessDialogButton')}</Button>
            </DialogActions>
        </Dialog>
    );
  };

  const buildPostDialog = () => {
    return (
        <Dialog open={isExpanded} onClose={() => setIsExpanded(false)}>
            <DialogTitle sx={{ display: 'flex', alignItems: 'center' }}>
                {getDropdownField()}
            </DialogTitle>
            <DialogContent sx={(theme) => ({
                [theme.breakpoints.up('lg')]: {
                    width: 550,
                }
            })}>
                <TextField
                    placeholder='What do you want to share?'
                    variant="filled"
                    fullWidth
                    margin="normal"
                    value={content}
                    multiline
                    onChange={(event) => setContent(event.target.value)}
                    sx={{
                        '& .MuiFilledInput-root': {
                            backgroundColor: 'background.paper',
                        },
                        '& .MuiFilledInput-underline:before': {
                            borderBottom: 'none',
                        },
                        '& .MuiFilledInput-underline:after': {
                            borderBottom: 'none',
                        },
                        '& .MuiFilledInput-underline:hover:not(.Mui-disabled):before': {
                            borderBottom: 'none',
                        },
                        '& .MuiInputBase-input': {
                            minHeight: 290,
                        },
                    }}
                />
                <input
                    style={{ display: 'none' }}
                    id="upload-photo"
                    name="upload-photo"
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleImageChange}
                />
                <label htmlFor="upload-photo">
                    <Button component="span">
                        <Photo />
                    </Button>
                </label>
                <EmojiPickerComponent content={content} setContent={setContent} />
                <Box sx={{ display: 'flex', flexWrap: 'wrap', mt: 2 }}>
                    {tempImages.map((image, index) => (
                        <Box key={index} sx={{ position: 'relative' }}>
                        <img
                            key={index}
                            src={image}
                            alt={`Image Preview ${index + 1}`}
                            style={{
                                width: 100,
                                height: 100,
                                objectFit: 'fill',
                                margin: '0.5em',
                                borderRadius: 20,
                                border: '0.1em solid',
                            }}
                        />
                        <CloseOutlined 
                            sx={{
                                position: 'absolute',
                                top: 8,
                                right: 8,
                                scale: 0.5,
                                color: 'error.main',
                                fontSize: 30,
                                backgroundColor: 'background.paper',
                                borderRadius: 50,
                                '&:hover': {
                                    backgroundColor: 'error.main',
                                    color: 'background.paper',
                                },
                            }}
                            onClick={() => handleRemoveImage(index)}
                        />
                        </Box>
                    ))}
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleSubmit}>Post</Button>
            </DialogActions>
        </Dialog>
    )
  };

  return (
    <>
    <LoadingOverlay isLoading={isLoading} />
    {(businessData?.length === 0) && buildRegisterDialog()}
    {businessData && businessData?.length > 0 &&buildPostDialog()}
    <Paper sx={{ p: 2, my: 2 }}>
        <Grid2 container spacing={2} display={'flex'} alignItems={'center'}>
            <Grid2 size={{xs: 2, lg: 1}}>
                <Avatar sx={{border: 2, borderColor: theme.palette.primary.main}} src={user?.avatar}/>
            </Grid2>
            <Grid2 size={{xs: 10, lg: 11}}>
                <Typography 
                    variant="h6" 
                    borderRadius={5} 
                    border={2} 
                    textAlign={'center'} 
                    height={50} 
                    display="flex" 
                    alignItems="center" 
                    justifyContent="center"
                    onClick={() => setIsExpanded(true)}
                >
                    {t('whatsOnYourMind')}
                </Typography>
            </Grid2>
        </Grid2>
    </Paper>
    </>
  );
};

export default AddPost;
