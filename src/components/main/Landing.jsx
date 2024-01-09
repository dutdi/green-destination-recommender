import React from 'react';
import { Typography, Grid, Paper } from '@mui/material';
import BackgroundImage from '../../media/background-image.jpg';
import UserInput from './UserInput.jsx';
import Overview from './Overview.jsx';
import Demographics from './Demographics';
import { Colors } from '../../helpers/Colors.js';

const Landing = () => {
    return (
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
                    filter: 'brightness(0.9)',
                }}
            >
                <Grid item>
                    <Typography
                        sx={{
                            typography: { xs: 'body1', sm: 'h5', md: 'h4' },
                            textAlign: 'center',
                            color: Colors.black,
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                        }}
                        gutterBottom
                    >
                        Discover Your Sustainable Path
                    </Typography>
                    <Typography
                        sx={{
                            typography: { xs: 'body2', sm: 'h6', md: 'h5' },
                            textAlign: 'center',
                            color: Colors.black,
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                        }}
                    >
                        to the Future of Eco-Conscious Travel
                    </Typography>
                </Grid>
                <Grid container item>
                    <UserInput />
                </Grid>
            </Grid>
            <Demographics></Demographics>
            <Overview></Overview>
        </Paper>
    );
};

export default Landing;
