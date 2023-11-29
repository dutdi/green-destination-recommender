import React from 'react';
import { Box, Grid, Typography } from '@mui/material';
import DestinationCard from './DestinationCard';

const DestinationAlbum = ({ title, text, destinations }) => {
    return (
        <Box sx={{ mb: 10, p: 10 }}>
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
                    <DestinationCard key={destination.id} destination={destination} />
                ))}
            </Grid>
        </Box>
    );
};

export default DestinationAlbum;
