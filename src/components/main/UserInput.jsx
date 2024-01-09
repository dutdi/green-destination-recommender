import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
    FormControl,
    InputLabel,
    MenuItem,
    ListItemText,
    Checkbox,
    Select,
    TextField,
    Button,
    Grid,
    Autocomplete,
    OutlinedInput,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { ImSearch } from 'react-icons/im';
import { useData } from './DataContext';
import MonthPicker from '../custom/MonthPicker.jsx';
import { Colors } from '../../helpers/Colors.js';
import { interests } from '../../helpers/Lists.js';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

const UserInput = () => {
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));

    const { destinations, dataFetched } = useData();
    const [fromDestination, setFromDestination] = useState('');
    const [fromDestinationInputValue, setFromDestinationInputValue] = useState('');
    const [month, setMonth] = useState(new Date().toLocaleString('default', { month: 'long' }));
    const [selectedInterests, setSelectedInterests] = useState([]);

    const defaultProps = {
        options: destinations.sort((a, b) => {
            if (a.name < b.name) {
                return -1;
            }
            if (a.name > b.name) {
                return 1;
            }
            return 0;
        }),
        getOptionLabel: (option) => option.name + ', ' + option.country + ' ' + option.flag,
    };

    const handleFromDestinationChange = (newValue) => {
        setFromDestination(newValue);
    };

    const handleMonthChange = (newValue) => {
        setMonth(newValue);
    };

    const handleInterestChange = (event) => {
        const {
            target: { value },
        } = event;
        setSelectedInterests(typeof value === 'string' ? value.split(',') : value);
    };

    return (
        dataFetched && (
            <Grid
                container
                spacing={2}
                justifyContent='space-between'
                alignItems='center'
                item
                sx={{
                    backgroundColor: Colors.gray,
                    marginBottom: 3,
                    borderRadius: 2,
                    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
                    padding: isSmallScreen ? 2 : 4,
                    margin: 'auto',
                    maxWidth: '80%',
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
                    <FormControl sx={{ width: '100%' }}>
                        <InputLabel>Interests</InputLabel>
                        <Select
                            multiple
                            value={selectedInterests}
                            onChange={handleInterestChange}
                            input={<OutlinedInput label='Interests' />}
                            renderValue={(selected) => selected.join(', ')}
                            MenuProps={MenuProps}
                        >
                            {interests.map((i) => (
                                <MenuItem key={i} value={i}>
                                    <Checkbox checked={selectedInterests.indexOf(i) > -1} />
                                    <ListItemText primary={i} />
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
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
                            p: 2,
                        }}
                        startIcon={<ImSearch />}
                    >
                        Explore
                    </Button>
                </Grid>
            </Grid>
        )
    );
};

export default UserInput;
