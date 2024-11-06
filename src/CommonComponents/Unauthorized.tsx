import React from 'react';
import { Container, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import Animation from './Animation';
import { Animations } from '../Types/allTypes';

const Unauthorized: React.FC = () => {
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
            <Animation size={{width: 200, height: 200}} animationData={Animations.UNAUTHORIZED} /> 
            <Typography variant="h4" color="error">
                Unauthorized Access
            </Typography>
            <Typography variant="body1" style={{ margin: '20px 0' }}>
                You do not have permission to view this page.
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

export default Unauthorized;