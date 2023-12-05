import React, { useState } from 'react';
import { Box, Grid, Tabs, Tab, Typography } from '@mui/material';
import DrivingTable from './DrivingTable.jsx';
import FlightTable from './FlightTable.jsx';
import { formatPopulation, calculateDistance } from '../helpers/Functions.js';
import { Colors } from '../helpers/Colors.js';

const MiscDestination = ({ fromDestination, toDestination, transports }) => {
    const [value, setValue] = useState(transports.includes('Flight ✈️') ? 0 : transports.includes('Driving 🚗') ? 1 : 2);

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
            <Box sx={{ p: 3, boxShadow: 5, height: '70vh' }}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                        <Typography
                            gutterBottom
                            variant='h5'
                            sx={{
                                letterSpacing: '.1rem',
                                fontWeight: 'bold',
                                color: Colors.black,
                            }}
                        >
                            {toDestination.name}, {toDestination.country}
                        </Typography>
                        <Typography
                            gutterBottom
                            variant='body1'
                            sx={{
                                letterSpacing: '.1rem',
                                color: Colors.black,
                            }}
                        >
                            {toDestination.description}
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                        <Box>
                            <Box sx={{ borderColor: 'divider', mb: 3, overflowX: 'auto' }}>
                                <Tabs value={value} onChange={handleChange} aria-label='tabs'>
                                    <Tab label='Flight ✈️' />
                                    <Tab label='Driving 🚗' />
                                    <Tab label='Train 🚆' />
                                </Tabs>
                                {value === 0 && transports.includes('Flight ✈️') && (
                                    <FlightTable
                                        connections={fromDestination.connections_flight.filter((c) => c.to_id === toDestination.id)}
                                    ></FlightTable>
                                )}
                                {value === 1 && transports.includes('Driving 🚗') && (
                                    <DrivingTable
                                        connections={fromDestination.connections_driving.filter((c) => c.to_id === toDestination.id)}
                                    ></DrivingTable>
                                )}
                                {value === 2 && transports.includes('Train 🚆') && <div></div>}
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        )
    );
};

export default MiscDestination;
