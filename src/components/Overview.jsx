import React from 'react';
import { Grid, Paper, Typography, Container } from '@mui/material';
import TravelExploreTwoToneIcon from '@mui/icons-material/TravelExploreTwoTone';
import RecyclingIcon from '@mui/icons-material/Recycling';
import RecommendIcon from '@mui/icons-material/Recommend';
import { Colors } from '../helpers/Colors.js';

const Overview = () => {
    return (
        <Container sx={{ py: 4 }} maxWidth='lg'>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={12} md={4}>
                    <Paper
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            padding: '16px',
                            height: '100%',
                            textAlign: 'center',
                            boxShadow: 'none',
                        }}
                    >
                        <TravelExploreTwoToneIcon style={{ fontSize: '40px', marginBottom: '16px', color: Colors.blue }} />
                        <Typography variant='h6' style={{ marginBottom: '8px' }}>
                            Responsible Tourism
                        </Typography>
                        <Typography variant='body2'>
                            Promoting ethical and sustainable travel practices that minimize negative environmental and social impacts while
                            maximizing the benefits for local communities and ecosystems
                        </Typography>
                    </Paper>
                </Grid>
                <Grid item xs={12} sm={12} md={4}>
                    <Paper
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            padding: '16px',
                            height: '100%',
                            textAlign: 'center',
                            boxShadow: 'none',
                        }}
                    >
                        <RecyclingIcon style={{ fontSize: '40px', marginBottom: '16px', color: Colors.lightGreen }} />
                        <Typography variant='h6' style={{ marginBottom: '8px' }}>
                            Sustainability and Conservation
                        </Typography>
                        <Typography variant='body2'>
                            Preserving natural environments and biodiversity, while ensuring that tourism activities are ecologically and
                            culturally sustainable for the long-term well-being of the planet
                        </Typography>
                    </Paper>
                </Grid>
                <Grid item xs={12} sm={12} md={4}>
                    <Paper
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            padding: '16px',
                            height: '100%',
                            textAlign: 'center',
                            boxShadow: 'none',
                        }}
                    >
                        <RecommendIcon style={{ fontSize: '40px', marginBottom: '16px', color: Colors.red }} />
                        <Typography variant='h6' style={{ marginBottom: '8px' }}>
                            Personalized Recommendations
                        </Typography>
                        <Typography variant='body2'>
                            Travel suggestions to individual preferences and interests, ensuring a more engaging and meaningful travel
                            experience aligned with your specific needs and desires
                        </Typography>
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    );
};

export default Overview;
