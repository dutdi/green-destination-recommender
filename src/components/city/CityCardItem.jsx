import React from 'react';
import { AspectRatio, Box, Button, Card, CardContent, CardOverflow, Chip, Table, Sheet, Typography } from '@mui/joy';
import InterestChips from '../custom/InterestChips.jsx';
import { calculateOffset } from '../../helpers/Functions.js';

const CityCardItem = ({ index, id, city, country, flag, minCo2Mode, popularity, seasonality, interests, averages, sortBy }) => {
    const offset = calculateOffset(sortBy, averages, minCo2Mode.co2, popularity, seasonality);

    const generateOffsetLabel = (sortBy, offset) => {
        if (sortBy === 'emission') {
            return (
                <Chip component='span' size='sm' variant='soft' color={offset < 0 ? 'success' : 'danger'}>
                    {offset > 0 && '+'}
                    {offset}% emission
                </Chip>
            );
        } else if (sortBy === 'popularity') {
            return (
                <Chip component='span' size='sm' variant='soft' color={offset < 0 ? 'danger' : 'success'}>
                    {offset > 0 && '+'}
                    {offset}% popular
                </Chip>
            );
        } else if (sortBy === 'seasonality') {
            return (
                <Chip component='span' size='sm' variant='soft' color={offset < 0 ? 'danger' : 'success'}>
                    {offset > 0 && '+'}
                    {offset}% seasonal
                </Chip>
            );
        }
    };

    const generateHighlight = (sortBy) => {
        if (sortBy === 'emission') {
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
                        Green Recommended
                    </Chip>
                )
            );
        } else if (sortBy === 'popularity') {
            return (
                index < 4 && (
                    <Chip
                        variant='solid'
                        color='primary'
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
                        Hidden Gem
                    </Chip>
                )
            );
        } else if (sortBy === 'seasonality') {
            return (
                index < 4 && (
                    <Chip
                        variant='solid'
                        color='danger'
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
                        Monthly Seasonal Demand
                    </Chip>
                )
            );
        }
    };

    return (
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
                        <img src={require(`../../media/misc/${id}.jpg`)} loading='lazy' alt='city' />
                    </AspectRatio>
                    {generateHighlight(sortBy)}
                    <Chip
                        variant='solid'
                        color='warning'
                        size='lg'
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
                <Typography level='title-md' sx={{ mt: 1, fontWeight: 'xl' }} endDecorator={generateOffsetLabel(sortBy, offset)}>
                    {city}, {country} {flag}
                </Typography>
                <Typography level='body-sm'>
                    {minCo2Mode.mode} - {minCo2Mode.duration} -{' '}
                    <Typography color='success'>
                        <b>{minCo2Mode.co2} kg CO₂</b>
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
                                <td>{minCo2Mode.co2} kg CO₂</td>
                                <td>{popularity} / 100</td>
                                <td> {seasonality} / 100</td>
                            </tr>
                        </tbody>
                    </Table>
                </Sheet>
                <InterestChips interests={interests}></InterestChips>
            </CardContent>
            <CardOverflow>
                <Button variant='solid' color='primary' size='lg'>
                    Interested
                </Button>
            </CardOverflow>
        </Card>
    );
};

export default CityCardItem;
