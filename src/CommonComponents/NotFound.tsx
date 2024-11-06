// src/components/NotFound.tsx
import React from 'react';
import { Container, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { Animations } from '../Types/allTypes';
import Animation from './Animation';

const NotFound: React.FC = () => {
    return (
        <Container
            maxWidth="sm"
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100vh',
                textAlign: 'center',
            }}
        >
            <Animation size={{width: 200, height: 200}} animationData={Animations.NOT_FOUND} />
            <Typography variant="h4" color="error">
                404 - Page Not Found
            </Typography>
            <Typography variant="body1" style={{ margin: '20px 0' }}>
                Sorry, the page you are looking for does not exist.
            </Typography>
            <Button
                variant="contained"
                component={Link}
                to="/"
                color="primary"
            >
                Go Back to Home
            </Button>
        </Container>
    );
};

export default NotFound;
