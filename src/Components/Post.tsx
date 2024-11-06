import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, Button, CardActions, Link, ButtonGroup, Avatar, Grid2 as Grid, Box, Divider, Slide, TextField, Menu, MenuItem, Dialog, DialogTitle, DialogContent, IconButton, DialogContentText, DialogActions } from '@mui/material';
import { MoreVert, MessageOutlined, ThumbUp } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { Post as PostType} from '../Types/allTypes';
import Slider from '../CommonComponents/ImageSlider';
import { t } from 'i18next';
import { useAuth } from '../Context/authContext';
import { useDispatch } from 'react-redux';
import { Actions } from '../Redux/Reducer/rootReducer';
import PostComments from './PostComments';
import PostReact from './PostReact';
import { formatDate } from '../Utils/Utils';
import { deleteMultipleImages } from '../Utils/CloudCalls';

const Post: React.FC<PostType> = ({ _id, avatar, businessName, businessId, content, likes, userId, comments, createdAt, media }) => {
  const { user } = useAuth();
  const [showFullContent, setShowFullContent] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [report, setReport] = useState(false);
  const [isLiked, setIsLiked] = useState(likes?.includes(user?._id ?? '') || false);
  const dispatch = useDispatch();
  const nav = useNavigate();

  useEffect(() => {
    setIsLiked(likes?.includes(user?._id ?? '') || false);
  }, [likes]);

  const handleLike = () => {
    if (!isLiked)
      dispatch(Actions.posts.likePostActions.request({ postId: _id, userId: user?._id  || '' }));
    else
      dispatch(Actions.posts.unlikePostActions.request({ postId: _id, userId: user?._id || '' }));
  };

  const handleComments = () => {
    setShowComments(true);
  };

  const handleTitleClick = () => {
    nav(`/business/${businessId.replace(/\s/g, '')}`, { state: { id: businessId } })
  };

  const handlePostOptions = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleReportClick = () => {
    setReport(true);
    setAnchorEl(null);
  };

  const handleDeletePost = () => {
    if (media && media.length > 0) {
      const deletedImages: string[] = [];
      media.forEach((image) => {
        const index = image.indexOf('/', image.indexOf('://') + 3) + 1;
        const imageName = image.slice(index);
        deletedImages.push(imageName);
      });
      deleteMultipleImages(deletedImages);
    }
    dispatch(Actions.posts.deletePostActions.request({ businessId, postId: _id }));
    setAnchorEl(null);
  };

  const isMyPost = user?._id === userId;

  return (
    <>
    <Dialog open={report} onClose={() => setReport(false)}>
      <DialogTitle>
        <Typography variant="h6" component="h2" sx={{ fontWeight: 'bold'}}>
          {t('reportPost')}
        </Typography>
      </DialogTitle>
      <DialogContent>
        <TextField
          placeholder={t('reportPlaceholder')}
          variant="outlined"
          fullWidth
          margin="normal"
          color='secondary'
          multiline
          sx={{
              '& .MuiInputBase-input': {
                  minHeight: 300,
              }
          }}
        />
        <Button variant="contained" color="error" fullWidth>
          {t('reportButton')}
        </Button>
      </DialogContent>
    </Dialog>
    <Card variant="outlined" style={{ marginBottom: 5 }}>
      <CardContent>
        <Grid container alignItems={'center'} sx={{
          cursor: 'pointer',
          '&:hover': {
            opacity: 0.8,
          },
        }}>
          <Grid size={{xs: 3,lg: 1.5}} onClick={handleTitleClick}>
            <Avatar sx={{ bgcolor: 'primary.main', color: 'primary.contrastText', mr: 2 }} src={avatar} />
          </Grid>
          <Grid size={{xs: 8, lg: 9.5}} onClick={handleTitleClick}>
              <Typography variant="h6" component="h2" sx={{ fontWeight: 'bold'}}>
                {businessName}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {formatDate(createdAt)}
              </Typography>
          </Grid> 
          <Grid size={{xs: 1, lg: 0.5}}>
            <IconButton onClick={handlePostOptions}> <MoreVert sx={{fontSize: 20}} /></IconButton>
            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              {!isMyPost && <MenuItem onClick={handleReportClick}>{t('reportPost')}</MenuItem>}
              {isMyPost && <MenuItem onClick={handleDeletePost}>{t('delete')}</MenuItem>}
            </Menu>
          </Grid>
        </Grid>
        <Divider sx={{my:2}} />
        <Grid container sx={{ display: 'flex', justifyContent: 'center' }}>
          <Grid size={{xs: 12}}>
            <Typography variant="body2" color="text.secondary">
              {content?.length > 300 && !showFullContent? (
              <>
                {content.slice(0, 300)}...
                <Link
                component="button"
                variant="body2"
                onClick={() => setShowFullContent(true)}
                sx={{ ml: 1 }}
                >
                more
                </Link>
              </>
              ) : (
                <>
                {content}
                {content?.length > 300 && <Link
                  component="button"
                  variant="body2"
                  onClick={() => setShowFullContent(false)}
                  sx={{ ml: 1 }}
                  >
                  less
                  </Link>}
                </>
              )}
            </Typography>
            <br/>
          </Grid>
          <Grid size={{xs: 12, lg: 8}} sx={{ display: 'flex', justifyContent: 'center' }}>
            {media && media?.length > 0 && 
                <Slider images={media} />}
          </Grid>
        </Grid>
      </CardContent>
      <CardActions sx={{mx: 1, justifyContent:'space-between'}}>
        <Link fontSize={'small'} sx={{
          cursor: 'pointer',
          textDecoration: 'none',
          alignItems: 'center',
          display: 'flex',
        }}>{likes?.length} <ThumbUp sx={{ml: 0.5, fontSize: 15}}/></Link>
        <Link fontSize={'small'} onClick={handleComments} sx={{
          cursor: 'pointer',
          textDecoration: 'none',
          alignItems: 'center',
          display: 'flex',
        }}>{comments?.length} <MessageOutlined sx={{ml: 0.5, fontSize: 15}}/></Link>
      </CardActions>
      <PostReact isLiked={isLiked} handleLike={handleLike} handleComments={handleComments} />
      <Divider sx={{m: 0.5}}/>
      {(
        showComments && <Slide timeout={500} direction='down'>
            <PostComments postId={_id} comments={comments} />
        </Slide>
      )}
    </Card>
    </>
  );
};

export default Post;
