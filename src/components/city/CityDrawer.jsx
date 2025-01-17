import * as React from 'react';
import { Box, Drawer, Typography, ModalClose } from '@mui/joy';
import CityDrawerItem from './CityDrawerItem';
import { calculateMinCo2Mode } from '../../helpers/Functions.js';

const CityDrawer = ({ fromDestination, toDestination, month, averages, sortBy, open, onClose, clicked, onItemClicked }) => {
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
                        mb: 1,
                    }}
                >
                    <Typography component='label' htmlFor='close-icon' fontSize='sm' fontWeight='lg' sx={{ cursor: 'pointer' }}>
                        Close
                    </Typography>
                    <ModalClose id='close-icon' sx={{ position: 'initial' }} />
                </Box>
                <CityDrawerItem
                    index={100}
                    fromDestination={fromDestination}
                    toDestination={toDestination}
                    month={month}
                    minCo2Mode={calculateMinCo2Mode(fromDestination, toDestination)}
                    averages={averages}
                    sortBy={sortBy}
                    clicked={clicked}
                    onItemClicked={onItemClicked}
                ></CityDrawerItem>
            </Drawer>
        </React.Fragment>
    );
};

export default CityDrawer;
