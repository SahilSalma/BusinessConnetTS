import React, { MouseEventHandler, useState } from 'react';
import { Button, ButtonGroup, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, useMediaQuery } from '@mui/material';
import { MessageOutlined, Share, ThumbUp } from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { t } from 'i18next';
import { useAuth } from '../Context/authContext';

interface PostReactProps {
  isLiked: boolean;
  handleLike: () => void;
  handleComments: () => void;
}

const PostReact: React.FC<PostReactProps> = ({ isLiked, handleLike, handleComments }) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.up('sm'));
  const { isAuthenticated } = useAuth();
  const [isExpanded, setIsExpanded] = useState(false);
  const nav = useNavigate();
  const isLikedButtonSX = {
      fontSize: 12,
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.primary.contrastText
    }
  const getButton = (isLiked: boolean, text: string, icon: JSX.Element, onClick: MouseEventHandler) => (
    <Button 
      variant='text'
      sx={isLiked ? isLikedButtonSX : {fontSize: 12}}
      onClick={onClick}
    >
      {icon}
      { isSmallScreen ? text : ''}
      {/* { theme.breakpoints.up('sm') > 600 ? text : ''} */}
    </Button>
  );

  const onLikeClick = () => {
    if (isAuthenticated) {
      handleLike();
    } else {
      setIsExpanded(true);
    }
  };

  const buildRegisterDialog = () => {
    return (
        <Dialog open={isExpanded} onClose={() => setIsExpanded(false)}>
            <DialogTitle color='error' sx={{ display: 'flex', alignItems: 'center' }}>
                {t('noAccountDialogTitle')}
            </DialogTitle>
            <DialogContent sx={(theme) => ({
                [theme.breakpoints.up('lg')]: {
                    width: 550,
                }
            })}>
                <DialogContentText>
                    {t('noAccountLikeDialogDescription')}
                </DialogContentText>
            </DialogContent>
            <DialogActions sx={{display: 'flex', justifyContent: 'space-between'}}>
                <Button onClick={() => setIsExpanded(false)} >{t('close') }</Button>
                <Button onClick={() => nav('/login')} >{t('noAccountDialogButton') }</Button>
            </DialogActions>
        </Dialog>
    );
  };

  return (
    <>
      {buildRegisterDialog()}
      <ButtonGroup variant='contained' color='secondary' fullWidth sx={{
        display: 'flex',
        justifyContent: 'space-between',
        height: 50,
      }}>
        {getButton(isLiked, 'Like', <ThumbUp sx={{mr:1, fontSize: 17}} />, onLikeClick)}
        {getButton(false, 'Comment', <MessageOutlined sx={{mr:1, fontSize: 17}} />, handleComments)}
        {getButton(false, 'Share', <Share sx={{mr:1, fontSize: 17}} />, handleLike)}
      </ButtonGroup>
    </>
  );

};

export default PostReact;