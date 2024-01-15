import React from 'react';
import { AspectRatio, Box, Button, Card, CardContent, CardOverflow, Chip, Table, Sheet, Typography, Tooltip } from '@mui/joy';
import DiamondIcon from '@mui/icons-material/Diamond';
import AutoGraphIcon from '@mui/icons-material/AutoGraph';
import FmdBadIcon from '@mui/icons-material/FmdBad';
import ReportGmailerrorredIcon from '@mui/icons-material/ReportGmailerrorred';
import { PiLeafFill } from 'react-icons/pi';
import { IoMdCheckmark } from 'react-icons/io';
import PersonIcon from '@mui/icons-material/Person';
import PeopleIcon from '@mui/icons-material/People';
import GroupsIcon from '@mui/icons-material/Groups';
import InterestChips from '../custom/InterestChips.jsx';
import { calculateOffset, getPopularityIndex, getSeasonalityIndex } from '../../helpers/Functions.js';
import { calculateOverallScore } from '../../helpers/SF.js';
import { Colors } from '../../helpers/Colors.js';

const CityCardItem = ({ index, fromDestination, toDestination, month, minCo2Mode, averages, sortBy, clicked, onItemClicked }) => {
    const offset = calculateOffset(
        'emission',
        averages,
        minCo2Mode.co2,
        toDestination.popularity.popularity_score,
        toDestination.seasonality[month]
    );

    const generateHighlight = (sortBy) => {
        let label = '';
        if (sortBy === 'overall') {
            label = 'Green Recommended';
        } else if (sortBy === 'emission') {
            label = 'Lowest Emission';
        } else if (sortBy === 'popularity') {
            label = 'Hidden Gem';
        } else if (sortBy === 'seasonality') {
            label = 'Least Crowded';
        }
        return (
            index < 4 && (
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
                    {label}
                </Chip>
            )
        );
    };

    const generateEmissionLabel = (offset) => {
        return (
            <Chip component='span' size='sm' variant='soft' color={offset < 0 ? 'success' : 'danger'}>
                {offset > 0 && '+'}
                {offset}% CO₂e
            </Chip>
        );
    };

    const generatePopularityLabel = (popularityScore) => {
        const popIndex = getPopularityIndex(popularityScore);
        switch (popIndex) {
            case 0:
                return (
                    <Typography
                        justifyContent='center'
                        level='body-xs'
                        color='success'
                        startDecorator={<DiamondIcon sx={{ color: 'success' }} />}
                    >
                        Rare Find
                    </Typography>
                );
            case 1:
                return (
                    <Typography
                        justifyContent='center'
                        level='body-xs'
                        color='warning'
                        startDecorator={<AutoGraphIcon sx={{ color: 'warning' }} />}
                    >
                        Rising
                    </Typography>
                );
            case 2:
                return (
                    <Typography
                        sx={{ color: Colors.brown }}
                        justifyContent='center'
                        level='body-xs'
                        startDecorator={<FmdBadIcon sx={{ color: 'warning' }} />}
                    >
                        Traffic
                    </Typography>
                );
            case 3:
                return (
                    <Typography
                        justifyContent='center'
                        level='body-xs'
                        color='danger'
                        startDecorator={<ReportGmailerrorredIcon sx={{ color: 'error' }} />}
                    >
                        Hotspot
                    </Typography>
                );
            default:
                return (
                    <Typography justifyContent='center' level='body-xs' color='neutral'>
                        No data
                    </Typography>
                );
        }
    };

    const generateSeasonalityLabel = (seasonalityScore) => {
        const seasonalityIndex = getSeasonalityIndex(seasonalityScore);
        switch (seasonalityIndex) {
            case 0:
                return (
                    <Typography
                        justifyContent='center'
                        level='body-xs'
                        color='success'
                        startDecorator={<PiLeafFill sx={{ color: 'green' }} />}
                    >
                        Quiet
                    </Typography>
                );
            case 1:
                return (
                    <Typography
                        justifyContent='center'
                        level='body-xs'
                        color='warning'
                        startDecorator={<PersonIcon sx={{ color: 'warning' }} />}
                    >
                        Off-Peak
                    </Typography>
                );
            case 2:
                return (
                    <Typography
                        sx={{ color: Colors.brown }}
                        justifyContent='center'
                        level='body-xs'
                        startDecorator={<PeopleIcon sx={{ color: 'warning' }} />}
                    >
                        Busy
                    </Typography>
                );
            case 3:
                return (
                    <Typography
                        justifyContent='center'
                        level='body-xs'
                        color='danger'
                        startDecorator={<GroupsIcon sx={{ color: 'error' }} />}
                    >
                        Crowded
                    </Typography>
                );
            default:
                return (
                    <Typography justifyContent='center' level='body-xs' color='neutral'>
                        No data
                    </Typography>
                );
        }
    };

    const overallScore = calculateOverallScore(fromDestination, toDestination, month);

    return (
        <Card
            sx={{
                width: 320,
                minHeight: 480,
                maxWidth: '100%',
                boxShadow: 'lg',
            }}
        >
            <CardOverflow>
                <Box sx={{ position: 'relative' }}>
                    <AspectRatio sx={{ minWidth: 200 }}>
                        <img src={require(`../../media/misc/${toDestination.id}.jpg`)} loading='lazy' alt='city' />
                    </AspectRatio>
                    {generateHighlight(sortBy)}
                    <Tooltip color='neutral' placement='top' variant='soft' title='Overall score'>
                        <Chip
                            variant='solid'
                            color='neutral'
                            size='lg'
                            sx={{
                                position: 'absolute',
                                top: 8,
                                right: -8,
                                borderRadius: 'sm',
                                px: 1,
                                py: 0.5,
                            }}
                        >
                            {overallScore}
                        </Chip>
                    </Tooltip>
                </Box>
            </CardOverflow>
            <CardContent>
                <Typography level='title-md' sx={{ mt: 1, fontWeight: 'xl' }}>
                    {toDestination.name}, {toDestination.country} {toDestination.flag}
                </Typography>
                <Typography level='body-sm'>
                    {minCo2Mode.mode} - {minCo2Mode.duration} -{' '}
                    <Typography color='success'>
                        <b>{minCo2Mode.co2} kg CO₂</b>
                    </Typography>{' '}
                </Typography>
                <Sheet variant='soft' sx={{ mt: 1 }}>
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
                                <td>{generateEmissionLabel(offset)}</td>
                                <td>{generatePopularityLabel(toDestination.popularity.popularity_score)} </td>
                                <td>{generateSeasonalityLabel(toDestination.seasonality[month])}</td>
                            </tr>
                        </tbody>
                    </Table>
                </Sheet>
                <InterestChips interests={toDestination.interests}></InterestChips>
            </CardContent>
            <CardOverflow>
                <Button
                    variant='solid'
                    size='lg'
                    color={clicked ? 'success' : 'primary'}
                    onClick={onItemClicked}
                    startDecorator={clicked && <IoMdCheckmark style={{ color: 'white' }} />}
                >
                    {clicked ? 'Interested' : 'Mark as Interested'}
                </Button>
            </CardOverflow>
        </Card>
    );
};

export default CityCardItem;
