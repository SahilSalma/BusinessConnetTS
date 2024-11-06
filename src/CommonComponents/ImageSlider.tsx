import React, { useEffect } from 'react';
import { Box } from '@mui/material';
import { keyframes } from '@emotion/react';
import { useTheme } from '@mui/material/styles';

// const images: Image[] = [
//   {
//     imgPath: HerokuImage,
//   },
//   {
//     imgPath: HerokuImage2,
//   },
//   {
//     imgPath: HerokuImage3,
//   }
// ];

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const Arrows: React.FC<{ prev: () => void; next: () => void }> = ({ prev, next }) => {
  const boxStyle = { 
    cursor: 'pointer', margin: 1, opacity: 0.4, fontSize: 40, zIndex: 1,
    '&:hover': {
      opacity: 1,
    },
    color: 'primary.contrastText',
  }
  return (
  <Box sx={{ position: 'absolute', top: '50%', width: '100%', display: 'flex', justifyContent: 'space-between', transform: 'translateY(-50%)' }}>
    <Box onClick={prev} sx={boxStyle}>
      &#10094;
    </Box>
    <Box onClick={next} sx={boxStyle}>
      &#10095;
    </Box>
  </Box>
)};

const Dots: React.FC<{ images: string[], activeIndex: number; onClick: (index: number) => void }> = ({ images, activeIndex, onClick }) => {
  const theme = useTheme();
  return (
  <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2, position: 'absolute', bottom: 10, width: '100%' }}>
    {images.map((_, i) => (
      <Box
        key={i}
        onClick={() => onClick(i)}
        sx={{
          width: 12,
          height: 12,
          borderRadius: '50%',
          backgroundColor: activeIndex === i ? theme.palette.background.default : theme.palette.secondary.main,
          mx: 0.5,
          cursor: 'pointer',
        }}
      />
    ))}
  </Box>
)};

const SliderContent: React.FC<{ images: string[], activeIndex: number }> = ({ images, activeIndex }) => (
<Box sx={{ position: 'relative', overflow: 'hidden', height: '100%' }}>
  {images.map((slide, i) => (
    <Box
      key={i}
      sx={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        opacity: activeIndex === i ? 1 : 0,
        transition: 'opacity 0.5s ease',
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          // backgroundImage: `url(${slide})`,
          // backgroundSize: 'cover',
          // backgroundPosition: 'center',
          // zIndex: 0,
          // '&::backdrop': {
          //   backdropFilter: 'blur(100px)',
          // },
          background: `url(${slide}) no-repeat center center`,
          filter: 'blur(0.6em)',
          zIndex: 0,
        }}
      />
      <img
        alt=''
        src={slide}
        style={{
          zIndex: 1, // Bring the image above the blurred background
          width: '100%',
          height: '100%',
          objectFit: 'contain',
          display: 'block',
          filter: 'drop-shadow(0 0 10px rgba(0,0,0,0))',
        }}
      />
    </Box>
  ))}
</Box>

);

const Slider: React.FC<{ images: string[] }> = ({ images }) => {
  const [activeIndex, setActiveIndex] = React.useState<number>(0);

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setActiveIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
  //   }, 5000);
  //   return () => clearInterval(interval);
  // }, []);

  return (
    <Box sx={{ width: '100%', height: 350, overflow: 'hidden', position: 'relative' }}>
      <SliderContent images={images} activeIndex={activeIndex} />

      {images.length > 1 && <>
      <Arrows
      prev={() => setActiveIndex(activeIndex < 1 ? images.length - 1 : activeIndex - 1)}
      next={() => setActiveIndex(activeIndex === images.length - 1 ? 0 : activeIndex + 1)}
      />
      <Dots images={images} activeIndex={activeIndex} onClick={(index) => setActiveIndex(index)} />
      </>}
    </Box>
  );
};

export default Slider;
