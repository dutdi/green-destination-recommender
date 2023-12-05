import React, { useState } from 'react';
import { Box, Grid, Tabs, Tab, Typography, Divider, Rating } from '@mui/material';
import { styled } from '@mui/material/styles';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import SentimentSatisfiedIcon from '@mui/icons-material/SentimentSatisfied';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAltOutlined';
import SentimentVerySatisfiedIcon from '@mui/icons-material/SentimentVerySatisfied';
import DrivingTable from './DrivingTable.jsx';
import FlightTable from './FlightTable.jsx';
import { formatPopulation, calculateDistance } from '../helpers/Functions.js';
import { Colors } from '../helpers/Colors.js';

const StyledRating = styled(Rating)(({ theme }) => ({
    '& .MuiRating-iconEmpty .MuiSvgIcon-root': {
        color: theme.palette.action.disabled,
    },
}));

const customIcons = {
    1: {
        icon: <SentimentVeryDissatisfiedIcon color='error' fontSize='large' />,
        label: 'Very Dissatisfied',
    },
    2: {
        icon: <SentimentDissatisfiedIcon color='error' fontSize='large' />,
        label: 'Dissatisfied',
    },
    3: {
        icon: <SentimentSatisfiedIcon color='warning' fontSize='large' />,
        label: 'Neutral',
    },
    4: {
        icon: <SentimentSatisfiedAltIcon color='success' fontSize='large' />,
        label: 'Satisfied',
    },
    5: {
        icon: <SentimentVerySatisfiedIcon color='success' fontSize='large' />,
        label: 'Very Satisfied',
    },
};

function IconContainer(props) {
    const { value, ...other } = props;
    return <span {...other}>{customIcons[value].icon}</span>;
}

const MiscDestination = ({ fromDestination, toDestination, transports }) => {
    const [value, setValue] = useState(transports.includes('Flight ✈️') ? 0 : transports.includes('Driving 🚗') ? 1 : 2);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const destinationDetails = fromDestination && toDestination && (
        <Box>
            <Typography
                gutterBottom
                variant='body2'
                sx={{
                    textAlign: { xs: 'left', md: 'right' },
                    fontWeight: 'bold',
                }}
            >
                {toDestination.popularity.review_count.toLocaleString('en-US')} reviews
            </Typography>
            <Typography
                gutterBottom
                variant='body2'
                sx={{
                    textAlign: { xs: 'left', md: 'right' },
                    fontWeight: 'bold',
                }}
            >
                Trend: {toDestination.popularity.avg_trend_val.toLocaleString('en-US')}
            </Typography>
            <Typography
                gutterBottom
                variant='body2'
                sx={{
                    textAlign: { xs: 'left', md: 'right' },
                    fontWeight: 'bold',
                }}
            >
                Population: {formatPopulation(toDestination.population)}
            </Typography>
            <Typography
                gutterBottom
                variant='body2'
                sx={{
                    textAlign: { xs: 'left', md: 'right' },
                    fontWeight: 'bold',
                }}
            >
                AQI: {parseInt(toDestination.aqi.aqi_val).toFixed(1)}
            </Typography>
            <Typography
                gutterBottom
                variant='body2'
                sx={{
                    textAlign: { xs: 'left', md: 'right' },
                    fontWeight: 'bold',
                }}
            >
                Distance: {calculateDistance(fromDestination, toDestination)} km
            </Typography>
        </Box>
    );

    return (
        fromDestination &&
        toDestination && (
            <Box sx={{ p: 3, boxShadow: 5, height: '70vh' }}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                        <Typography
                            gutterBottom
                            variant='h5'
                            sx={{
                                letterSpacing: '.1rem',
                                fontWeight: 'bold',
                                color: Colors.black,
                            }}
                        >
                            {toDestination.name}, {toDestination.country}
                        </Typography>
                    </Grid>

                    <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                        <Box>
                            <Box sx={{ borderColor: 'divider', mb: 3, overflowX: 'auto' }}>
                                <Tabs value={value} onChange={handleChange} aria-label='tabs'>
                                    <Tab label='Flight ✈️' />
                                    <Tab label='Driving 🚗' />
                                    <Tab label='Train 🚆' />
                                </Tabs>
                                {value === 0 && transports.includes('Flight ✈️') && (
                                    <FlightTable
                                        connections={fromDestination.connections_flight.filter((c) => c.to_id === toDestination.id)}
                                    ></FlightTable>
                                )}
                                {value === 1 && transports.includes('Driving 🚗') && (
                                    <DrivingTable
                                        connections={fromDestination.connections_driving.filter((c) => c.to_id === toDestination.id)}
                                    ></DrivingTable>
                                )}
                                {value === 2 && transports.includes('Train 🚆') && <div></div>}
                            </Box>
                            {/* <Box>
                                <Divider></Divider>
                                <Typography
                                    variant='body1'
                                    sx={{
                                        letterSpacing: '.1rem',
                                        fontWeight: 'bold',
                                        mt: 2,
                                    }}
                                >
                                    How would you rate this recommendation?
                                </Typography>
                                <StyledRating
                                    name='highlight-selected-only'
                                    defaultValue={5}
                                    IconContainerComponent={IconContainer}
                                    getLabelText={(value) => customIcons[value].label}
                                    highlightSelectedOnly
                                ></StyledRating>
                            </Box> */}
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        )
    );
};

export default MiscDestination;
