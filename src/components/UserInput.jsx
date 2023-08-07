import React from 'react';
import { TextField, Slider, Button, Grid, Typography } from '@mui/material';
import { Colors } from '../helpers/Colors.js';

const UserInput = () => {
    const minBudget = 0;
    const maxBudget = 20000;
    const defaultValue = 6000;
    const currentDate = new Date().toISOString().split('T')[0];
    const budgetValueText = (value) => `$${value}`;

    return (
        <Grid
            container
            item
            spacing={2}
            alignItems='center'
            justifyContent='center'
            style={{
                backgroundColor: Colors.gray,
                padding: '16px',
                borderRadius: '8px',
                boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
                marginBottom: '16px',
            }}
        >
            <Grid item xs={12} sm={6} md={3}>
                <TextField
                    label='Destination'
                    variant='outlined'
                    fullWidth
                    style={{ backgroundColor: Colors.white, borderRadius: '4px' }}
                />
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
                <TextField
                    label='Travel Date'
                    type='date'
                    variant='outlined'
                    fullWidth
                    InputLabelProps={{
                        shrink: true,
                    }}
                    inputProps={{
                        min: currentDate,
                    }}
                    style={{ backgroundColor: Colors.white, borderRadius: '4px' }}
                />
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
                <Typography variant='body2' gutterBottom>
                    Budget
                </Typography>
                <Slider
                    defaultValue={defaultValue}
                    min={minBudget}
                    max={maxBudget}
                    step={100}
                    valueLabelDisplay='auto'
                    valueLabelFormat={budgetValueText}
                />
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
                <Button
                    variant='contained'
                    color='primary'
                    fullWidth
                    style={{
                        backgroundColor: Colors.blue,
                        color: Colors.white,
                        borderRadius: '4px',
                        padding: '12px 24px',
                    }}
                >
                    Search
                </Button>
            </Grid>
        </Grid>
    );
};

export default UserInput;
