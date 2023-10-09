import React, { useState, useEffect } from 'react';
import { Typography, Grid, Box } from '@mui/material';
import BackgroundImage from '../media/background-image.jpg';
import UserInput from './UserInput.jsx';
import Overview from './Overview.jsx';
import DestinationAlbum from './DestinationAlbum';
import Demographics from './Demographics';
import { shuffleArray } from '../helpers/Functions.js';
import { Colors } from '../helpers/Colors.js';
import { getAllDestinations } from '../server/db.js';

const Landing = () => {
    const [destinations, setDestinations] = useState(null);

    useEffect(() => {
        getAllDestinations().then((destinations) => setDestinations(destinations));
    }, []);

    return (
        destinations && (
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
                                typography: { xs: 'caption', sm: 'h5', md: 'h4' },
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
                                typography: { xs: 'caption', sm: 'h6', md: 'h5' },
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
                <DestinationAlbum destinations={shuffleArray(destinations).slice(0, 8)}></DestinationAlbum>
            </Box>
        )
    );
};

export default Landing;
