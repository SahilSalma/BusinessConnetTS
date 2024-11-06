import React, { useState } from 'react';
import {
  IconButton,
  Popover,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Box,
  Typography,
  Tooltip,
} from '@mui/material';
import ChatIcon from '@mui/icons-material/Chat';
import Chat from '../Components/Chat';

interface Message {
  id: number;
  avatar: string;
  senderName: string;
  lastMessage: string;
  isUnread?: boolean;
}

const messagesData: Message[] = [
  { id: 1, avatar: 'https://via.placeholder.com/40', senderName: "Jon Doe", lastMessage: 'Hello, how are you?', isUnread: true },
  { id: 2, avatar: 'https://via.placeholder.com/40', senderName: "K Doe", lastMessage: 'Let’s meet tomorrow!', isUnread: true },
  { id: 3, avatar: 'https://via.placeholder.com/40', senderName: "B Doe", lastMessage: 'Did you get my email? Did you get my email?' },
];

const Messages: React.FC = () => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [chatBoxOpen, setChatBoxOpen] = useState(false);
    const [sender, setSender] = useState('');

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);

    const handleOnMessageClick = (message: Message) => {
        console.log(`Message ${message.id} clicked`);
        setSender(message.senderName)
        setChatBoxOpen(false);
        setTimeout(() => {
            setChatBoxOpen(true);
        }, 400);
        handleClose();
    };

    return (
        <>
        <Chat
            senderName={sender} 
            drawerOpen={chatBoxOpen} 
            setDrawerOpen={setChatBoxOpen} 
        />
        <IconButton sx={{color: 'white', mr: 3}} onClick={handleClick}>
            <ChatIcon />
        </IconButton>
        <Popover
            anchorEl={anchorEl}
            open={open}
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
            <List>
            {messagesData.map((message) => (
                <ListItem
                key={message.id}
                onClick={handleOnMessageClick.bind(null, message)}
                sx={{
                    '&:hover': {
                    backgroundColor: 'rgba(0, 0, 0, 0.1)',
                    },
                    cursor: 'pointer',
                    height: 60,
                    width: 350,
                    overflow: 'hidden',
                }}
                >
                <ListItemAvatar>
                    <Avatar alt="User Avatar" src={message.avatar} />
                </ListItemAvatar>
                <Box sx={{ flexGrow: 1 }} >
                    <ListItemText 
                        primary={<Typography fontWeight={message.isUnread ? 'bold' : ''} fontSize={18} noWrap sx={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{message.senderName}</Typography>} 
                    />
                    <Tooltip title={message.lastMessage}>
                        <ListItemText primary={<Typography fontSize={16} noWrap sx={{ maxWidth: 280 ,overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{message.lastMessage}</Typography>} />
                    </Tooltip>
                </Box>
                </ListItem>
            ))}
            </List>
        </Popover>
        </>
    );
};

export default Messages;
