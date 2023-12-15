import React from 'react';
import { Box, Grid, Typography } from '@mui/material';
import FlightIcon from '@mui/icons-material/Flight';
import { Colors } from '../../helpers/Colors.js';
import { findFlightConnectionWithMinCo2 } from '../../helpers/Functions.js';

const FlightRouteDetails = ({ fromDestination, toDestination }) => {
    const flightConnectionWithMinCo2 = findFlightConnectionWithMinCo2(fromDestination, toDestination);

    return (
        flightConnectionWithMinCo2 && (
            <Grid container spacing={2}>
                <Grid item xs={2} sm={2} md={2} lg={2} xl={2}>
                    <Box sx={{ p: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <FlightIcon sx={{ fontSize: 30, color: Colors.blue }} />
                    </Box>
                </Grid>
                <Grid item xs={10} sm={10} md={10} lg={10} xl={10}>
                    <Box sx={{ p: 1, display: 'flex', flexDirection: 'column', alignItems: 'left' }}>
                        <Typography variant='caption'>
                            Stops:{' '}
                            <b>{flightConnectionWithMinCo2.no_of_stops === 0 ? 'Nonstop' : flightConnectionWithMinCo2.no_of_stops}</b>
                        </Typography>
                        <Typography variant='caption'>
                            Duration: <b>{flightConnectionWithMinCo2.duration_str}</b>
                        </Typography>
                    </Box>
                </Grid>
            </Grid>
        )
    );
};

export default FlightRouteDetails;
