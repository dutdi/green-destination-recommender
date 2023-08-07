import React, { useState } from 'react';
import { TextField, Slider, Button, Grid, Typography } from '@mui/material';
import { Colors } from '../helpers/Colors.js';

const UserInput = () => {
    const minBudget = 0;
    const maxBudget = 20000;
    const defaultValue = 6000;
    const currentDate = new Date().toISOString().split('T')[0];
    const budgetValueText = (value) => `€${value}`;

    const marks = [
        {
            value: 0,
            label: '0',
        },
        {
            value: 6000,
            label: '6000',
        },
        {
            value: 20000,
            label: '20000',
        },
    ];

    const [fromDate, setFromDate] = useState(currentDate);
    const [toDate, setToDate] = useState(currentDate);

    const handleFromDateChange = (event) => {
        const selectedDate = event.target.value;
        if (selectedDate <= toDate) {
            setFromDate(selectedDate);
        }
    };

    const handleToDateChange = (event) => {
        const selectedDate = event.target.value;
        if (selectedDate >= fromDate) {
            setToDate(selectedDate);
        }
    };

    return (
        <Grid
            container
            item
            spacing={{ xs: 0, sm: 2, md: 3 }}
            justifyContent='center'
            alignItems='center'
            style={{
                backgroundColor: Colors.gray,
                padding: '24px',
                borderRadius: '8px',
                boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
                marginBottom: '16px',
            }}
        >
            <Grid item xs={12} sm={12} md={3}>
                <TextField
                    label='Destination'
                    variant='outlined'
                    fullWidth
                    style={{ backgroundColor: Colors.white, borderRadius: '4px' }}
                />
            </Grid>

            <Grid item xs={12} sm={6} md={2}>
                <TextField
                    label='From Date'
                    type='date'
                    variant='outlined'
                    fullWidth
                    InputLabelProps={{
                        shrink: true,
                    }}
                    inputProps={{
                        min: currentDate,
                    }}
                    value={fromDate}
                    onChange={handleFromDateChange}
                    style={{ backgroundColor: Colors.white, borderRadius: '4px' }}
                />
            </Grid>

            <Grid item xs={12} sm={6} md={2}>
                <TextField
                    label='To Date'
                    type='date'
                    variant='outlined'
                    fullWidth
                    InputLabelProps={{
                        shrink: true,
                    }}
                    inputProps={{
                        min: fromDate,
                    }}
                    value={toDate}
                    onChange={handleToDateChange}
                    style={{ backgroundColor: Colors.white, borderRadius: '4px' }}
                />
            </Grid>

            <Grid item xs={12} sm={12} md={2}>
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
                    marks={marks}
                />
            </Grid>

            <Grid item xs={12} sm={12} md={3}>
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
