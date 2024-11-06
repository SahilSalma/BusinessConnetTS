import React, { useEffect } from 'react';
import { Typography, Card, CardContent, Grid2 as Grid, Container, Button } from '@mui/material';
import BusinessCard from '../Components/BusinessCard';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { businesses, businessesLoading } from '../Redux/selectors';
import { Actions } from '../Redux/Reducer/rootReducer';
import { useAuth } from '../Context/authContext';
import LoadingOverlay from '../CommonComponents/LoadingOverlay';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const businessDataList = useSelector(businesses);
  const isLoading = useSelector(businessesLoading);
  const dispatch = useDispatch();

  useEffect(() => {
    user?._id && dispatch(Actions.business.fetch.businessActions.request({ userListing: user?.email }));
  }, []);

  const displayBusinesses = () => {
    return <>
      <LoadingOverlay isLoading={isLoading} />
      <Typography variant="h4" gutterBottom>
        Your Listed Businesses
      </Typography>
      <Grid container spacing={2}>
        {businessDataList?.map((business) => (
          <Grid size={{ xs: 12, sm: 6, md: 4 }} key={business._id}>
            <>
              <BusinessCard
                id={String(business._id)}
                businessName={business.name}
                businessDescription={business.description}
                image={business.photoUrls[0]}
                businessCatagory={business.category.name}
                rating={business.ratings}
                onDashboard={true}
              />
            </>
          </Grid>
        ))}
      </Grid>
    </>
  };

  const buildAnalytics = () => {
    return (
      <Card>
        <CardContent>
          <Typography variant="h5" component="h2">
            Analytics
          </Typography>
        </CardContent>
      </Card>
    );
  };

  return (
    <Container maxWidth={'lg'}>
      {displayBusinesses()}
      {buildAnalytics()}
    </Container>
  );
};

export default Dashboard;
