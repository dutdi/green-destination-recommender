import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Stack, TextField, Button, Grid, Autocomplete } from '@mui/material';
import { useData } from './DataContext';
import MonthPicker from '../custom/MonthPicker.jsx';
import { Colors } from '../../helpers/Colors.js';
import { interests } from '../../helpers/Lists.js';

const UserInput = () => {
    const { destinations, dataFetched } = useData();
    const [fromDestination, setFromDestination] = useState('');
    const [fromDestinationInputValue, setFromDestinationInputValue] = useState('');
    const [month, setMonth] = useState(new Date().toLocaleString('default', { month: 'long' }));
    const [selectedInterests, setSelectedInterests] = useState([]);
    const [inputInterest, setInputInterest] = useState('');

    const defaultProps = {
        options: destinations,
        getOptionLabel: (option) => option.name + ', ' + option.country + ' ' + option.flag,
    };

    const handleFromDestinationChange = (newValue) => {
        setFromDestination(newValue);
    };

    const handleMonthChange = (newValue) => {
        setMonth(newValue);
    };

    const handleInterestChange = (newValue) => {
        setSelectedInterests(newValue);
    };

    return (
        dataFetched && (
            <Grid
                container
                spacing={3}
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
                <Grid item xs={12} sm={12} md={3} lg={3} xl={3}>
                    <Autocomplete
                        {...defaultProps}
                        id='from-destination'
                        clearOnEscape
                        onChange={(event, newValue) => {
                            handleFromDestinationChange(newValue);
                        }}
                        inputValue={fromDestinationInputValue}
                        onInputChange={(event, newInputValue) => {
                            setFromDestinationInputValue(newInputValue);
                        }}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label='From'
                                required
                                variant='outlined'
                                fullWidth
                                sx={{ backgroundColor: Colors.white, borderRadius: '4px' }}
                            />
                        )}
                    />
                </Grid>

                <Grid item xs={12} sm={12} md={2} lg={2} xl={2}>
                    <MonthPicker handleMonthChange={handleMonthChange}></MonthPicker>
                </Grid>

                <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
                    <Stack spacing={3} sx={{ width: '100%' }}>
                        <Autocomplete
                            multiple
                            id='tags-standard'
                            options={interests}
                            getOptionLabel={(option) => option.label}
                            onInputChange={(event, newInputValue) => {
                                setInputInterest(newInputValue);
                            }}
                            inputValue={inputInterest}
                            onChange={(event, newValue) => {
                                handleInterestChange(newValue);
                            }}
                            renderInput={(params) => <TextField {...params} variant='outlined' label='Interests' placeholder='Add' />}
                        />
                    </Stack>
                </Grid>

                <Grid item xs={12} sm={12} md={3} lg={3} xl={3}>
                    <Button
                        variant='contained'
                        color='primary'
                        disabled={fromDestination === null || fromDestination === ''}
                        component={Link}
                        to='/explore'
                        state={{
                            fromDestination: JSON.stringify(fromDestination),
                            interests: selectedInterests.length > 0 ? JSON.stringify(selectedInterests) : JSON.stringify(interests),
                            month: month,
                        }}
                        fullWidth
                        sx={{
                            backgroundColor: Colors.blue,
                            color: Colors.white,
                            borderRadius: '4px',
                            padding: '12px 24px',
                        }}
                    >
                        🔍 Explore
                    </Button>
                </Grid>
            </Grid>
        )
    );
};

export default UserInput;
