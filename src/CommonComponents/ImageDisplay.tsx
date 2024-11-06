import React, { useState } from 'react';
import { Box, Grid, Modal, IconButton } from '@mui/material';
import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material';
import { ImageDisplayProps } from '../Types/allTypes';

const ImageDisplay: React.FC<ImageDisplayProps> = ({ images }) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const handleOpen = (index: number) => {
    setCurrentIndex(index);
    setSelectedImage(images[index]);
  };

  const handleClose = () => {
    setSelectedImage(null);
  };

  const handlePrev = () => {
    const newIndex = (currentIndex - 1 + images.length) % images.length;
    setCurrentIndex(newIndex);
    setSelectedImage(images[newIndex]);
  };

  const handleNext = () => {
    const newIndex = (currentIndex + 1) % images.length;
    setCurrentIndex(newIndex);
    setSelectedImage(images[newIndex]);
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      <Grid container spacing={1} sx={{ maxWidth: '100%', overflowX: 'auto', padding: '8px' }}>
        {images.map((imagePreviewUrl, index) => (
          <Grid item key={index}>
            <Box
              sx={{
                width: 120,
                height: 90,
                border: '2px solid #ccc',
                borderRadius: '4px',
                overflow: 'hidden',
                cursor: 'pointer',
                backgroundColor: '#f0f0f0',
                '&:hover': {
                  borderColor: '#007bff',
                },
              }}
              onClick={() => handleOpen(index)}
            >
              <img
                src={imagePreviewUrl}
                alt={`Thumbnail ${index}`}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                }}
              />
            </Box>
          </Grid>
        ))}
      </Grid>
      <Modal open={Boolean(selectedImage)} onClose={handleClose}>
        <Box
          position="relative"
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="100vh"
          bgcolor="rgba(0, 0, 0, 0.8)"
          onClick={handleClose}
        >
          <img
            src={selectedImage!}
            alt="Full view"
            style={{ maxHeight: '90%', maxWidth: '90%' }}
          />
          <IconButton
            onClick={(e) => {
              e.stopPropagation();
              handlePrev();
            }}
            style={{ position: 'absolute', left: '10px', color: 'white', zIndex: 1 }}
          >
            <ArrowBackIos />
          </IconButton>
          <IconButton
            onClick={(e) => {
              e.stopPropagation();
              handleNext();
            }}
            style={{ position: 'absolute', right: '10px', color: 'white', zIndex: 1 }}
          >
            <ArrowForwardIos />
          </IconButton>
        </Box>
      </Modal>
    </Box>
  );
};

export default ImageDisplay;
