import React from 'react';
import { Container, Grid, Typography } from '@mui/material';
import DestinationCard from './DestinationCard';

const DestinationAlbum = ({ title, text, destinations }) => {
    return (
        <Container sx={{ py: 6, mb: 6 }} maxWidth='lg'>
            <Typography
                gutterBottom
                variant='h4'
                sx={{
                    mb: 4,
                    letterSpacing: '.1rem',
                    fontWeight: 'bold',
                }}
            >
                {title}
            </Typography>
            <Typography
                gutterBottom
                variant='body1'
                sx={{
                    mb: 4,
                    letterSpacing: '.1rem',
                }}
            >
                {text}
            </Typography>
            <Grid container spacing={4}>
                {destinations.map((destination) => (
                    <DestinationCard key={destination.City} destination={destination} />
                ))}
            </Grid>
        </Container>
    );
};

export default DestinationAlbum;
