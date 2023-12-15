import React from 'react';
import { Box, Grid, Divider, Typography, Card, CardContent, CardMedia } from '@mui/material';
import RouteChart from '../route/RouteChart.jsx';
import { Colors } from '../../helpers/Colors.js';
import { calculateMinCo2Value, calculateMinDuration } from '../../helpers/Functions.js';

const CityComparison = ({ fromDestination, selectedDestination, recommendedDestinations }) => {
    console.log('CityComparison.jsx: fromDestination', fromDestination);
    console.log('CityComparison.jsx: selectedDestination', selectedDestination);
    console.log('CityComparison.jsx: recommendedDestinations', recommendedDestinations);
    const selectedCo2 = calculateMinCo2Value(fromDestination, selectedDestination);
    const recommendedCo2 = calculateMinCo2Value(fromDestination, recommendedDestinations[0]);
    const co2Offset = parseInt((selectedCo2 * 100) / recommendedCo2 - 100);

    const selectedDuration = calculateMinDuration(fromDestination, selectedDestination);
    const recommendedDuration = calculateMinDuration(fromDestination, recommendedDestinations[0]);
    const durationOffset = parseInt((selectedDuration * 100) / recommendedDuration - 100);

    return (
        <Box sx={{ p: 2 }}>
            <Typography
                variant='h5'
                align='left'
                gutterBottom
                sx={{
                    mb: 4,
                    letterSpacing: '.2rem',
                    fontWeight: 'bold',
                    color: Colors.black,
                }}
            >
                {selectedDestination.name}, {selectedDestination.country}
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <Grid container spacing={2} sx={{}}>
                <Grid container item xs={12} sm={12} md={6} lg={6} xl={6} spacing={1}>
                    <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                        <Card sx={{ display: 'flex' }}>
                            <CardContent sx={{ flex: 1 }}>
                                <Typography variant='body1'>
                                    Approximately <b>{(selectedCo2 * 0.05).toFixed(2)}</b> trees must grow per year to offset {selectedCo2}{' '}
                                    kg of CO₂ captioned from this trip.
                                </Typography>
                            </CardContent>
                            <CardMedia
                                component='img'
                                sx={{ width: 160, display: { xs: 'none', sm: 'block' } }}
                                image={require(`../../media/tree.jpg`)}
                                height='150'
                                alt={'tree'}
                            />
                        </Card>
                    </Grid>

                    <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                        <Card sx={{ display: 'flex' }}>
                            <CardContent sx={{ flex: 1 }}>
                                <Typography variant='body1'>
                                    Enjoy a <b>{(500 / selectedCo2).toFixed(1)}</b> % discount on eco-friendly accommodations, supporting
                                    sustainability while exploring this stunning locale!
                                </Typography>
                            </CardContent>
                            <CardMedia
                                component='img'
                                sx={{ width: 160, display: { xs: 'none', sm: 'block' } }}
                                image={require(`../../media/discount.jpg`)}
                                height='150'
                                alt={'discount'}
                            />
                        </Card>
                    </Grid>
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                    <Box sx={{ maxWidth: 500, height: 300 }}>
                        <RouteChart
                            fromDestination={fromDestination}
                            toDestination={selectedDestination}
                            recommendedDestinations={recommendedDestinations}
                        ></RouteChart>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
};

export default CityComparison;
