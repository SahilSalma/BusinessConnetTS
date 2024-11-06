// src/EmojiPicker.tsx
import React, { useState } from 'react';
import { Button, Popover } from '@mui/material';
import EmojiPicker from 'emoji-picker-react';
import { EmojiEmotions } from '@mui/icons-material';

interface EmojiPickerProps {
  content: string;
  setContent: React.Dispatch<React.SetStateAction<string>>;
}

const EmojiPickerComponent: React.FC<EmojiPickerProps> = ({ content, setContent }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const onEmojiClick = (emojiObject: { emoji: string }, event: MouseEvent) => {
    setContent(content + emojiObject.emoji);
    handleClose();
  };

  const open = Boolean(anchorEl);

  return (
    <>
      <Button
        onClick={handleClick}
      >
        <EmojiEmotions />
      </Button>
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <EmojiPicker previewConfig={{
          showPreview: false
        }} searchDisabled height={300} width={300} onEmojiClick={onEmojiClick} />
      </Popover>
    </>
  );
};

export default EmojiPickerComponent;
