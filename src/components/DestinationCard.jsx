import React, { useState } from 'react';
import { Grid, Card, CardContent, CardMedia, Typography, Rating, Box } from '@mui/material';
import DestinationPanel from './DestinationPanel';
import { Colors } from '../helpers/Colors.js';

const DestinationCard = ({ destination }) => {
    const [isDetailOpen, setIsDetailOpen] = useState(false);

    const toggleDetail = () => {
        setIsDetailOpen(!isDetailOpen);
    };

    return (
        <Grid item xs={12} sm={6} md={3}>
            <Card
                sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    position: 'relative',
                }}
                onClick={toggleDetail}
            >
                <CardMedia
                    component='div'
                    sx={{
                        pt: '56.25%',
                    }}
                    image={destination.imgPath}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant='h5' component='h2'>
                        {destination.name}
                    </Typography>
                    <Typography>{destination.description}</Typography>
                </CardContent>
                <Box display='flex' justifyContent='space-between' alignItems='center' p={2} bgcolor={Colors.gray}>
                    <div>
                        <Rating name={`rating-${destination.id}`} value={destination.avgRating} precision={0.5} readOnly />
                    </div>
                    <div>
                        <Typography variant='body2' color='textSecondary'>
                            ({destination.numOfRatings} ratings)
                        </Typography>
                    </div>
                </Box>
            </Card>
            {isDetailOpen && <DestinationPanel destination={destination} onClose={toggleDetail} />}
        </Grid>
    );
};

export default DestinationCard;
