import React, { useState } from 'react';
import { Card, CardContent, Typography, Button, Avatar, Grid2 as Grid, Divider, TextField, Menu, MenuItem, IconButton } from '@mui/material';
import { MoreVert } from '@mui/icons-material';
import { Comment, NotificationTypes } from '../Types/allTypes';
import { t } from 'i18next';
import { useAuth } from '../Context/authContext';
import { useDispatch } from 'react-redux';
import { Actions } from '../Redux/Reducer/rootReducer';
import { formatDate } from '../Utils/Utils';

interface PostCommentsProps {
    postId: string;
    comments: Comment[];
  }
  
  const PostComments: React.FC<PostCommentsProps> = ({ postId, comments }) => {
    const dispatch = useDispatch();
    const { user, isAuthenticated } = useAuth();
    const [content, setContent] = useState<string>('');
  
    const handleAddComment = () => {
      dispatch(Actions.posts.commentPostActions.request({ 
        postId, 
        content, 
        userId: user?._id || ''
      }));
      dispatch(Actions.notifications.sendNotificationAction.request({ 
        notification: {
          _id: '',
          userId: user?._id || '',
          title: "New Comment",
          content: `${user?.firstName} commented on your post`,
          type: NotificationTypes.COMMENT,
          read: false,
          createdAt: new Date().toISOString(),
          typeId: postId,
          updatedAt: new Date().toISOString(),
        }
      }));
      setContent('');
    };  
  
    const handleClose = () => {
      setAnchorEl(null);
    };
  
    const handleDeleteComment = (commentId: string) => {
      dispatch(Actions.posts.commentDeleteActions.request({ postId, commentId }));
      setAnchorEl(null);
    };
  
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  
    return (
      <Card variant="outlined" style={{ marginBottom: 5, maxHeight: 300, overflow: 'scroll' }}>
        <CardContent>
          {isAuthenticated && <><Grid container sx={{ display: 'flex', justifyContent: 'space-evenly', alignItems: 'center' }}>
            <Grid size={{xs: 2, lg: 1}}>
              <Avatar sx={{ bgcolor: 'primary.main', color: 'primary.contrastText' }} src={'https://picsum.photos/200'} />
            </Grid>
              <Grid size={{xs: 7.5, lg: 8.5}}>
              <TextField
                id="outlined-basic"
                label={t('commentLabel')}
                value={content}
                variant="outlined"
                onChange={(e) => setContent(e.target.value)}
                sx={{
                overflow: 'wrap',
                '& .MuiInputBase-root': {
                  height: 'auto',
                },
                }}
                multiline
                fullWidth
              />
              </Grid> 
  
              <Grid  size={{xs: 2}} sx={{ my: 1 }}>
                <Button onClick={handleAddComment} variant="contained" color="primary" fullWidth>
                  {t('comment')}
                </Button>
              </Grid>
          </Grid>
          <Divider sx={{my: 2}}/></>}
          {comments?.length > 0 && comments.map((comment: Comment, index: number) => (
            <>
            <Grid container sx={{display: 'flex', alignItems: 'center', ml: 4}}>
              <Grid size={{xs: 1.5, lg: 0.5}}>
                <Avatar
                 sx={{ width: 24, height: 24, bgcolor: 'primary.main', color: 'primary.contrastText'}}
                 src={comment.avatar} />
              </Grid>
              <Grid size={{xs: 9.5, lg: 10.5}}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 'bold'}}>
                    {comment.name}
                  </Typography>
                  <Typography variant="subtitle2" fontSize={11} color="text.secondary">
                    {formatDate(comment.createdAt)}
                  </Typography>
              </Grid> 
              <Grid size={{xs: 0.5, lg: 0.5}}>
                {comment.userId === user?._id && <IconButton
                  onClick={(e) => {
                    setAnchorEl(e.currentTarget);
                  }}
                > <MoreVert sx={{fontSize: 20}} /></IconButton>}
                <Menu
                  id="simple-menu"
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  <MenuItem onClick={() => handleDeleteComment(comment._id)}>{t('delete')}</MenuItem>
                </Menu>
              </Grid>
            </Grid>
            <Grid container sx={{ml: 4}}>
              <Grid size={{xs: 1.5, lg: 0.5}}></Grid>
              <Grid size={{xs: 10.5, lg: 11.5}}>
                  <Typography variant="body1">
                    {comment.content}
                  </Typography>
              </Grid> 
            </Grid>
            <Divider sx={{my: 1}} />
            </>
          ))}
          {comments?.length === 0 && <Typography variant="subtitle1" color="text.secondary">No comments yet</Typography>}
        </CardContent>
      </Card>
    );
  };

  export default PostComments;