import React, { useEffect, useState } from 'react';
import {
  IconButton,
  Popover,
  Typography,
  List,
  ListItemIcon,
  ListItemText,
  ListItemButton,
  styled,
  Box,
  Badge,
} from '@mui/material';
import { Notification as NotificationType, NotificationTypes } from '../Types/allTypes';
import { Business, Chat, Favorite, PersonAdd, PostAdd, Star, Notifications } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { notifications as loadedNotifications, notificationsError as notificationFailure, notificationsLoading } from '../Redux/selectors';
import { useNavigate } from 'react-router-dom';
import { Actions } from '../Redux/Reducer/rootReducer';

const StyledListItemButton = styled(ListItemButton)(({ theme }) => ({
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
  },
}));

const Notification: React.FC = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [unreadNotifications, setUnreadNotifications] = useState<number>(0);
  const nav = useNavigate();
  const dispatch = useDispatch();

  const notifications = useSelector(loadedNotifications);

  useEffect(() => {
    if (notifications) {
      const unreadNotifications = notifications?.filter((notification) => !notification.read);
      setUnreadNotifications(unreadNotifications.length);
    }
  }, [notifications]);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleNotificationClick = (notification: NotificationType) => {
    nav(`/${notification.type}/${notification.typeId}`);
    if (!notification.read) {
      dispatch(Actions.notifications.readNotificationAction.request({ notificationId: notification._id }));
    }
    handleClose();
  };

  const open = Boolean(anchorEl);

  const notificationIcon = (type: NotificationTypes) => {
    switch (type) {
        case NotificationTypes.LIKE:
            return <Favorite />;
        case NotificationTypes.COMMENT:
            return <Chat />;
        case NotificationTypes.REVIEW:
            return <Star />;
        case NotificationTypes.BUSINESS:
            return <Business />;
        case NotificationTypes.POST:
            return <PostAdd />;
        case NotificationTypes.FOLLOW:
            return <PersonAdd />;
        default:
            return <Notifications />;
    }
};


  return (
    <>
        <IconButton sx={{color: 'white', mr:3}} onClick={handleClick}>
          <Badge anchorOrigin={{vertical: 'top', horizontal: 'right'}} badgeContent={unreadNotifications} color="secondary">
            <Notifications />
          </Badge>
        </IconButton>
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        sx={{
            maxHeight: 400,
        }}
      >
        {notifications && notifications?.length > 0 && <List>
          {notifications?.map((notification) => (
            <StyledListItemButton
              key={notification._id}
              sx={{ minHeight: 60, maxWidth: 350 }}
              onClick={() => handleNotificationClick(notification)}
            >
              <ListItemIcon>{notificationIcon(notification.type)}</ListItemIcon>
              <Box sx={{ flexGrow: 1, mr: 3 }} >
                <ListItemText  primary={<Typography fontWeight={!notification.read ? 'bold' : ''} fontSize={18}>{notification.title}</Typography>} />
                <ListItemText primary={<Typography fontSize={16}>{notification.content}</Typography>} />
              </Box>
              {!notification.read && <Badge anchorOrigin={{vertical: 'top', horizontal: 'left'}} variant='dot' color="primary" />}
            </StyledListItemButton>
          ))}
        </List>}
        { notifications && notifications?.length === 0 && <Typography sx={{ p: 2 }}>No notifications</Typography>}
      </Popover>
    </>
  );
};

export default Notification;
