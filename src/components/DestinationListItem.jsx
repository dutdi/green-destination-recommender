import React, { useState, useEffect } from 'react';
import { Box, Grid, Divider, Typography, Button, MobileStepper } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import FlightRouteDetails from './FlightRouteDetails';
import DrivingRouteDetails from './DrivingRouteDetails';
import { findFlightConnectionWithMinCo2, findDrivingConnectionWithMinCo2 } from '../helpers/Functions.js';

const DestinationListItem = ({ fromDestination, toDestination, clickedToDestination, handleClickedToDestination }) => {
    const theme = useTheme();
    const [transportMode, setTransportMode] = useState(-1); // 0: flight, 1: driving
    const [numOfModes, setNumOfModes] = useState(-1);
    const [flightMinCo2, setFlightMinCo2] = useState(-1);
    const [drivingMinCo2, setDrivingMinCo2] = useState(-1);

    useEffect(() => {
        if (fromDestination && toDestination) {
            const flightConnectionWithMinCo2 = findFlightConnectionWithMinCo2(fromDestination, toDestination);
            const drivingConnectionWithMinCo2 = findDrivingConnectionWithMinCo2(fromDestination, toDestination);
            flightConnectionWithMinCo2 && setFlightMinCo2(parseInt(flightConnectionWithMinCo2.details.co2_kg));
            drivingConnectionWithMinCo2 && setDrivingMinCo2(parseInt(drivingConnectionWithMinCo2.estd_emissions_osrm_gm));

            if (flightConnectionWithMinCo2 && drivingConnectionWithMinCo2) {
                setNumOfModes(2);
                if (flightMinCo2 < drivingMinCo2) {
                    setTransportMode(0);
                } else {
                    setTransportMode(1);
                }
            } else if (flightConnectionWithMinCo2) {
                setNumOfModes(1);
                setTransportMode(0);
            } else if (drivingConnectionWithMinCo2) {
                setNumOfModes(1);
                setTransportMode(1);
            }
        }
    }, [drivingMinCo2, flightMinCo2]);

    const handleClicked = () => {
        handleClickedToDestination(toDestination);
    };

    const handleNext = () => {
        setTransportMode(transportMode + 1);
    };

    const handleBack = () => {
        setTransportMode(transportMode - 1);
    };

    return (
        fromDestination &&
        toDestination &&
        numOfModes > 0 && (
            <Box
                sx={{
                    p: 2,
                    boxShadow: clickedToDestination ? '0px 0px 15px 5px rgba(123, 0, 0, 1)' : '0px 0px 5px 1px rgba(0, 0, 0, 0.1)',
                    transition: 'box-shadow 0.3s ease-in-out',
                    cursor: 'pointer',
                }}
                onClick={() => handleClicked()}
            >
                <Grid container spacing={2}>
                    <Grid item xs={12} md={5}>
                        <Box
                            component='img'
                            src={require(`../media/misc/${toDestination.id}.jpg`)}
                            loading='lazy'
                            sx={{
                                width: '100%',
                                height: { xs: '100%', md: '200px' },
                                objectFit: 'cover',
                                borderRadius: '8px',
                            }}
                        ></Box>
                    </Grid>
                    <Grid item xs={12} md={7}>
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'left',
                                justifyContent: 'space-around',
                                height: '100%',
                            }}
                        >
                            <Typography variant='h6' gutterBottom>
                                {toDestination.name}, {toDestination.country}
                            </Typography>
                            <Divider></Divider>
                            <Box
                                sx={{
                                    height: '70%',
                                    display: 'flex',
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                            >
                                {transportMode === 0 && (
                                    <FlightRouteDetails
                                        fromDestination={fromDestination}
                                        toDestination={toDestination}
                                    ></FlightRouteDetails>
                                )}
                                {transportMode === 1 && (
                                    <DrivingRouteDetails
                                        fromDestination={fromDestination}
                                        toDestination={toDestination}
                                    ></DrivingRouteDetails>
                                )}
                            </Box>
                            <Box>
                                <Divider></Divider>
                                <MobileStepper
                                    variant='dots'
                                    steps={numOfModes}
                                    position='static'
                                    activeStep={transportMode}
                                    sx={{ maxWidth: 400, flexGrow: 1 }}
                                    nextButton={
                                        <Button
                                            size='small'
                                            onClick={() => handleNext()}
                                            disabled={numOfModes === 1 || transportMode === 1}
                                        >
                                            Next
                                            {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
                                        </Button>
                                    }
                                    backButton={
                                        <Button
                                            size='small'
                                            onClick={() => handleBack()}
                                            disabled={numOfModes === 1 || transportMode === 0}
                                        >
                                            {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
                                            Back
                                        </Button>
                                    }
                                />
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        )
    );
};

export default DestinationListItem;
