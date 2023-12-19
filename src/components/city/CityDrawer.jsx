import * as React from 'react';
import { Box, Drawer, Typography, ModalClose } from '@mui/joy';
import CityDrawerItem from './CityDrawerItem';

const CityDrawer = ({ fromDestination, toDestinations, selectedToDestination, month, avgCo2AllConnections, open, onClose }) => {
    return (
        <React.Fragment>
            <Drawer open={open} onClose={onClose}>
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 0.5,
                        ml: 'auto',
                        mt: 1,
                        mr: 2,
                    }}
                >
                    <Typography component='label' htmlFor='close-icon' fontSize='sm' fontWeight='lg' sx={{ cursor: 'pointer' }}>
                        Close
                    </Typography>
                    <ModalClose id='close-icon' sx={{ position: 'initial' }} />
                </Box>
                <CityDrawerItem
                    view='card'
                    fromDestination={fromDestination}
                    toDestination={selectedToDestination}
                    month={month}
                    sortedToDestinations={toDestinations}
                    avgCo2AllConnections={avgCo2AllConnections}
                ></CityDrawerItem>
            </Drawer>
        </React.Fragment>
    );
};

export default CityDrawer;
