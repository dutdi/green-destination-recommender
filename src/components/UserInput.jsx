import React, { useState } from 'react';
import { TextField, Slider, Button, Grid, Typography, Autocomplete } from '@mui/material';
import { Colors } from '../helpers/Colors.js';
import { Destinations } from '../data/Destinations.js';

const UserInput = () => {
    const minBudget = 0;
    const maxBudget = 1000;
    const defaultValue = 200;
    const currentDate = new Date().toISOString().split('T')[0];
    const budgetValueText = (value) => `€${value}`;

    const marks = [
        {
            value: 0,
            label: '0',
        },
        {
            value: 200,
            label: '200',
        },
        {
            value: 1000,
            label: '1000',
        },
    ];

    const [fromDate, setFromDate] = useState(currentDate);
    const [toDate, setToDate] = useState(currentDate);

    const defaultProps = {
        options: Destinations,
        getOptionLabel: (option) => option.name,
    };

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
            sx={{
                backgroundColor: Colors.gray,
                padding: '24px',
                borderRadius: '8px',
                boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
                marginBottom: '16px',
            }}
        >
            <Grid item xs={12} sm={12} md={3}>
                <Autocomplete
                    {...defaultProps}
                    id='destination'
                    clearOnEscape
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label='Destination'
                            variant='outlined'
                            fullWidth
                            sx={{ backgroundColor: Colors.white, borderRadius: '4px' }}
                        />
                    )}
                />
            </Grid>

            <Grid item xs={12} sm={6} md={2}>
                <TextField
                    label='Departure'
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
                    sx={{ backgroundColor: Colors.white, borderRadius: '4px' }}
                />
            </Grid>

            <Grid item xs={12} sm={6} md={2}>
                <TextField
                    label='Return'
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
                    sx={{ backgroundColor: Colors.white, borderRadius: '4px' }}
                />
            </Grid>

            <Grid item xs={12} sm={12} md={2}>
                <Typography variant='body2' gutterBottom>
                    Budget (€ per day)
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
                    sx={{
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
