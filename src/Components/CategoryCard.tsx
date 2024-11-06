import React from 'react';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import { CardActionArea, CardContent } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { CategoryCardProps } from '../Types/allTypes';


const CategoryCard: React.FC<CategoryCardProps> = ({ image, name, numBusiness }) => {
  const navigate = useNavigate();
  const theme = useTheme();

  return (
    <Card
      sx={{ maxWidth: 250, borderRadius: 4 }}
      raised
      onClick={() => navigate('/listing', { state: { pageName: name } })}
    >
      <CardActionArea>
        <CardMedia
          sx={{ height: 240 }}
          component="img"
          image={image}
          alt={name}
        />
      </CardActionArea>
      <CardContent sx={{ backgroundColor: theme.palette.background.paper }}>
        <Typography
          sx={{ color: theme.palette.text.primary, fontWeight: 'bold', textAlign: 'center' }}
          gutterBottom
          variant="subtitle2"
          component="div"
        >
          {`${name} (${numBusiness})`}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default CategoryCard;
