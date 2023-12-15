import React from 'react';
import { useLocation } from 'react-router-dom';
import { Paper, Grid, Divider, Tooltip, Badge, Tabs, Tab, Box } from '@mui/material';
import Typography from '@mui/joy/Typography';
import CircularProgress from '@mui/joy/CircularProgress';
import SvgIcon from '@mui/joy/SvgIcon';
import CityHeader from './CityHeader.jsx';
import CityRecommendationCard from './CityRecommendationCard.jsx';
import CustomBox from '../custom/CustomBox.jsx';
import Route from '../route/Route.jsx';
import { Colors } from '../../helpers/Colors.js';

const CircularProgressIcon = ({ score }) => (
    <CircularProgress size='lg' determinate value={score}>
        <SvgIcon>
            <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='currentColor'>
                <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941'
                />
            </svg>
        </SvgIcon>
    </CircularProgress>
);

const TreeIcon = (
    <CircularProgress size='lg' determinate value={0}>
        <SvgIcon size='lg'>
            <svg fill='none' stroke='currentColor' strokeLinecap='round' strokeLinejoin='round' strokeWidth={1.5} viewBox='0 0 24 24'>
                <path d='M10 10v.2A3 3 0 018.9 16v0H5v0h0a3 3 0 01-1-5.8V10a3 3 0 016 0zM7 16v6M13 19v3' />
                <path d='M12 19h8.3a1 1 0 00.7-1.7L18 14h.3a1 1 0 00.7-1.7L16 9h.2a1 1 0 00.8-1.7L13 3l-1.4 1.5' />
            </svg>
        </SvgIcon>
    </CircularProgress>
);

const IncentiveIcon = (
    <CircularProgress size='lg' determinate value={0}>
        <SvgIcon size='lg'>
            <svg fill='none' viewBox='0 0 15 15' height='1em' width='1em'>
                <path
                    stroke='currentColor'
                    d='M5 5.5h1m3 4h1M10 5l-5 5M6.801.79L5.672 1.917a.988.988 0 01-.698.29H3.196a.988.988 0 00-.988.988v1.778a.988.988 0 01-.29.698L.79 6.802a.988.988 0 000 1.397l1.13 1.129c.185.185.289.436.289.698v1.778c0 .546.442.988.988.988h1.778c.262 0 .513.104.698.29l1.13 1.129a.988.988 0 001.397 0l1.129-1.13a.988.988 0 01.698-.289h1.778a.988.988 0 00.988-.988v-1.778c0-.262.104-.513.29-.698l1.129-1.13a.988.988 0 000-1.397l-1.13-1.129a.988.988 0 01-.289-.698V3.196a.988.988 0 00-.988-.988h-1.778a.988.988 0 01-.698-.29L8.198.79a.988.988 0 00-1.397 0z'
                />
            </svg>
        </SvgIcon>
    </CircularProgress>
);

const LikeIcon = (
    <CircularProgress size='lg' determinate value={0}>
        <SvgIcon size='lg'>
            <svg viewBox='0 0 1024 1024' fill='currentColor'>
                <path d='M885.9 533.7c16.8-22.2 26.1-49.4 26.1-77.7 0-44.9-25.1-87.4-65.5-111.1a67.67 67.67 0 00-34.3-9.3H572.4l6-122.9c1.4-29.7-9.1-57.9-29.5-79.4A106.62 106.62 0 00471 99.9c-52 0-98 35-111.8 85.1l-85.9 311H144c-17.7 0-32 14.3-32 32v364c0 17.7 14.3 32 32 32h601.3c9.2 0 18.2-1.8 26.5-5.4 47.6-20.3 78.3-66.8 78.3-118.4 0-12.6-1.8-25-5.4-37 16.8-22.2 26.1-49.4 26.1-77.7 0-12.6-1.8-25-5.4-37 16.8-22.2 26.1-49.4 26.1-77.7-.2-12.6-2-25.1-5.6-37.1zM184 852V568h81v284h-81zm636.4-353l-21.9 19 13.9 25.4a56.2 56.2 0 016.9 27.3c0 16.5-7.2 32.2-19.6 43l-21.9 19 13.9 25.4a56.2 56.2 0 016.9 27.3c0 16.5-7.2 32.2-19.6 43l-21.9 19 13.9 25.4a56.2 56.2 0 016.9 27.3c0 22.4-13.2 42.6-33.6 51.8H329V564.8l99.5-360.5a44.1 44.1 0 0142.2-32.3c7.6 0 15.1 2.2 21.1 6.7 9.9 7.4 15.2 18.6 14.6 30.5l-9.6 198.4h314.4C829 418.5 840 436.9 840 456c0 16.5-7.2 32.1-19.6 43z' />
            </svg>
        </SvgIcon>
    </CircularProgress>
);

const CityDetails = () => {
    const { state } = useLocation();
    const fromDestination = state && JSON.parse(state.fromDestination);
    const toDestination = state && JSON.parse(state.toDestination);
    const sortedToDestinations = state && JSON.parse(state.sortedToDestinations);

    console.log('first');
    return (
        <Paper sx={{ m: 4 }}>
            <CityHeader toDestination={toDestination} />
            <Divider />
            <Box sx={{ mt: 2, mb: 2, backgroundColor: Colors.black }}>
                <Tabs aria-label='tabs'>
                    <Tab sx={{ color: Colors.white }} label='Flight ✈️' />
                    <Tab sx={{ color: Colors.white }} label='Driving 🚗' />
                    <Tab sx={{ color: Colors.white }} label='Train 🚆' />
                </Tabs>
            </Box>
            <Grid container spacing={2} sx={{ mt: 6 }}>
                <Grid container item xs={12} sm={12} md={6} lg={6} xl={6} spacing={3} sx={{ mt: 2 }}>
                    <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                        <Badge
                            badgeContent={
                                <Tooltip title='Rank of your choice compared to the most sustainable destinations.'>
                                    <span>?</span>
                                </Tooltip>
                            }
                            color='primary'
                        >
                            <CustomBox icon={CircularProgressIcon(83)} color='primary' title='Your Choice' text='25/120'></CustomBox>
                        </Badge>
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                        <Badge
                            badgeContent={
                                <Tooltip title='Approximately 32 trees must grow per year to offset 120 kg of CO₂ captioned from this trip.'>
                                    <span>?</span>
                                </Tooltip>
                            }
                            color='success'
                        >
                            <CustomBox icon={TreeIcon} color='success' title='Climate' text=' 32 trees'></CustomBox>
                        </Badge>
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                        <Badge
                            badgeContent={
                                <Tooltip
                                    title='Enjoy 10% discount on eco-friendly accommodations, supporting
                                sustainability while exploring this stunning locale!'
                                >
                                    <span>?</span>
                                </Tooltip>
                            }
                            color='warning'
                        >
                            <CustomBox icon={IncentiveIcon} color='warning' title='Promotions' text='10% discount'></CustomBox>
                        </Badge>
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                        <Badge
                            badgeContent={
                                <Tooltip title='Popularity of the destination based on Google trends.'>
                                    <span>?</span>
                                </Tooltip>
                            }
                            color='error'
                        >
                            <CustomBox icon={LikeIcon} color='danger' title='Popularity' text='83/100'></CustomBox>
                        </Badge>
                    </Grid>
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                    <Route fromDestination={fromDestination} toDestination={toDestination}></Route>
                </Grid>
            </Grid>
            <Paper sx={{ mt: 6, mb: 6 }}>
                <Box sx={{ backgroundColor: Colors.black }}>
                    <Typography gutterBottom level='h3' sx={{ color: Colors.white, p: 2 }}>
                        Opt for travel destinations with low-carbon initiatives
                    </Typography>
                </Box>
                <Grid container spacing={2} sx={{ p: 3 }}>
                    {sortedToDestinations.slice(0, 4).map((toDest) => (
                        <Grid item xs={12} sm={6} md={3} lg={3} xl={3}>
                            <CityRecommendationCard
                                fromDestination={fromDestination}
                                toDestination={toDest}
                                sortedToDestinations={sortedToDestinations}
                                avgCo2AllConnections={43}
                            ></CityRecommendationCard>
                        </Grid>
                    ))}
                </Grid>
            </Paper>
        </Paper>
    );
};

export default CityDetails;
