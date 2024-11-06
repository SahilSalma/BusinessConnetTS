import React from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions, Rating } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { BusinessCardProps } from '../Types/allTypes';

const BusinessCard: React.FC<BusinessCardProps> = ({
  id,
  image,
  businessName,
  businessCatagory,
  businessDescription,
  rating = {
    value: 0,
    reviewCount: 0,
  },
  onDashboard = false,
}) => {
  const nav = useNavigate();
  const theme = useTheme();

  const handleClick = () => {
    if (onDashboard) return
    nav(`/business/${id.replace(/\s/g, '')}`, { state: { id } });
  };

  return (
    <Card sx={{ maxWidth: 345, borderRadius: 5, overflow: 'scroll' }} raised onClick={handleClick}>
      <CardActionArea>
        <CardMedia
          sx={{ height: 240, width: 345 }}
          component="img"
          height="140"
          style={{ maxWidth: '100%' }}
          image={image}
          alt={businessName}
        />
        <CardContent sx={{
          minHeight: 250,
          maxHeight: 250,
          justifyContent: 'space-between',
          flexDirection: 'column',
          display: 'flex',
        }}>
          <Typography gutterBottom variant="h5" component="div">
            {businessName}
          </Typography>
          <Typography gutterBottom variant="subtitle1" component="div">
            in {businessCatagory}
          </Typography>
          <Rating precision={0.1} sx={{ mt: 2, my: 3 }} name="rating" defaultValue={rating.value} readOnly />
          <Typography variant="body2" color={theme.palette.text.secondary} component="p">
            {businessDescription}
          </Typography>
        </CardContent>
        {onDashboard && <CardActions sx={{display: 'flex', justifyContent: 'space-between', marginBottom: 3}}>
          <Button variant="contained" onClick={() => nav(`/editBusiness/${id.replace(/\s/g, '')}`, { state: { id } })}>
            Edit Business
          </Button>
          <Button variant="contained" onClick={() => nav(`/business/${id.replace(/\s/g, '')}`, { state: { id } })}>
            Preview
          </Button>
        </CardActions>}
      </CardActionArea>
    </Card>
  );
};

export default BusinessCard;
