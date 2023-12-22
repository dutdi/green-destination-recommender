import React, { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
    AspectRatio,
    Stack,
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
        minCo2 &&
        (view === 'map' ? (
            <Card
                variant='outlined'
                orientation='horizontal'
                sx={{
                    bgcolor: 'neutral.softBg',
                    display: 'flex',
                    flexDirection: { xs: 'column', sm: 'row' },
                    '&:hover': {
                        boxShadow: 'lg',
                        borderColor: 'var(--joy-palette-neutral-outlinedDisabledBorder)',
                    },
                }}
            >
                <CardOverflow
                    sx={{
                        mr: { xs: 'var(--CardOverflow-offset)', sm: 0 },
                        mb: { xs: 0, sm: 'var(--CardOverflow-offset)' },
                        '--AspectRatio-radius': {
                            xs: 'calc(var(--CardOverflow-radius) - var(--variant-borderWidth, 0px)) calc(var(--CardOverflow-radius) - var(--variant-borderWidth, 0px)) 0 0',
                            sm: 'calc(var(--CardOverflow-radius) - var(--variant-borderWidth, 0px)) 0 0 calc(var(--CardOverflow-radius) - var(--variant-borderWidth, 0px))',
                        },
                    }}
                >
                    <AspectRatio
                        ratio='1'
                        flex
                        sx={{
                            minWidth: { sm: 120, md: 160 },
                            '--AspectRatio-maxHeight': { xs: '160px', sm: '9999px' },
                        }}
                    >
                        <img alt='' src={require(`../../media/misc/${toDestination.id}.jpg`)} />
                        <Stack alignItems='center' direction='row' sx={{ position: 'absolute', top: 0, width: '100%', p: 1 }}>
                            <Chip variant='soft' color='success' size='sm'>
                                Green Recommended
                            </Chip>
                        </Stack>
                    </AspectRatio>
                </CardOverflow>
                <CardContent>
                    <Stack spacing={1} direction='row' justifyContent='space-between' alignItems='flex-start'>
                        <div>
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
                        </div>
                    </Stack>
                    <Stack spacing='0.25rem 1rem' direction='row' useFlexGap flexWrap='wrap' sx={{ my: 0.25 }}>
                        <AccordionGroup sx={{ maxWidth: 300 }}>
                            <Accordion>
                                <AccordionSummary>Interests</AccordionSummary>
                                <AccordionDetails>
                                    <InterestChips
                                        clickable={false}
                                        interests={interests.filter((i) => {
                                            return toDestination.interests.some((j) => Object.keys(j)[0] === i.name);
                                        })}
                                    ></InterestChips>
                                </AccordionDetails>
                            </Accordion>
                        </AccordionGroup>
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
                    </Stack>
                    <Stack direction='row' sx={{ mt: 'auto' }}>
                        <Typography level='body-sm'>
                            {minCo2.mode} - {minCo2.duration}
                        </Typography>
                        <Typography level='title-lg' color='success' sx={{ flexGrow: 1, textAlign: 'right' }}>
                            <b>{minCo2.co2} kg CO₂</b>
                        </Typography>
                    </Stack>
                </CardContent>
            </Card>
        ) : (
            <Card
                sx={{
                    width: 320,
                    minHeight: 420,
                    maxWidth: '100%',
                    boxShadow: 'lg',
                }}
            >
                <CardOverflow>
                    <AspectRatio sx={{ minWidth: 200 }}>
                        <img src={require(`../../media/misc/${toDestination.id}.jpg`)} loading='lazy' alt='city' />
                    </AspectRatio>
                </CardOverflow>
                <CardContent>
                    <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
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
        ))
    );
};

export default CityCardItem;
