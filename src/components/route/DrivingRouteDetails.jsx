import React from 'react';
import { Box, Grid, Typography } from '@mui/material';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import { Colors } from '../../helpers/Colors.js';
import { findDrivingConnectionWithMinCo2, formatDuration } from '../../helpers/Functions.js';

const DrivingRouteDetails = ({ fromDestination, toDestination }) => {
    const drivingConnectionWithMinCo2 = fromDestination && toDestination && findDrivingConnectionWithMinCo2(fromDestination, toDestination);

    return (
        drivingConnectionWithMinCo2 && (
            <Grid container spacing={2}>
                <Grid item xs={2} sm={2} md={2} lg={2} xl={2}>
                    <Box sx={{ p: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <DirectionsCarIcon sx={{ fontSize: 30, color: Colors.red }} />
                    </Box>
                </Grid>
                <Grid item xs={10} sm={10} md={10} lg={10} xl={10}>
                    <Box sx={{ p: 1, display: 'flex', flexDirection: 'column', alignItems: 'left' }}>
                        <Typography variant='caption'>
                            Distance: <b>{drivingConnectionWithMinCo2.distance_km} km</b>
                        </Typography>
                        <Typography variant='caption'>
                            Duration: <b>{formatDuration(drivingConnectionWithMinCo2.duration_sec)}</b>
                        </Typography>
                    </Box>
                </Grid>
            </Grid>
        )
    );
};

export default DrivingRouteDetails;
