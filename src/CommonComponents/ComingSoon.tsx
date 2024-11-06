import React, { useState } from 'react';
import { TextField, Button, Typography, Box, Paper, Grid2 as Grid, Snackbar, Alert } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { AccessAlarm, PeopleAlt, Settings, ThumbUp, Handshake, BarChart } from '@mui/icons-material';
import { keyframes } from '@emotion/react';
import HeroImage from '../Assets/HerokuImage3.jpg';
import { emailSignUp } from '../Utils/BackendAPICalls';

// Animations
const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const ComingSoonPage = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);

  const theme = useTheme();
  const isDarkMode = theme.palette.mode === 'dark';

  const validateEmail=  (email: string) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  }

  const submitBackend = async () => {
    const response = await emailSignUp(email);

    if (response) {
      setIsAlertOpen(true);
      setTimeout(() =>
        setIsAlertOpen(false), 5000);
      setEmail('');
    }

  }

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };


  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const isValid = validateEmail(email);

    if (!isValid) {
      alert('Please enter a valid email address');
      return;
    }

    submitBackend();
  };

  return (
    <>
    <Snackbar open={isAlertOpen} message="Submitting...">
      <Alert severity="info">Thank you for signing up! We will send you an update as soon as we are live</Alert>
    </Snackbar>
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', justifyContent: 'center', alignItems: 'center', backgroundColor: theme.palette.background.default }}>
      <Box sx={{ width: '100%', height: '100vh', background: `url(${HeroImage}) no-repeat center center`, backgroundSize: 'cover', position: 'relative' }}>
        <Box sx={{
          position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center',
        }}>
          <Paper
            sx={{
              maxWidth: '900px',
              width: '100%',
              padding: 4,
              borderRadius: 3,
              textAlign: 'center',
              boxShadow: 3,
              backgroundColor: theme.palette.background.paper,
              animation: `${fadeIn} 1s ease-in-out`,
            }}
          >
            <Typography variant="h3" color="primary" gutterBottom>
              We're Launching Soon!
            </Typography>
            <Typography variant="h5" color="text.secondary" paragraph>
              Our exciting new SaaS application is coming soon. Stay in the loop by signing up with your email below.
            </Typography>

            {/* Email Signup Form */}
            <form onSubmit={handleSubmit}>
              <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 2 }}>
                <TextField
                  label="Enter your email"
                  variant="outlined"
                  fullWidth
                  value={email}
                  onChange={handleEmailChange}
                  sx={{
                    backgroundColor: isDarkMode ? '#333' : '#fff',
                    borderRadius: '4px',
                    transition: 'all 0.3s',
                    '&:hover': { backgroundColor: isDarkMode ? '#444' : '#f7f7f7' },
                  }}
                />
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  disabled={isSubmitting}
                  sx={{
                    height: '100%',
                    paddingX: 4,
                    borderRadius: '4px',
                    transition: 'all 0.3s',
                    '&:hover': { backgroundColor: theme.palette.primary.dark },
                  }}
                >
                  {isSubmitting ? 'Submitting...' : 'Notify Me'}
                </Button>
              </Box>
            </form>
            <Box sx={{ marginTop: 4 }}>
              <Typography variant="body2" color="text.secondary">
                We respect your privacy. No spam, just updates.
              </Typography>
            </Box>
          </Paper>
        </Box>
      </Box>

      {/* Feature List Section */}
      <Box sx={{ padding: 4, backgroundColor: theme.palette.background.default, width: '100%' }}>
        <Typography variant="h4" color="primary" gutterBottom align="center">
          Features of Our Revolutionary Platform
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          {[
            { icon: <AccessAlarm fontSize="large" />, title: 'AI-Generated Leads', description: 'Leverage artificial intelligence to discover high-quality leads tailored to your business.' },
            { icon: <PeopleAlt fontSize="large" />, title: 'Effortless Networking', description: 'Connect with like-minded businesses, partners, and clients easily.' },
            { icon: <Settings fontSize="large" />, title: 'Customizable Dashboards', description: 'Track leads, interactions, and performance with a personalized dashboard.' },
            { icon: <ThumbUp fontSize="large" />, title: 'Reviews & Ratings', description: 'Build trust and credibility with reviews and ratings from other businesses.' },
            { icon: <Handshake fontSize="large" />, title: 'Collaboration Opportunities', description: 'Discover collaboration opportunities to scale your business.' },
            { icon: <BarChart fontSize="large" />, title: 'Growth Analytics', description: 'Monitor growth with performance tracking and detailed analytics.' },
          ].map((feature, index) => (
            <Grid size={{xs: 12, sm: 4}} key={index} sx={{ textAlign: 'center', animation: `${fadeIn} 1.5s ease-in-out` }}>
              <Box sx={{ padding: 2, borderRadius: 2, boxShadow: 2 }}>
                {feature.icon}
                <Typography variant="h6" color="text.primary" sx={{ marginTop: 2 }}>
                  {feature.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ marginTop: 1 }}>
                  {feature.description}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
    </>
  );
};

export default ComingSoonPage;
