import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Box, TextField, Button, Grid, Autocomplete, Select, Chip, FormControl, MenuItem, InputLabel, OutlinedInput } from '@mui/material';
import { Colors } from '../helpers/Colors.js';
import { useData } from './DataContext';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        },
    },
};

const transportArr = [
    { id: 'flight', value: 'Flight ✈️' },
    { id: 'driving', value: 'Driving 🚗' },
];

const UserInput = () => {
    const { destinations, dataFetched } = useData();

    const [fromDestination, setFromDestination] = useState('');
    const [fromDestinationInputValue, setFromDestinationInputValue] = useState('');
    const [toDestination, setToDestination] = useState('');
    const [toDestinationInputValue, setToDestinationInputValue] = useState('');
    const [filteredToDestinations, setFilteredToDestinations] = useState([]);
    const [transports, setTransports] = useState([]);

    useEffect(() => {
        if (fromDestination && destinations.miscDestinations) {
            const drivingToIds = fromDestination.connections_driving.map((connection) => connection.to_id);
            const flightToIds = fromDestination.connections_flight.map((connection) => connection.to_id);
            const toIds = [...new Set([...drivingToIds, ...flightToIds])];
            const filteredDestinations = destinations.miscDestinations.filter((destination) => toIds.includes(destination.id));
            setFilteredToDestinations(filteredDestinations);
        }
    }, [fromDestination, destinations.miscDestinations]);

    const defaultProps = {
        options: destinations.miscDestinations,
        getOptionLabel: (option) => option.name + ', ' + option.country,
    };

    const toDestinationProps = {
        options: filteredToDestinations,
    };

    const handleFromDestinationChange = (newValue) => {
        setFromDestination(newValue);
    };

    const handleToDestinationChange = (newValue) => {
        setToDestination(newValue);
    };

    const handleTransportChange = (event) => {
        const {
            target: { value },
        } = event;
        setTransports(value);
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
                <Grid item xs={12} sm={12} md={4}>
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
                <Grid item xs={12} sm={12} md={4}>
                    <Autocomplete
                        {...defaultProps}
                        id='to-destination'
                        {...toDestinationProps}
                        disabled={!fromDestination || transports.length > 0}
                        clearOnEscape
                        onChange={(event, newValue) => {
                            handleToDestinationChange(newValue);
                        }}
                        inputValue={toDestinationInputValue}
                        onInputChange={(event, newInputValue) => {
                            setToDestinationInputValue(newInputValue);
                        }}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label='To'
                                variant='outlined'
                                fullWidth
                                sx={{ backgroundColor: Colors.white, borderRadius: '4px' }}
                            />
                        )}
                    />
                </Grid>
                <Grid item xs={12} sm={12} md={4}>
                    <FormControl sx={{ width: '100%' }}>
                        <InputLabel id='multiple-chip-label'>Transport</InputLabel>
                        <Select
                            labelId='multiple-chip-label'
                            id='multiple-chip'
                            multiple
                            disabled={!fromDestination || (toDestination && transports.length === 0)}
                            value={transports}
                            onChange={handleTransportChange}
                            input={<OutlinedInput id='select-multiple-chip' label='Transport' />}
                            renderValue={(selected) => (
                                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                    {selected.map((value) => (
                                        <Chip key={value} label={value} />
                                    ))}
                                </Box>
                            )}
                            MenuProps={MenuProps}
                        >
                            {transportArr.map((tp) => (
                                <MenuItem key={tp.id} value={tp.value}>
                                    {tp.value}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>

                <Grid item xs={12} sm={12} md={2}>
                    <Button
                        variant='contained'
                        color='primary'
                        disabled={!fromDestination || (!toDestination && transports.length === 0)}
                        component={Link}
                        to='/search'
                        state={{
                            fromDestination: JSON.stringify(fromDestination),
                            toDestination: JSON.stringify(toDestination),
                            transports: JSON.stringify(transports),
                        }}
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
        )
    );
};

export default UserInput;
