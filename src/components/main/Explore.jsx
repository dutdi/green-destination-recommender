import React, { useState } from 'react';
import { useLocation, Navigate } from 'react-router-dom';
import { Grid, Box, Paper, Pagination, Typography, Divider } from '@mui/material';
import Stack from '@mui/joy/Stack';
import CityCardItem from '../city/CityCardItem.jsx';
import CustomMapContainer from '../custom/CustomMapContainer.jsx';
import Filters from '../custom/Filters.jsx';
import { useData } from '../main/DataContext.jsx';
import { getSortedToDestinations, calculateAvgValues, calculateMinCo2Mode } from '../../helpers/Functions.js';

const Explore = () => {
    const { state } = useLocation();
    const { destinations, dataFetched } = useData();
    const fromDestination = state && JSON.parse(state.fromDestination);
    const interests = state && JSON.parse(state.interests);
    const month = state && state.month;
    const [view, setView] = useState('card');
    const [sortBy, setSortBy] = useState('emission');
    const [page, setPage] = useState(1);

    const itemsPerPage = view === 'card' ? 8 : 4;
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = page * itemsPerPage;

    const handlePageChange = (event, value) => {
        setPage(value);
    };

    const handleSortChange = (value) => {
        setSortBy(value);
        setPage(1);
    };

    const handleViewChange = (value) => {
        setView(value);
        setPage(1);
    };

    const sortedToDestinations = getSortedToDestinations(fromDestination, destinations, sortBy, month);
    const filteredDestinations = sortedToDestinations.filter((toDest) => {
        return interests.some((interest) => toDest.interests.includes(interest));
    });

    const averages = calculateAvgValues(fromDestination, filteredDestinations, month);

    return dataFetched && fromDestination && filteredDestinations && averages ? (
        <Box sx={{ m: 3, mb: 10 }}>
            <Typography gutterBottom variant='h4' sx={{ p: 2 }}>
                Discover Your Ideal Destinations: Top Travel Picks for <b>{month}</b> from <b>{fromDestination.name}</b>!
            </Typography>
            <Divider />
            <Stack spacing={2} sx={{ pt: 2, minHeight: 0 }}>
                <Filters handleSortChange={handleSortChange} handleViewChange={handleViewChange} />
                <Paper>
                    <Grid container spacing={2} sx={{ p: 3 }}>
                        {view === 'card' ? (
                            filteredDestinations.slice(startIndex, endIndex).map((toDest, index) => {
                                return (
                                    <Grid item xs={12} sm={6} md={3} lg={3} xl={3} key={toDest.id}>
                                        <CityCardItem
                                            index={index}
                                            id={toDest.id}
                                            city={toDest.name}
                                            country={toDest.country}
                                            flag={toDest.flag}
                                            minCo2Mode={calculateMinCo2Mode(fromDestination, toDest)}
                                            popularity={toDest.popularity.popularity_score}
                                            seasonality={toDest.seasonality[month]}
                                            interests={interests.filter((i) => toDest.interests.includes(i)).slice(0, 5)}
                                            averages={averages}
                                            sortBy={sortBy}
                                        ></CityCardItem>
                                    </Grid>
                                );
                            })
                        ) : (
                            <Grid item xs={12} sm={12} md={5} lg={12} xl={12}>
                                <CustomMapContainer
                                    fromDestination={fromDestination}
                                    toDestinations={filteredDestinations}
                                    month={month}
                                    averages={averages}
                                    sortBy={sortBy}
                                ></CustomMapContainer>
                            </Grid>
                        )}
                    </Grid>
                </Paper>
            </Stack>
            {view === 'card' && (
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
            )}
        </Box>
    ) : (
        <Navigate to='/' replace></Navigate>
    );
};

export default Explore;
