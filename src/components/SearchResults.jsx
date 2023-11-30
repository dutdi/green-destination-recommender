import React, { useState } from 'react';
import { useLocation, Navigate } from 'react-router-dom';
import { Grid, Box, Pagination, Typography, Divider, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { useData } from './DataContext';
import MiscDestination from './MiscDestination.jsx';
import { Colors } from '../helpers/Colors.js';
import { convertToSec } from '../helpers/Functions.js';

const SearchResults = () => {
    const { state } = useLocation();
    const { destinations } = useData();
    const fromDestination = state && JSON.parse(state.fromDestination);
    const toDestination = state && JSON.parse(state.toDestination);
    const transports = state && JSON.parse(state.transports);
    const [page, setPage] = useState(1);
    const [sortBy, setSortBy] = useState('co2');
    const itemsPerPage = 5;
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = page * itemsPerPage;

    const handlePageChange = (event, value) => {
        setPage(value);
    };

    const handleSortChange = (event) => {
        setSortBy(event.target.value);
        setPage(1);
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

    const toDestinations = getToDestinations();

    return fromDestination ? (
        <Box sx={{ mb: 10 }}>
            <Grid container spacing={2} sx={{ p: 5 }}>
                <Grid item xs={12} sm={10} md={10} lg={10} xl={10}>
                    <Typography
                        gutterBottom
                        variant='h5'
                        sx={{
                            mb: 4,
                            letterSpacing: '.2rem',
                            fontWeight: 'bold',
                            color: Colors.darkBlue,
                        }}
                    >
                        Recommendations based on: {fromDestination.name}, {fromDestination.country}
                    </Typography>
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
            {toDestinations.length > 0 && (
                <Box sx={{ p: 2 }}>
                    <Divider></Divider>
                    {toDestinations.slice(startIndex, endIndex).map((toDest, index) => (
                        <Box key={index} sx={{ mb: 3 }}>
                            <MiscDestination
                                fromDestination={fromDestination}
                                toDestination={toDest}
                                transports={transports}
                            ></MiscDestination>
                        </Box>
                    ))}
                </Box>
            )}
            <Divider></Divider>
            {toDestinations.length > 0 && (
                <Box
                    sx={{
                        position: 'sticky',
                        bottom: 0,
                        backgroundColor: Colors.white,
                        padding: '10px',
                        display: 'flex',
                        justifyContent: 'flex-end',
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
        </Box>
    ) : (
        <Navigate to='/' replace></Navigate>
    );
};

export default SearchResults;
