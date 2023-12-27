import React, { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { AspectRatio, Box, Button, Card, CardContent, CardOverflow, Chip, Table, Sheet, Typography } from '@mui/joy';
import InterestChips from '../custom/InterestChips.jsx';
import { interests } from '../../helpers/Lists.js';
import {
    findTrainConnectionWithMinCo2,
    findDrivingConnectionWithMinCo2,
    findFlightConnectionWithMinCo2,
    formatDuration,
} from '../../helpers/Functions.js';

const CityCardItem = ({ view, fromDestination, toDestination, month, sortedToDestinations, avgCo2AllConnections }) => {
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
            <Card
                sx={{
                    width: 320,
                    minHeight: 470,
                    maxWidth: '100%',
                    boxShadow: 'lg',
                }}
            >
                <CardOverflow>
                    <Box sx={{ position: 'relative' }}>
                        <AspectRatio sx={{ minWidth: 200 }}>
                            <img src={require(`../../media/misc/${toDestination.id}.jpg`)} loading='lazy' alt='city' />
                        </AspectRatio>
                        <Chip
                            variant='solid'
                            color='success'
                            size='sm'
                            sx={{
                                position: 'absolute',
                                top: 8,
                                left: -8,
                                borderRadius: 'sm',
                                py: 0.25,
                                px: 0.5,
                            }}
                        >
                            Green Recommended
                        </Chip>
                        <Chip
                            variant='solid'
                            color='success'
                            size='md'
                            sx={{
                                position: 'absolute',
                                top: 8,
                                right: -8,
                                borderRadius: 'sm',
                                py: 0.25,
                                px: 0.5,
                            }}
                        >
                            7.8
                        </Chip>
                    </Box>
                </CardOverflow>
                <CardContent>
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
                    <Sheet variant='soft' sx={{ pt: 1 }}>
                        <Table borderAxis='none' variant='plain' color='neutral' size='sm' stickyHeader sx={{ textAlign: 'center' }}>
                            <thead>
                                <tr>
                                    <th style={{ textAlign: 'center' }}>Emission</th>
                                    <th style={{ textAlign: 'center' }}>Popularity</th>
                                    <th style={{ textAlign: 'center' }}>Seasonality</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>{minCo2.co2} kg CO₂</td>
                                    <td>82 / 100</td>
                                    <td> {parseInt(toDestination.seasonality[month])} / 100</td>
                                </tr>
                            </tbody>
                        </Table>
                    </Sheet>
                    <InterestChips interests={interests.filter((i) => toDestination.interests.includes(i)).slice(0, 5)}></InterestChips>
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
        )
    );
};

export default CityCardItem;
