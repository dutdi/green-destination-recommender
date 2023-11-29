import React from 'react';
import { Typography, Grid, Box } from '@mui/material';
import BackgroundImage from '../media/background-image.jpg';
import UserInput from './UserInput.jsx';
import Overview from './Overview.jsx';
import DestinationAlbum from './DestinationAlbum';
import Demographics from './Demographics';
import { shuffleArray } from '../helpers/Functions.js';
import { Colors } from '../helpers/Colors.js';
import { useData } from './DataContext';

const Landing = () => {
    const { destinations, dataFetched } = useData();

    return (
        dataFetched && (
            <Box>
                <Grid
                    container
                    direction='row'
                    justifyContent='flex-start'
                    alignItems='center'
                    sx={{
                        backgroundImage: `url(${BackgroundImage})`,
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: 'cover',
                        height: '70vh',
                        mt: 1,
                        position: 'relative',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <Grid item xs={8} sm={8} md={8}>
                        <Typography
                            sx={{
                                typography: { xs: 'body1', sm: 'h5', md: 'h4' },
                                textAlign: 'center',
                                color: Colors.white,
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                            }}
                            gutterBottom
                        >
                            Uncover Sustainable Paradises
                        </Typography>
                        <Typography
                            sx={{
                                typography: { xs: 'body2', sm: 'h6', md: 'h5' },
                                textAlign: 'center',
                                color: Colors.white,
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                            }}
                        >
                            Where Conservation Meets Adventure
                        </Typography>
                    </Grid>
                    <Grid item xs={10} sm={10} md={10}>
                        <UserInput />
                    </Grid>
                </Grid>
                <Demographics></Demographics>
                <Overview></Overview>
                {/* TODO - it should be sustainableDestinations*/}
                <DestinationAlbum
                    title='Popular Destinations'
                    destinations={shuffleArray(destinations.miscDestinations).slice(0, 6)}
                ></DestinationAlbum>
            </Box>
        )
    );
};

export default Landing;
