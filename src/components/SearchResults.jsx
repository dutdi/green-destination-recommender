import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Grid, Box, Pagination, Typography, Divider, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { useData } from './DataContext';
import MiscDestination from './MiscDestination.jsx';
import { Colors } from '../helpers/Colors.js';

const SearchResults = () => {
    const { state } = useLocation();
    const { destinations } = useData();
    const fromDestination = JSON.parse(state.fromDestination);
    const toDestination = JSON.parse(state.toDestination);
    const transports = JSON.parse(state.transports);
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
                            if (sortBy === 'popularity') {
                                const aPopularity = destinations.miscDestinations.find((destination) => destination.id === a.to_id)
                                    .popularity.avg_trend_val;
                                const bPopularity = destinations.miscDestinations.find((destination) => destination.id === b.to_id)
                                    .popularity.avg_trend_val;
                                return bPopularity - aPopularity;
                            }
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

    return (
        fromDestination &&
        toDestinations.length > 0 && (
            <Box sx={{ mb: 10 }}>
                <Grid container spacing={2} sx={{ p: 5 }}>
                    <Grid item xs={12} md={10}>
                        <Typography
                            gutterBottom
                            variant='h4'
                            sx={{
                                mb: 4,
                                letterSpacing: '.2rem',
                                fontWeight: 'bold',
                            }}
                        >
                            Recommendations based on: {fromDestination.name}, {fromDestination.country}
                        </Typography>
                    </Grid>
                    <Grid item xs={12} md={2}>
                        <FormControl sx={{ minWidth: 200 }}>
                            <InputLabel id='sort-by-label'>Sort By</InputLabel>
                            <Select labelId='sort-by-label' id='sort-by-select' value={sortBy} label='Sort By' onChange={handleSortChange}>
                                <MenuItem value='co2'>CO2</MenuItem>
                                <MenuItem value='popularity'>Popularity</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>
                <Box sx={{ p: 2 }}>
                    <Divider></Divider>
                    {toDestinations.slice(startIndex, endIndex).map((toDest, index) => (
                        <Box key={index}>
                            <MiscDestination fromDestination={fromDestination} toDestination={toDest}></MiscDestination>
                        </Box>
                    ))}
                </Box>
                <Divider></Divider>
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
            </Box>
        )
    );
};

export default SearchResults;
