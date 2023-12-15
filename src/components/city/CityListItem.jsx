import React, { useState, useEffect } from 'react';
import { Typography, Card, CardHeader, CardMedia, CardContent, CardActions, IconButton, Divider } from '@mui/material';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import FlightRouteDetails from '../route/FlightRouteDetails';
import DrivingRouteDetails from '../route/DrivingRouteDetails';
import { findTrainConnectionWithMinCo2, findDrivingConnectionWithMinCo2, findFlightConnectionWithMinCo2 } from '../../helpers/Functions.js';
import { Colors } from '../../helpers/Colors.js';

const CityListItem = ({ fromDestination, toDestination, clickedToDestination, handleClickedToDestination, avgCo2AllConnections }) => {
    const [transportMode, setTransportMode] = useState(-1); // 0: train, 1: driving 2: flight
    const [numOfModes, setNumOfModes] = useState(-1);
    const [trainMinCo2, setTrainMinCo2] = useState(-1);
    const [drivingMinCo2, setDrivingMinCo2] = useState(-1);
    const [flightMinCo2, setFlightMinCo2] = useState(-1);
    const [currentCo2, setCurrentCo2] = useState(-1);
    const [co2Offset, setCo2Offset] = useState(0);

    useEffect(() => {
        if (fromDestination && toDestination) {
            const trainConnectionWithMinCo2 = findTrainConnectionWithMinCo2(fromDestination, toDestination);
            const drivingConnectionWithMinCo2 = findDrivingConnectionWithMinCo2(fromDestination, toDestination);
            const flightConnectionWithMinCo2 = findFlightConnectionWithMinCo2(fromDestination, toDestination);

            trainConnectionWithMinCo2 && setTrainMinCo2(trainConnectionWithMinCo2.co2_kg);
            drivingConnectionWithMinCo2 && setDrivingMinCo2(drivingConnectionWithMinCo2.co2_kg);
            flightConnectionWithMinCo2 && setFlightMinCo2(flightConnectionWithMinCo2.co2_kg);

            const minimum = Math.min(
                flightConnectionWithMinCo2 && flightConnectionWithMinCo2.co2_kg,
                drivingConnectionWithMinCo2 && drivingConnectionWithMinCo2.co2_kg,
                trainConnectionWithMinCo2 && trainConnectionWithMinCo2.co2_kg
            );
            const numOfModes =
                (flightConnectionWithMinCo2 ? 1 : 0) + (drivingConnectionWithMinCo2 ? 1 : 0) + (trainConnectionWithMinCo2 ? 1 : 0);
            setNumOfModes(numOfModes);
            setTransportMode(minimum === trainConnectionWithMinCo2.co2_kg ? 0 : minimum === drivingConnectionWithMinCo2.co2_kg ? 1 : 2);
        }
    }, []);

    useEffect(() => {
        setCurrentCo2(transportMode === 0 ? trainMinCo2 : transportMode === 1 ? drivingMinCo2 : flightMinCo2);
        const co2Offset = parseInt((currentCo2 * 100) / avgCo2AllConnections - 100);
        setCo2Offset(co2Offset);
    }, [transportMode, currentCo2]);

    const handleClicked = () => {
        handleClickedToDestination(toDestination);
    };

    const handleBack = () => {
        setTransportMode(transportMode - 1);
    };

    const handleNext = () => {
        setTransportMode(transportMode + 1);
    };

    return (
        <Card
            sx={{
                boxShadow: clickedToDestination ? '0px 0px 15px 5px rgba(123, 0, 0, 1)' : '0px 0px 5px 1px rgba(0, 0, 0, 0.1)',
                transition: 'box-shadow 0.3s ease-in-out',
                cursor: 'pointer',
            }}
            onClick={() => handleClicked()}
        >
            <CardHeader
                titleTypographyProps={{ variant: 'h6' }}
                title={`${toDestination.name},  ${toDestination.country} ${toDestination.flag}`}
                subheader={
                    <Typography variant='body2' color={co2Offset > 0 ? Colors.red : Colors.green}>
                        <b>
                            {co2Offset > 0 && '+'}
                            {co2Offset}% CO₂ emission
                        </b>{' '}
                    </Typography>
                }
            />
            <CardMedia
                component='img'
                height='164'
                image={require(`../../media/misc/${toDestination.id}.jpg`)}
                sx={{ objectFit: 'cover' }}
            />
            <CardContent sx={{ display: 'flex', justifyContent: 'space-around' }}>
                <IconButton aria-label='left' disabled={numOfModes === 1 || transportMode === 0}>
                    <KeyboardArrowLeft onClick={() => handleBack()} sx={{ fontWeight: 'bold' }} />
                </IconButton>
                {transportMode === 0 && (
                    <FlightRouteDetails fromDestination={fromDestination} toDestination={toDestination}></FlightRouteDetails>
                )}
                {transportMode === 1 && (
                    <DrivingRouteDetails fromDestination={fromDestination} toDestination={toDestination}></DrivingRouteDetails>
                )}
                <IconButton aria-label='right' disabled={numOfModes === 1 || transportMode === 1}>
                    <KeyboardArrowRight onClick={() => handleNext()} sx={{ fontWeight: 'bold' }} />
                </IconButton>
            </CardContent>
            <Divider sx={{ m: 1 }} />
            <CardActions disableSpacing sx={{ justifyContent: 'flex-end' }}>
                <div>
                    <Typography variant='body1' sx={{ fontWeight: 'bold', color: Colors.green }}>
                        {currentCo2} kg CO₂
                    </Typography>
                </div>
            </CardActions>
        </Card>
    );
};

export default CityListItem;
