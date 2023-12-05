import React, { useState } from 'react';
import { Box, Grid, Paper, Typography } from '@mui/material';
import { Colors } from '../helpers/Colors.js';

const DestinationListItem = ({ destination, minCo2Value, clickedToDestination, handleClickedToDestination }) => {
    const handleClicked = () => {
        handleClickedToDestination(destination);
    };

    return (
        <Grid item xs={12} md={12} key={destination.id}>
            <Paper
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    m: 2,
                    p: 2,
                    boxShadow: clickedToDestination ? '0px 0px 15px 5px rgba(123, 0, 0, 1)' : '0px 0px 5px 1px rgba(0, 0, 0, 0.1)',
                    transition: 'box-shadow 0.3s ease-in-out',
                    cursor: 'pointer',
                }}
                onClick={() => handleClicked()}
            >
                <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                        <Box
                            component='img'
                            src={require(`../media/misc/${destination.id}.jpg`)}
                            loading='lazy'
                            sx={{
                                width: '100%',
                                height: { xs: '100%', md: '200px' },
                                objectFit: 'cover',
                                borderRadius: '8px',
                            }}
                        ></Box>
                    </Grid>
                    <Grid item xs={12} md={6} sx={{ position: 'relative' }}>
                        <Typography variant='subtitle1' gutterBottom>
                            {destination.name}, {destination.country}
                        </Typography>
                        <Grid container direction='column' justifyContent='flex-end'>
                            <Grid item>
                                <Typography variant='caption' gutterBottom>
                                    {destination.description}
                                </Typography>
                            </Grid>
                            <Grid item sx={{ position: 'relative' }}>
                                <Typography
                                    variant='subtitle2'
                                    gutterBottom
                                    sx={{ position: 'absolute', top: 0, right: 0, color: Colors.green, fontWeight: 'bold' }}
                                >
                                    {minCo2Value} kg CO2
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Paper>
        </Grid>
    );
};

export default DestinationListItem;
