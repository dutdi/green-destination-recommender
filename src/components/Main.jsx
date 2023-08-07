import * as React from 'react';
import { Typography, Grid } from '@mui/material';
import BackgroundImage from '../media/background-image.jpg';
import UserInput from './UserInput.jsx';
import { Colors } from '../helpers/Colors.js';

const Main = () => {
    return (
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
    );
};

export default Main;
