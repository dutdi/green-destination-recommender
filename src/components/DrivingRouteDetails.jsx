import React from 'react';
import { Box, Grid, Typography } from '@mui/material';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import { Colors } from '../helpers/Colors.js';
import { findDrivingConnectionWithMinCo2, formatDuration } from '../helpers/Functions.js';

const DrivingRouteDetails = ({ fromDestination, toDestination }) => {
    const drivingConnectionWithMinCo2 = fromDestination && toDestination && findDrivingConnectionWithMinCo2(fromDestination, toDestination);

    return (
        drivingConnectionWithMinCo2 && (
            <Box>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={2}>
                        <Box sx={{ p: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <DirectionsCarIcon sx={{ fontSize: 30, color: Colors.red }} />
                        </Box>
                    </Grid>
                    <Grid item xs={10} md={6}>
                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'left' }}>
                            <Typography variant='body1'>{formatDuration(drivingConnectionWithMinCo2.duration_sec)}</Typography>
                            <Typography variant='body1'>{parseInt(drivingConnectionWithMinCo2.dist_km)} km</Typography>
                        </Box>
                    </Grid>
                    <Grid
                        item
                        xs={12}
                        md={4}
                        sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'flex-end',
                            justifyContent: 'right',
                        }}
                    >
                        <Typography variant='body2' sx={{ fontWeight: 'bold', color: Colors.green }}>
                            {parseInt(drivingConnectionWithMinCo2.estd_emissions_osrm_gm)} kg
                        </Typography>
                    </Grid>
                </Grid>
            </Box>
        )
    );
};

export default DrivingRouteDetails;
