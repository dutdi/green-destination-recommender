import React, { useState } from 'react';
import { useLocation, Navigate } from 'react-router-dom';
import { Grid, Box, Paper, Tabs, Tab, Pagination, Typography, Divider, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import Map from './Map.jsx';
import DestinationListItem from './DestinationListItem.jsx';
import MiscDestination from './MiscDestination.jsx';
import { useData } from './DataContext';
import { convertToSec } from '../helpers/Functions.js';
import { Colors } from '../helpers/Colors.js';

const Explore = () => {
    const { state } = useLocation();
    const { destinations } = useData();
    const [clickedToDestination, setClickedToDestination] = useState(null);
    const fromDestination = state && JSON.parse(state.fromDestination);
    const toDestination = state && JSON.parse(state.toDestination);
    const transports = ['Flight ✈️', 'Driving 🚗', 'Train 🚆'];
    const [page, setPage] = useState(1);
    const [sortBy, setSortBy] = useState('co2');
    const [value, setValue] = useState(0);

    const itemsPerPage = 5;
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = page * itemsPerPage;

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handlePageChange = (event, value) => {
        setPage(value);
    };

    const handleSortChange = (event) => {
        setSortBy(event.target.value);
        setPage(1);
    };

    const handleClickedToDestination = (toDestination) => {
        setClickedToDestination(toDestination);
        const index = toDestinations.findIndex((destination) => destination.id === toDestination.id);
        const page = Math.ceil((index + 1) / itemsPerPage);
        setPage(page);
    };

    const getToDestinations = () => {
        const arr = [];
        if (toDestination) {
            arr.push(toDestination);
            transports.push('Flight ✈️', 'Driving 🚗', 'Train 🚆');
        } else {
            var allConnections = [];
            transports.forEach((transport) => {
                if (transport === 'Flight ✈️') {
                    allConnections.push(...fromDestination.connections_flight);
                }
                if (transport === 'Driving 🚗') {
                    allConnections.push(...fromDestination.connections_driving);
                }
            });

            const sortedToIds = [
                ...new Set(
                    allConnections
                        .sort((a, b) => {
                            if (sortBy === 'co2') {
                                const aCo2 = a.details ? a.details.co2_kg : a.estd_emissions_gm;
                                const bCo2 = b.details ? b.details.co2_kg : b.estd_emissions_gm;
                                return aCo2 - bCo2;
                            }
                            if (sortBy === 'trend') {
                                const aPopularity = destinations.miscDestinations.find((destination) => destination.id === a.to_id)
                                    .popularity.avg_trend_val;
                                const bPopularity = destinations.miscDestinations.find((destination) => destination.id === b.to_id)
                                    .popularity.avg_trend_val;
                                return bPopularity - aPopularity;
                            }
                            if (sortBy === 'duration') {
                                const aDuration = a.details ? convertToSec(a.details.duration_str) : a.duration_sec;
                                const bDuration = b.details ? convertToSec(b.details.duration_str) : b.duration_sec;
                                return aDuration - bDuration;
                            }
                            return 0;
                        })
                        .map((connection) => connection.to_id)
                ),
            ];

            const filteredToDestinations = destinations.miscDestinations.filter((destination) => sortedToIds.includes(destination.id));
            const sortedToDestinations = sortedToIds.map((id) => {
                return filteredToDestinations.find((obj) => obj.id === id);
            });

            arr.push(...sortedToDestinations);
        }
        return arr;
    };

    const toDestinations = fromDestination && getToDestinations();

    return destinations &&
        destinations.miscDestinations &&
        destinations.miscDestinations.length > 0 &&
        fromDestination &&
        toDestinations ? (
        <Box sx={{ mb: 10 }}>
            <Grid container spacing={2} sx={{ p: 3 }}>
                <Grid item xs={12} sm={10} md={10} lg={10} xl={10}>
                    <Typography
                        gutterBottom
                        variant='h5'
                        sx={{
                            mb: 4,
                            letterSpacing: '.2rem',
                            fontWeight: 'bold',
                            color: Colors.black,
                        }}
                    >
                        Recommendations based on: {fromDestination.name}, {fromDestination.country}
                    </Typography>
                    <Divider />
                </Grid>
                {toDestinations.length > 0 && (
                    <Grid item xs={12} sm={2} md={2} lg={2} xl={2}>
                        <FormControl sx={{ float: { md: 'right', lg: 'right', xl: 'right' }, width: '100%' }}>
                            <InputLabel id='sort-by-label'>Sort By</InputLabel>
                            <Select labelId='sort-by-label' id='sort-by-select' value={sortBy} label='Sort By' onChange={handleSortChange}>
                                <MenuItem value='co2'>CO2 Emission 🍀</MenuItem>
                                <MenuItem value='duration'>Duration ⏱️</MenuItem>
                                <MenuItem value='trend'>Trend 💹</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                )}
            </Grid>
            <Grid container spacing={2} sx={{ p: 3 }}>
                <Grid item xs={12} sm={12} md={5} lg={5} xl={4}>
                    <Box>
                        {toDestinations.length > 0 && (
                            <Box
                                sx={{
                                    position: 'sticky',
                                    zIndex: 1,
                                    backgroundColor: Colors.black,
                                    p: '9px',
                                    display: 'flex',
                                    justifyContent: 'flex-end',
                                    '& .MuiPaginationItem-root': {
                                        color: 'white',
                                    },
                                    '& .MuiPaginationItem-icon, & .MuiPaginationItem-page, & .MuiPaginationItem-previous, & .MuiPaginationItem-next':
                                        {
                                            '&:hover': {
                                                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                                            },
                                        },
                                    '& .MuiPaginationItem-ellipsis': {
                                        color: 'white',
                                    },
                                }}
                            >
                                <Pagination
                                    count={Math.ceil(toDestinations.length / itemsPerPage)}
                                    page={page}
                                    onChange={handlePageChange}
                                    shape='rounded'
                                    color='primary'
                                />
                            </Box>
                        )}
                        <Paper sx={{ overflow: 'auto', height: '70vh' }}>
                            {toDestinations.slice(startIndex, endIndex).map((toDest) => (
                                <Box key={toDest.id} sx={{ mb: 3 }}>
                                    <DestinationListItem
                                        fromDestination={fromDestination}
                                        toDestination={toDest}
                                        handleClickedToDestination={handleClickedToDestination}
                                        clickedToDestination={clickedToDestination === toDest}
                                    ></DestinationListItem>
                                </Box>
                            ))}
                        </Paper>
                    </Box>
                </Grid>
                <Grid item xs={12} sm={12} md={7} lg={7} xl={8}>
                    <Box>
                        <Box sx={{ backgroundColor: Colors.black }}>
                            <Tabs
                                value={value}
                                onChange={handleChange}
                                TabIndicatorProps={{
                                    style: { backgroundColor: Colors.blue },
                                }}
                                sx={{
                                    '& .MuiTab-root': {
                                        color: Colors.white,
                                    },
                                }}
                            >
                                <Tab label='Map' />
                                <Tab label='Detail' />
                            </Tabs>
                        </Box>
                        {value === 0 && (
                            <Box>
                                <Map
                                    fromDestination={fromDestination}
                                    toDestinations={toDestinations}
                                    clickedToDestination={clickedToDestination}
                                    handleClickedToDestination={handleClickedToDestination}
                                ></Map>
                            </Box>
                        )}
                        {value === 1 && (
                            <Box>
                                <MiscDestination
                                    fromDestination={fromDestination}
                                    toDestination={clickedToDestination}
                                    transports={transports}
                                ></MiscDestination>
                            </Box>
                        )}
                    </Box>
                </Grid>
            </Grid>
        </Box>
    ) : (
        <Navigate to='/' replace></Navigate>
    );
};

export default Explore;
