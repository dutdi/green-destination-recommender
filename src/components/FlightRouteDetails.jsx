import React from 'react';
import { Box, Grid, Typography } from '@mui/material';
import FlightIcon from '@mui/icons-material/Flight';
import { Colors } from '../helpers/Colors.js';
import { findFlightConnectionWithMinCo2 } from '../helpers/Functions.js';

const FlightRouteDetails = ({ fromDestination, toDestination }) => {
    const flightConnectionWithMinCo2 = findFlightConnectionWithMinCo2(fromDestination, toDestination);

    return (
        flightConnectionWithMinCo2 && (
            <Box>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={12} md={2}>
                        <Box sx={{ p: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <FlightIcon sx={{ fontSize: 30, color: Colors.blue }} />
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={12} md={7}>
                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'left', justifyContent: 'center' }}>
                            <Typography variant='body1'>{flightConnectionWithMinCo2.details.duration_str}</Typography>
                            <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                <Typography variant='body1'>
                                    {flightConnectionWithMinCo2.details.source_airport} -{' '}
                                    {flightConnectionWithMinCo2.details.destination_airport}
                                </Typography>
                                <Typography variant='body1'>
                                    Stops: <b>{flightConnectionWithMinCo2.details.no_of_stops}</b>
                                </Typography>
                            </Box>
                            <Typography variant='body1'>
                                {flightConnectionWithMinCo2.details.departure_time} - {flightConnectionWithMinCo2.details.arrival_time}
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid
                        item
                        xs={12}
                        sm={12}
                        md={3}
                        sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'flex-end',
                            justifyContent: 'right',
                        }}
                    >
                        <Typography variant='body1' sx={{ fontWeight: 'bold', color: Colors.green }}>
                            {flightConnectionWithMinCo2.details.co2_kg} kg
                        </Typography>
                    </Grid>
                </Grid>
            </Box>
        )
    );
};

export default FlightRouteDetails;
