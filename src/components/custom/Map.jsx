import React from 'react';
import { Box } from '@mui/material';
import MapContainer from './MapContainer';

const GOOGLE_MAP_URL = `https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=`;

const Map = ({ fromDestination, toDestination }) => {
    return (
        <Box sx={{ position: 'sticky', top: 0, height: '55vh' }}>
            <MapContainer
                googleMapURL={GOOGLE_MAP_URL}
                loadingElement={<Box height='100%' />}
                containerElement={<Box height='100%' />}
                mapElement={<Box height='100%' />}
                fromDestination={fromDestination}
                toDestination={toDestination}
            />
        </Box>
    );
};

export default Map;
