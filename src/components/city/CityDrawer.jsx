import * as React from 'react';
import { Box, Drawer, Typography, ModalClose } from '@mui/joy';
import CityDrawerItem from './CityDrawerItem';
import { interests } from '../../helpers/Lists.js';
import { calculateMinCo2Mode } from '../../helpers/Functions.js';

const CityDrawer = ({ fromDestination, toDestination, month, averages, sortBy, open, onClose }) => {
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
                    index={100}
                    id={toDestination.id}
                    city={toDestination.name}
                    country={toDestination.country}
                    description={toDestination.description}
                    flag={toDestination.flag}
                    minCo2Mode={calculateMinCo2Mode(fromDestination, toDestination)}
                    popularity={toDestination.popularity.popularity_score}
                    seasonality={toDestination.seasonality[month]}
                    interests={interests.filter((i) => toDestination.interests.includes(i))}
                    averages={averages}
                    sortBy={sortBy}
                ></CityDrawerItem>
            </Drawer>
        </React.Fragment>
    );
};

export default CityDrawer;
