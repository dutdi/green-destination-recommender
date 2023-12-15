import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Box, TextField, Button, Grid, Autocomplete } from '@mui/material';
import { Typography, Divider } from '@mui/joy';
import { useData } from './DataContext';
import MonthPicker from '../custom/MonthPicker.jsx';
import InterestChips from '../custom/InterestChips.jsx';
import { Colors } from '../../helpers/Colors.js';
import { interests } from '../../helpers/Lists.js';

const UserInput = () => {
    const { destinations, dataFetched } = useData();
    const [fromDestination, setFromDestination] = useState('');
    const [fromDestinationInputValue, setFromDestinationInputValue] = useState('');
    const [month, setMonth] = useState(new Date().toLocaleString('default', { month: 'long' }));
    const [selectedInterests, setSelectedInterests] = useState([]);

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

    const handleInterestsChange = (selected) => {
        setSelectedInterests(selected);
    };

    return (
        dataFetched && (
            <Grid
                container
                item
                spacing={{ xs: 1, sm: 2, md: 3 }}
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
                <Grid item xs={12} sm={12} md={2}>
                    <Box>
                        <MonthPicker handleMonthChange={handleMonthChange}></MonthPicker>
                    </Box>
                </Grid>
                <Grid item xs={12} sm={12} md={4}>
                    <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                        <Divider orientation='vertical' />
                        <Typography level='title-lg' id='fav-interest' mr={2} ml={2}>
                            Interests
                        </Typography>
                        <Box
                            role='group'
                            aria-labelledby='fav-interest'
                            title='Interests'
                            sx={{
                                display: 'flex',
                                flexWrap: 'wrap',
                                gap: 1,
                                overflow: 'auto',
                                maxWidth: '100%',
                                height: '8vh',
                                borderRadius: 'sm',
                                borderStyle: 'inset',
                            }}
                        >
                            <InterestChips
                                interests={interests}
                                clickable={true}
                                handleInterestsChange={handleInterestsChange}
                            ></InterestChips>
                        </Box>
                    </Box>
                </Grid>
                <Grid item xs={12} sm={12} md={3}>
                    <Button
                        variant='contained'
                        color='primary'
                        disabled={fromDestination === null || fromDestination === ''}
                        component={Link}
                        to='/explore'
                        state={{
                            fromDestination: JSON.stringify(fromDestination),
                            interests: selectedInterests,
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
                        Explore
                    </Button>
                </Grid>
            </Grid>
        )
    );
};

export default UserInput;
