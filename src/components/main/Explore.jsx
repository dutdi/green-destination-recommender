import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Grid, Box, Paper, Pagination, Divider } from '@mui/material';
import { Typography } from '@mui/joy';
import Stack from '@mui/joy/Stack';
import CityCardItem from '../city/CityCardItem.jsx';
import CustomMapContainer from '../custom/CustomMapContainer.jsx';
import Header from '../custom/Header.jsx';
import { getSortedToDestinations, calculateAvgValues, calculateMinCo2Mode } from '../../helpers/Functions.js';
import destinations from '../../data/data.json';

const Explore = () => {
    const { state } = useLocation();
    const fromDestination = state && JSON.parse(state.fromDestination);
    const interests = state && JSON.parse(state.interests);
    const month = state && state.month;
    const [clickedItems, setClickedItems] = useState({});
    const [view, setView] = useState('card');
    const [sortBy, setSortBy] = useState('overall');
    const [page, setPage] = useState(1);

    const itemsPerPage = 6;
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

    const handleItemClick = (id) => {
        setClickedItems((prev) => ({ ...prev, [id]: !prev[id] }));
    };

    const getFilteredDestinations = () => {
        const sortedToDestinations = getSortedToDestinations(fromDestination, destinations, sortBy, month);
        return sortedToDestinations.filter((toDest) => interests.some((interest) => toDest?.interests.includes(interest)));
    };

    const filteredDestinations = getFilteredDestinations();
    const averages = calculateAvgValues(fromDestination, filteredDestinations, month);

    return (
        <Box sx={{ m: 3, mb: 10 }}>
            <Typography gutterBottom level='h3' sx={{ p: 2 }}>
                Discover Your Ideal Destinations: Top Travel Picks for <b>{month}</b> from <b>{fromDestination.name}</b>!
            </Typography>
            <Divider />
            <Stack spacing={2} sx={{ pt: 2, minHeight: 0 }}>
                <Header sortBy={sortBy} handleSortChange={handleSortChange} handleViewChange={handleViewChange} />
                <Paper>
                    <Grid container spacing={2} sx={{ p: 3 }}>
                        {view === 'card' ? (
                            filteredDestinations.slice(startIndex, endIndex).map((toDest, index) => {
                                const adjustedIndex = startIndex + index;
                                return (
                                    <Grid item xs={12} sm={6} md={4} lg={4} xl={4} key={toDest.id}>
                                        <CityCardItem
                                            index={adjustedIndex}
                                            fromDestination={fromDestination}
                                            toDestination={toDest}
                                            month={month}
                                            minCo2Mode={calculateMinCo2Mode(fromDestination, toDest)}
                                            averages={averages}
                                            sortBy={sortBy}
                                            clicked={clickedItems[toDest.id]}
                                            onItemClicked={() => handleItemClick(toDest.id)}
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
                                    clickedItems={clickedItems}
                                    onItemClicked={handleItemClick}
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
    );
};

export default Explore;
