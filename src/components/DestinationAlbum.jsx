import * as React from 'react';
import { Container, Grid, Card, CardActions, CardContent, CardMedia, Button, Typography } from '@mui/material';
import { Destinations } from '../helpers/Destinations.js';
import { shuffleArray } from '../helpers/Functions.js';

const DestinationAlbum = () => {
    const destinations = shuffleArray(Destinations).slice(0, 8);
    return (
        <Container sx={{ py: 6 }} maxWidth='lg'>
            <Typography
                gutterBottom
                variant='h4'
                component='h3'
                sx={{
                    mb: 4,
                    letterSpacing: '.1rem',
                }}
            >
                Popular destinations
            </Typography>

            <Grid container spacing={4}>
                {destinations.map((destination) => (
                    <Grid item key={destination.id} xs={12} sm={6} md={3}>
                        <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
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
                            <CardActions>
                                <Button size='small'>Interested</Button>
                                <Button size='small'>Hide</Button>
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};
export default DestinationAlbum;
