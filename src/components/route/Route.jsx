import React from 'react';
import { Grid, Box } from '@mui/material';
import Map from '../custom/Map.jsx';

const Route = ({ fromDestination, toDestination, height }) => {
    return (
        fromDestination &&
        toDestination && (
            <Grid container>
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                    <Box>
                        <Map fromDestination={fromDestination} toDestination={toDestination} height={height}></Map>
                    </Box>
                </Grid>
            </Grid>
        )
    );
};

export default Route;
