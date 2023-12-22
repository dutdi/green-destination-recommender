import React, { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Grid, CardMedia } from '@mui/material';
import {
    Box,
    Button,
    Card,
    CardContent,
    CardOverflow,
    Chip,
    Link,
    Typography,
    AccordionGroup,
    Accordion,
    AccordionDetails,
    AccordionSummary,
} from '@mui/joy';
import LandslideIcon from '@mui/icons-material/Landslide';
import Visibility from '@mui/icons-material/Visibility';
import InterestChips from '../custom/InterestChips.jsx';
import { interests } from '../../helpers/Lists.js';
import {
    findTrainConnectionWithMinCo2,
    findDrivingConnectionWithMinCo2,
    findFlightConnectionWithMinCo2,
    formatNumber,
    formatDuration,
} from '../../helpers/Functions.js';

const CityDrawerItem = ({ view, fromDestination, toDestination, month, sortedToDestinations, avgCo2AllConnections }) => {
    const [minCo2, setMinCo2] = useState(null);
    const [co2Offset, setCo2Offset] = useState(0);

    useEffect(() => {
        if (fromDestination && toDestination) {
            const trainConnectionWithMinCo2 = findTrainConnectionWithMinCo2(fromDestination, toDestination);
            const drivingConnectionWithMinCo2 = findDrivingConnectionWithMinCo2(fromDestination, toDestination);
            const flightConnectionWithMinCo2 = findFlightConnectionWithMinCo2(fromDestination, toDestination);

            const trainMinCo2 = trainConnectionWithMinCo2 ? trainConnectionWithMinCo2.co2_kg : Number.MAX_VALUE;
            const drivingMinCo2 = drivingConnectionWithMinCo2 ? drivingConnectionWithMinCo2.co2_kg : Number.MAX_VALUE;
            const flightMinCo2 = flightConnectionWithMinCo2 ? flightConnectionWithMinCo2.co2_kg : Number.MAX_VALUE;

            const minimum = Math.min(flightMinCo2, drivingMinCo2, trainMinCo2);
            const minCo2Obj =
                minimum === trainMinCo2
                    ? { mode: 'Train 🚉', co2: trainMinCo2, duration: formatDuration(trainConnectionWithMinCo2.duration_sec) }
                    : minimum === drivingMinCo2
                    ? { mode: 'Driving 🚗', co2: drivingMinCo2, duration: formatDuration(drivingConnectionWithMinCo2.duration_sec) }
                    : { mode: 'Flight 🛫', co2: flightMinCo2, duration: flightConnectionWithMinCo2.duration_str };

            setMinCo2(minCo2Obj);
        }
    }, [fromDestination, toDestination]);

    useEffect(() => {
        if (minCo2) {
            const co2Offset = parseInt((minCo2.co2 * 100) / avgCo2AllConnections - 100);
            setCo2Offset(co2Offset);
        }
    }, [minCo2, avgCo2AllConnections]);

    return (
        fromDestination &&
        toDestination &&
        minCo2 && (
            <Grid item xs={12} sm={12} md={12}>
                <Card
                    sx={{
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        position: 'relative',
                        cursor: 'pointer',
                    }}
                >
                    <CardMedia
                        component='div'
                        sx={{
                            pt: '56.25%',
                        }}
                        image={require(`../../media/misc/${toDestination.id}.jpg`)}
                    />
                    <CardContent sx={{ flexGrow: 1 }}>
                        <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', mt: 2, mb: 2 }}>
                            <Chip
                                variant='solid'
                                color='success'
                                size='sm'
                                sx={{
                                    borderRadius: 'sm',
                                    py: 0.25,
                                    px: 0.5,
                                }}
                            >
                                Green Recommended
                            </Chip>
                            <Link
                                level='body-xs'
                                underline='none'
                                startDecorator={<LandslideIcon />}
                                title='Seasonality'
                                sx={{
                                    fontWeight: 'md',
                                    ml: 'auto',
                                    color: 'text.secondary',
                                    '&:hover': { color: 'success.plainColor' },
                                }}
                            >
                                {parseInt(toDestination.seasonality[month])}
                            </Link>
                            <Link
                                level='body-xs'
                                underline='none'
                                startDecorator={<Visibility />}
                                title='Popularity'
                                sx={{
                                    fontWeight: 'md',
                                    color: 'text.secondary',
                                    '&:hover': { color: 'danger.plainColor' },
                                }}
                            >
                                {formatNumber(toDestination.popularity.review_count)}
                            </Link>
                        </Box>
                        <Typography
                            level='title-md'
                            sx={{ mt: 1, fontWeight: 'xl' }}
                            endDecorator={
                                <Chip component='span' size='sm' variant='soft' color={co2Offset < 0 ? 'success' : 'danger'}>
                                    {co2Offset > 0 && '+'}
                                    {co2Offset}% emission
                                </Chip>
                            }
                        >
                            {toDestination.name}, {toDestination.country} {toDestination.flag}
                        </Typography>
                        <Typography level='body-sm'>
                            {minCo2.mode} - {minCo2.duration} -{' '}
                            <Typography color='success'>
                                <b>{minCo2.co2} kg CO₂</b>
                            </Typography>{' '}
                        </Typography>
                        <Typography level='body-sm' sx={{ mt: 1 }}>
                            {toDestination.description}
                        </Typography>
                        <AccordionGroup sx={{ maxWidth: 400, mt: 1 }}>
                            <Accordion sx={{ border: '1px solid' }}>
                                <AccordionSummary>Interests</AccordionSummary>
                                <AccordionDetails>
                                    <InterestChips
                                        clickable={false}
                                        interests={interests.filter((i) => toDestination.interests.includes(i))}
                                    ></InterestChips>
                                </AccordionDetails>
                            </Accordion>
                        </AccordionGroup>
                    </CardContent>
                    <CardOverflow>
                        <Button
                            variant='solid'
                            color='primary'
                            size='lg'
                            component={RouterLink}
                            to='/details'
                            state={{
                                fromDestination: JSON.stringify(fromDestination),
                                toDestination: JSON.stringify(toDestination),
                                interests: JSON.stringify(interests),
                                month: month,
                                sortedToDestinations: JSON.stringify(sortedToDestinations),
                            }}
                        >
                            Interested
                        </Button>
                    </CardOverflow>
                </Card>
            </Grid>
        )
    );
};

export default CityDrawerItem;
