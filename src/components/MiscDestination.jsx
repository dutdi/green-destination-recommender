import React, { useState } from 'react';
import { Box, Grid, Tabs, Tab, Typography } from '@mui/material';
import DrivingTable from './DrivingTable.jsx';
import FlightTable from './FlightTable.jsx';
import { formatPopulation, calculateDistance } from '../helpers/Functions.js';

const MiscDestination = ({ fromDestination, toDestination }) => {
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const destinationDetails = fromDestination && toDestination && (
        <Box>
            <Typography
                gutterBottom
                variant='body2'
                sx={{
                    textAlign: { xs: 'left', md: 'right' },
                    fontWeight: 'bold',
                }}
            >
                {toDestination.popularity.review_count.toLocaleString('en-US')} reviews
            </Typography>
            <Typography
                gutterBottom
                variant='body2'
                sx={{
                    textAlign: { xs: 'left', md: 'right' },
                    fontWeight: 'bold',
                }}
            >
                Trend: {toDestination.popularity.avg_trend_val.toLocaleString('en-US')}
            </Typography>
            <Typography
                gutterBottom
                variant='body2'
                sx={{
                    textAlign: { xs: 'left', md: 'right' },
                    fontWeight: 'bold',
                }}
            >
                Population: {formatPopulation(toDestination.population)}
            </Typography>
            <Typography
                gutterBottom
                variant='body2'
                sx={{
                    textAlign: { xs: 'left', md: 'right' },
                    fontWeight: 'bold',
                }}
            >
                AQI: {parseInt(toDestination.aqi.aqi_val).toFixed(1)}
            </Typography>
            <Typography
                gutterBottom
                variant='body2'
                sx={{
                    textAlign: { xs: 'left', md: 'right' },
                    fontWeight: 'bold',
                }}
            >
                Distance: {calculateDistance(fromDestination, toDestination)} km
            </Typography>
        </Box>
    );

    return (
        fromDestination &&
        toDestination && (
            <Box sx={{ p: 5 }}>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={10}>
                        <Typography
                            gutterBottom
                            variant='h5'
                            sx={{
                                mt: 2,
                                mb: 2,
                                letterSpacing: '.2rem',
                                fontWeight: 'bold',
                            }}
                        >
                            {toDestination.name}, {toDestination.country}
                        </Typography>
                        <Typography
                            gutterBottom
                            variant='body1'
                            sx={{
                                letterSpacing: '.1rem',
                                fontWeight: 'bold',
                            }}
                        >
                            This is a description for a city. I will add one description for each city later.
                        </Typography>
                    </Grid>
                    <Grid item xs={12} md={2}>
                        {destinationDetails}
                    </Grid>
                    <Grid item xs={12} md={5} sx={{ mt: 3 }}>
                        <Box
                            component='img'
                            src={require(`../media/misc/${toDestination.id}.jpg`)}
                            loading='lazy'
                            sx={{
                                width: { xs: '100%', md: '500px' },
                                height: { xs: '100%', md: '500px' },
                                objectFit: 'cover',
                                borderRadius: '8px',
                            }}
                        ></Box>
                    </Grid>
                    <Grid item xs={12} md={7}>
                        <Box sx={{ borderColor: 'divider' }}>
                            <Tabs value={value} onChange={handleChange} aria-label='tabs'>
                                <Tab label='Flight ✈️' />
                                <Tab label='Driving 🚗' />
                            </Tabs>
                            {value === 0 ? (
                                <FlightTable
                                    connections={fromDestination.connections_flight.filter((c) => c.to_id === toDestination.id)}
                                ></FlightTable>
                            ) : (
                                <DrivingTable
                                    connections={fromDestination.connections_driving.filter((c) => c.to_id === toDestination.id)}
                                ></DrivingTable>
                            )}
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        )
    );
};

export default MiscDestination;
