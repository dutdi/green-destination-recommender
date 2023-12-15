import React, { useState } from 'react';
import { useLocation, Navigate } from 'react-router-dom';
import { Grid, Box, Paper, Pagination, Typography, Divider } from '@mui/material';
import Stack from '@mui/joy/Stack';
import CityRecommendationCard from '../city/CityRecommendationCard.jsx';
import Filters from '../custom/Filters.jsx';
import { useData } from '../main/DataContext.jsx';
import { getSortedToDestinations, calculateAvgCo2AllConnections } from '../../helpers/Functions.js';

const Explore = () => {
    const { state } = useLocation();
    const { destinations, dataFetched } = useData();
    const fromDestination = state && JSON.parse(state.fromDestination);
    const interests = state && state.interests;
    const month = state && state.month;
    const [page, setPage] = useState(1);
    const [sortBy, setSortBy] = useState('emission');

    const itemsPerPage = 8;
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = page * itemsPerPage;

    const handlePageChange = (event, value) => {
        setPage(value);
    };

    const handleSortChange = (value) => {
        setSortBy(value);
        setPage(1);
    };

    const sortedToDestinations = getSortedToDestinations(fromDestination, destinations, sortBy, month);
    const filteredDestinations =
        sortedToDestinations &&
        sortedToDestinations.filter((toDest) => {
            return toDest.interests.some((i) => interests.some((j) => Object.keys(i)[0] === j.name));
        });

    const avgCo2AllConnections = calculateAvgCo2AllConnections(
        fromDestination.connections_flight.concat(fromDestination.connections_driving).concat(fromDestination.connections_train)
    );

    return dataFetched && fromDestination && filteredDestinations && avgCo2AllConnections ? (
        <Box sx={{ m: 5, mb: 10 }}>
            <Typography gutterBottom variant='h4' sx={{ p: 2 }}>
                Discover Your Ideal Destinations: Top Travel Picks for <b>{month}</b> from <b>{fromDestination.name}</b>!
            </Typography>
            <Divider />
            <Stack spacing={2} sx={{ pt: 2, minHeight: 0 }}>
                <Filters handleSortChange={handleSortChange} />
                <Paper>
                    <Grid container spacing={2} sx={{ p: 3 }}>
                        {filteredDestinations.slice(startIndex, endIndex).map((toDest) => (
                            <Grid item xs={12} sm={6} md={3} lg={3} xl={3} key={toDest.id}>
                                <CityRecommendationCard
                                    fromDestination={fromDestination}
                                    toDestination={toDest}
                                    interests={interests}
                                    month={month}
                                    sortedToDestinations={filteredDestinations}
                                    avgCo2AllConnections={avgCo2AllConnections}
                                ></CityRecommendationCard>
                            </Grid>
                        ))}
                    </Grid>
                </Paper>
            </Stack>
            <Pagination
                sx={{
                    position: 'sticky',
                    zIndex: 1,
                    p: '9px',
                    display: 'flex',
                    justifyContent: 'flex-end',
                }}
                count={Math.ceil(filteredDestinations.length / itemsPerPage)}
                page={page}
                onChange={handlePageChange}
                shape='rounded'
                color='primary'
            />
        </Box>
    ) : (
        <Navigate to='/' replace></Navigate>
    );
};

export default Explore;
