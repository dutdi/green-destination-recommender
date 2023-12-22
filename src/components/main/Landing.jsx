import React from 'react';
import { Typography, Grid, Paper } from '@mui/material';
import BackgroundImage from '../../media/background-image.jpg';
import UserInput from './UserInput.jsx';
import Overview from './Overview.jsx';
import CityAlbum from '../city/CityAlbum.jsx';
import Demographics from './Demographics';
import { shuffleArray } from '../../helpers/Functions.js';
import { Colors } from '../../helpers/Colors.js';
import { useData } from './DataContext';

const Landing = () => {
    const { destinations, dataFetched } = useData();

    return (
        dataFetched && (
            <Paper>
                <Grid
                    container
                    direction='column'
                    justifyContent='space-around'
                    alignItems='center'
                    sx={{
                        backgroundImage: `url(${BackgroundImage})`,
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: 'cover',
                        height: '70vh',
                        mt: 1,
                    }}
                >
                    <Grid item>
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
                    <Grid container item>
                        <UserInput />
                    </Grid>
                </Grid>
                <Demographics></Demographics>
                <Overview></Overview>
                <CityAlbum title='Popular Destinations' destinations={shuffleArray(destinations).slice(0, 6)}></CityAlbum>
            </Paper>
        )
    );
};

export default Landing;
