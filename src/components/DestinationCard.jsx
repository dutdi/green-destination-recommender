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
        <Grid item xs={12} sm={6} md={4}>
            <Card
                sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    position: 'relative',
                    cursor: 'pointer',
                }}
                onClick={toggleDetail}
            >
                <CardMedia
                    component='div'
                    sx={{
                        pt: '56.25%',
                    }}
                    image={require(`../media/misc/${destination.id}.jpg`)}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant='h5' component='h2'>
                        {destination.name}, {destination.country}
                    </Typography>
                    <Typography>{destination.description}</Typography>
                </CardContent>
                {/* TODO - set the value of avg rating and number of rating*/}
                <Box display='flex' justifyContent='space-between' alignItems='center' p={2} bgcolor={Colors.gray}>
                    <div>
                        <Rating name={`rating-${destination.id}`} value={4.5} precision={0.5} readOnly />
                    </div>
                    <div>
                        <Typography variant='body2' color='textSecondary'>
                            ({213} ratings)
                        </Typography>
                    </div>
                </Box>
            </Card>
            {isDetailOpen && <DestinationPanel destination={destination} onClose={toggleDetail} />}
        </Grid>
    );
};

export default DestinationCard;
