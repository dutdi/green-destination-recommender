import React from 'react';
import { Container, Grid, Typography } from '@mui/material';
import DestinationCard from './DestinationCard';

const DestinationAlbum = ({ destinations }) => {
    return (
        <Container sx={{ py: 6 }} maxWidth='lg'>
            <Typography
                gutterBottom
                variant='h4'
                component='h3'
                sx={{
                    mb: 4,
                    letterSpacing: '.1rem',
                }}
            >
                Popular Destinations
            </Typography>

            <Grid container spacing={4}>
                {destinations.map((destination) => (
                    <DestinationCard key={destination.id} destination={destination} />
                ))}
            </Grid>
        </Container>
    );
};

export default DestinationAlbum;
