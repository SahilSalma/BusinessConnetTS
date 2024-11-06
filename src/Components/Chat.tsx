import React, { useState } from 'react';
import {
  Box,
  Drawer,
  Typography,
  Avatar,
  IconButton,
  Paper,
  Tooltip,
  TextField,
  Container
} from '@mui/material';
import RemoveIcon from '@mui/icons-material/Remove';
import CloseIcon from '@mui/icons-material/Close';
import SendIcon from '@mui/icons-material/Send';
import { useTheme } from '@mui/material/styles';
import EmojiPickerComponent from '../CommonComponents/EmojiPicker';

interface Message {
  text: string;
  time: string;
  sender: boolean;
}

interface MessagingInterfaceProps {
  senderName: string;
  drawerOpen: boolean;
  setDrawerOpen: (open: boolean) => void;
}

const Chat: React.FC<MessagingInterfaceProps> = ({ senderName, drawerOpen, setDrawerOpen}) => {
  const messagesList: Message[] = [
    { text: "Hey, are we still on for today?", time: "Sat 9:00 AM", sender: false },
    { text: "Yes, definitely! What time works for you?", time: "Sat 9:05 AM", sender: true },
    { text: "How about 1 PM?", time: "Sat 9:10 AM", sender: false },
    { text: "I can make it earlier if needed.", time: "Sat 9:12 AM", sender: false },
    { text: "1 PM is perfect for me.", time: "Sat 9:15 AM", sender: false },
    { text: "Where should we meet?", time: "Sat 9:17 AM", sender: false },
    { text: "How about the coffee shop on 5th Avenue?", time: "Sat 9:20 AM", sender: true },
    { text: "Sounds good! Do you have any other suggestions?", time: "Sat 9:22 AM", sender: false },
    { text: "Nope, the coffee shop works for me.", time: "Sat 9:25 AM", sender: false },
    { text: "Great. See you there at 1 PM!", time: "Sat 9:27 AM", sender: true },
    { text: "Looking forward to it. 😊", time: "Sat 9:30 AM", sender: false },
    { text: "Me too! 😄", time: "Sat 9:35 AM", sender: true },
    { text: "Just to confirm, we are still on for 1 PM, right?", time: "Sat 9:40 AM", sender: false },
    { text: "Yes, 1 PM at the coffee shop on 5th Avenue. See you soon!", time: "Sat 9:45 AM", sender: true },
    { text: "Hey! Just checking if you’re still available for our meeting?", time: "Sat 9:50 AM", sender: false },
    { text: "Yes, I’m still available! Can’t wait.", time: "Sat 9:55 AM", sender: true },
    { text: "I’m getting a bit anxious though. Do you have any ideas for what we can discuss?", time: "Sat 10:00 AM", sender: false },
    // { text: "We can discuss our project and also catch up on some personal stuff.", time: "Sat 10:05 AM", sender: true },
  ];

  const [minimized, setMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>(messagesList);
  const [newMessage, setNewMessage] = useState<string>('');
  const theme = useTheme();

  const handleCloseDrawer = () => setDrawerOpen(false);
  const handleMinimizeDrawer = () => setMinimized(!minimized);
  const handleSendMessage = () => {
    if (newMessage.trim()) {
      setMessages([...messages, { text: newMessage, time: new Date().toLocaleTimeString(), sender: true }]);
      setNewMessage('');
    }
  };

  return (
    <Drawer
      open={drawerOpen}
      onClose={handleCloseDrawer}
      variant="persistent"
      PaperProps={{
        sx: {
          height: minimized ? '4em' : '32em',
          width: minimized ? '22em' : '22em',
          borderRadius: '1em 1em 0 0',
          boxShadow: 3,
          transition: 'height 0.3s ease-in-out, width 0.3s ease-in-out',
        },
      }}
    >
      <Box display="flex" flexDirection="column" height="100%">
        <Paper elevation={1} sx={{ p: 1, backgroundColor: theme.palette.primary.main }}>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Box display="flex" alignItems="center" sx={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>
              <Avatar alt={senderName} src="/static/images/avatar/2.jpg" sx={{ width: 40, height: 40, m: 1 }} />
              <Typography sx={{ color: 'white', marginLeft: 2, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} variant="subtitle1">
                {senderName}
              </Typography>
            </Box>
            <Box zIndex={10} display="flex" alignItems="center">
              <IconButton sx={{color: 'white'}} onClick={handleMinimizeDrawer}>
                <RemoveIcon />
              </IconButton>
              <IconButton sx={{color: 'white'}} onClick={handleCloseDrawer}>
                <CloseIcon />
              </IconButton>
            </Box>
          </Box>
        </Paper>

        <Box sx={{ margin: 1.5, p: 1, overflowY: 'auto', flexGrow: 1 }}>
          {messages.map((msg, index) => {
            const isNextNewSender = messages[index + 1]?.sender !== msg.sender;

            return (
              <Box
                key={index}
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: msg.sender ? 'flex-end' : 'flex-start',
                  mb: 1,
                  overflow: 'hidden',
                }}
              >
                {!msg.sender && (
                  <Box sx={{ display: 'flex', alignItems: 'flex-end', width: '100%' }}>
                    {isNextNewSender && 
                      <Tooltip sx={{zIndex: -1}} title={senderName}>
                        <Avatar sx={{ mr: 1, width: 24, height: 24 }} alt={senderName} src='/static/images/avatar/2.jpg' />
                      </Tooltip>}
                    {!isNextNewSender && <Box sx={{ width: '2em' }} />}
                    <Tooltip title={msg.time} placement="right">
                      <Paper
                        sx={{
                          p: 1.5,
                          maxWidth: '60%',
                          backgroundColor: 'secondary.main',
                          borderRadius: 5,
                          whiteSpace: 'wrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          borderBottomLeftRadius: 0,
                        }}
                      >
                        <Typography sx={{
                            color: 'white',
                            whiteSpace: 'wrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                        }} variant="body2">{msg.text}</Typography>
                      </Paper>
                    </Tooltip>
                  </Box>
                )}
                {msg.sender && (
                  <Tooltip title={msg.time} placement="left">
                    <Paper
                      sx={{
                        p: 1.5,
                        maxWidth: '60%',
                        borderRadius: 5,
                        backgroundColor: 'primary.main',
                        boxShadow: 1,
                        alignSelf: 'flex-end',
                        whiteSpace: 'wrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        borderBottomRightRadius: 0,
                      }}
                    >
                      <Typography sx={{
                        color: 'white',
                        whiteSpace: 'wrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                      }} variant="body2">{msg.text}</Typography>
                    </Paper>
                  </Tooltip>
                )}
              </Box>
            );
          })}
        </Box>

        {!minimized && (
          <Box display="flex" alignItems="center" sx={{ p: 1, borderTop: '1px solid lightgray' }}>
            <EmojiPickerComponent content={newMessage} setContent={setNewMessage} />
            <TextField
              fullWidth
              variant="outlined"
              size="small"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Type a message..."
            />
            <IconButton onClick={handleSendMessage} sx={{ ml: 1 }}>
              <SendIcon />
            </IconButton>
          </Box>
        )}
      </Box>
    </Drawer>
  );
};

export default Chat;
