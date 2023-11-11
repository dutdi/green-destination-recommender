import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Grid, Typography } from '@mui/material';
import { Nudges } from '../helpers/Nudges.js';
import RecommendationWindow from './RecommendationWindow';
import { getRandomXElementsFromArray } from '../helpers/Functions.js';
import { useData } from './DataContext';

const Recommendations = () => {
    // const params = useParams();
    const { destinations, dataFetched } = useData();
    const [recommendationWindows, setRecommendationWindows] = useState([]);

    useEffect(() => {
        if (dataFetched) {
            const temp = destinations.redDestinations[0];

            setRecommendationWindows([
                {
                    nudge: Nudges[0],
                    destinations: getRandomXElementsFromArray(temp.nudge1, 3),
                },
                {
                    nudge: Nudges[1],
                    destinations: getRandomXElementsFromArray(temp.nudge2, 3),
                },
                {
                    nudge: Nudges[2],
                    destinations: getRandomXElementsFromArray(temp.nudge3, 3),
                },
            ]);
        }
    }, [dataFetched, destinations]);

    return (
        dataFetched && (
            <Container sx={{ py: 6, mb: 6 }} maxWidth='lg'>
                <Typography
                    gutterBottom
                    variant='h5'
                    sx={{
                        mb: 4,
                        letterSpacing: '.2rem',
                        fontWeight: 'bold',
                    }}
                >
                    Top Sustainable Travel Recommendations: Your Guide to Green Adventures
                </Typography>

                <Grid container direction='column' justifyContent='space-evenly' alignItems='center'>
                    {recommendationWindows.map((recommendationWindow) => (
                        <RecommendationWindow recommendationWindow={recommendationWindow}></RecommendationWindow>
                    ))}
                </Grid>
            </Container>
        )
    );
};

export default Recommendations;
