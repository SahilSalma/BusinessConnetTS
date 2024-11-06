import React, { useState, useEffect } from 'react';
import {
    TextField,
    Button,
    Typography,
    Container,
    List,
    ListItem,
    Paper,
    Dialog,
    DialogContent,
    DialogTitle,
    Avatar,
    Box
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Rating from '@mui/material/Rating';
import ImageUpload from '../CommonComponents/ImageUpload';
import ImageDisplay from '../CommonComponents/ImageDisplay';
import { useAuth } from '../Context/authContext';
import PopupDialog from '../CommonComponents/PopupDialog';
import { Review as ReviewType, ReviewComponentProps } from '../Types/allTypes';
import { useDispatch, useSelector } from 'react-redux';
import { reviews as reviewsData, reviewsLoading } from '../Redux/selectors';
import { Actions } from '../Redux/Reducer/rootReducer';
import LoadingOverlay from '../CommonComponents/LoadingOverlay';
import { formatDate } from '../Utils/Utils';

const Review: React.FC<ReviewComponentProps> = ({ businessId, userId }) => {
    const { isAuthenticated } = useAuth();
    const navigate = useNavigate();
    const [showPopup, setShowPopup] = useState<boolean>(false);
    const [reviewTitle, setReviewTitle] = useState<string>('');
    const [reviewText, setReviewText] = useState<string>('');
    const [images, setImages] = useState<string[]>([]);
    const [tempImages, setTempImages] = useState<string[]>([]);
    const [showReviewField, setShowReviewField] = useState<boolean>(false);
    const [rating, setRating] = useState<number | null>(0);
    const reviews = useSelector(reviewsData);
    const isLoading = useSelector(reviewsLoading);
    const dispatch = useDispatch();

    const handleReviewTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setReviewTitle(e.target.value);
    };

    const handleReviewChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setReviewText(e.target.value);
    };

    const handleImageChange = (files: File[]) => {
        const imageUrls = files.map(file => URL.createObjectURL(file));
        setTempImages(imageUrls);
    };

    const handleRemoveImage = (index: number) => {
        setTempImages(prevImages => prevImages.filter((_, i) => i !== index));
    };

    const handlePostReview = async () => {
        dispatch(Actions.reviews.addReviewActions.request({
            review: {
                _id: '',
                avatar: '',
                username: '',
                businessId,
                userId,
                title: reviewTitle,
                content: reviewText,
                images,
                rating: rating || 0
            }
        }));
        setReviewTitle('');
        setReviewText('');
        setImages([]);
        setTempImages([]);
        setRating(0);
        setShowReviewField(false);
    };

    useEffect(() => {
        if (businessId) {
            dispatch(Actions.reviews.fetchReviewsActions.request({businessId}));
        }
    }, [businessId]);

    const handleWriteReview = () => {
        if (isAuthenticated) {
            setShowReviewField(true);
        } else {
            setShowPopup(true);
        }
    };

    return (
        <>
        <LoadingOverlay isLoading={isLoading} />
        <Container>
            <PopupDialog
                open={showPopup} setOpen={setShowPopup}
                title={"Please sign in to write a review"}
                description={"You need to be signed in to write a review. If you don't have an account, you can create one for free."}
                cancelButtonName={"Stay on Page"}
                submitButtonName={"Sign In"}
                handleOnClose={() => setShowPopup(false)}
                handleOnSubmit={() => navigate('/login', { replace: true })}
            />
            <Typography variant="h4" gutterBottom>
                Reviews
            </Typography>

            {!showReviewField ? (
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleWriteReview}
                >
                    Write a Review
                </Button>
            ) : (
                <Paper style={{ padding: '16px', marginBottom: '16px' }}>
                    <TextField
                        fullWidth
                        variant="outlined"
                        label="Review Title"
                        value={reviewTitle}
                        onChange={handleReviewTitleChange}
                        style={{ marginBottom: '16px' }}
                    />
                    <TextField
                        fullWidth
                        multiline
                        rows={4}
                        variant="outlined"
                        label="Write your review"
                        value={reviewText}
                        onChange={handleReviewChange}
                    />
                    <div style={{ marginTop: '1em', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <div>
                            <Rating
                                precision={0.1}
                                name="simple-controlled"
                                value={rating}
                                onChange={(event, newValue) => setRating(newValue)}
                            />
                            <ImageUpload
                                imagePreviews={tempImages}
                                handleImageChange={handleImageChange}
                                handleRemoveImage={handleRemoveImage}
                                reviewUpload={true}
                            />
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={handlePostReview}
                            >
                                Post Review
                            </Button>
                            <Button
                                sx={{ '&:hover': { backgroundColor: 'red' }, marginLeft: '1em', alignItems: 'flex-end' }}
                                variant="contained"
                                color="primary"
                                onClick={() => setShowReviewField(false)}
                            >
                                Cancel Review
                            </Button>
                        </div>
                    </div>
                    {images.length > 0 && (
                        <ImageDisplay images={images} />
                    )}
                </Paper>
            )}

            {reviews && reviews?.length > 0 ? (
                <List>
                    {reviews.map(({ _id: id, title, content, images, rating, avatar, username, createdAt }) => (
                        <ListItem key={id}>
                            <Paper elevation={4} style={{ padding: '16px', width: '100%', display: 'flex', alignItems: 'center' }}>
                                {username && (
                                    <Box sx={{ marginRight: '2em' }} display="flex" flexDirection="column" alignItems="center">
                                        <Avatar
                                            src={avatar || "/static/images/avatar/2.jpg"}
                                            alt={username}
                                            style={{ width: '50px', height: '50px', marginBottom: '8px' }}
                                        />
                                        <Typography variant="body1">{username}</Typography>
                                    </Box>
                                )}
                                <div>
                                    <Typography variant="h6">{title}</Typography>
                                    {createdAt && <Typography variant="subtitle1">{formatDate(createdAt)}</Typography>}
                                    <Rating precision={0.1} name="read-only" value={rating} readOnly style={{ marginTop: '8px' }} />
                                    <Typography variant="body1">{content}</Typography>
                                    {images && images?.length > 0 && (
                                        <ImageDisplay images={images} />
                                    )}
                                </div>
                            </Paper>
                        </ListItem>
                    ))}
                </List>
            ) : (
                <Typography variant="h6">No reviews yet</Typography>
            )}
        </Container>
        </>
    );
};

export default Review;
