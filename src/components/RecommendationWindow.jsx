import React from 'react';
import { Grid } from '@mui/material';
import DestinationAlbum from './DestinationAlbum';

const RecommendationWindow = ({ recommendationWindow }) => {
    return (
        <Grid item xs={12} sm={12} md={12}>
            <DestinationAlbum
                title={recommendationWindow.nudge.messages[0].title}
                text={recommendationWindow.nudge.messages[0].text}
                destinations={recommendationWindow.destinations}
            ></DestinationAlbum>
        </Grid>
    );
};

export default RecommendationWindow;
