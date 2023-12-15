import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
    Button,
    FormControl,
    Grid,
    InputLabel,
    Select,
    Typography,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
} from '@mui/material';
import { genders, ages, countries } from '../../helpers/Lists.js';
import { Colors } from '../../helpers/Colors.js';

const Demographics = () => {
    const [open, setOpen] = useState(false);
    const [hasError, setHasError] = useState(true);

    const [demographics, setDemographics] = useState({
        age: '',
        gender: '',
        residence: '',
    });

    useEffect(() => {
        const checkAllEntered = () => {
            if (demographics.age === '' || demographics.gender === '' || demographics.residence === '') {
                setHasError(true);
            } else {
                setHasError(false);
            }
        };
        const checkIfSaved = () => {
            const storedObject = localStorage.getItem('demographics');
            if (!storedObject) {
                setOpen(true);
                checkAllEntered();
            }
        };
        checkIfSaved();
    }, [demographics]);

    const handleChange = (event) => {
        const name = event.target.name;
        setDemographics({
            ...demographics,
            [name]: event.target.value,
        });
    };

    const submitForm = async () => {
        const userFields = {
            age: demographics.age,
            gender: demographics.gender,
            residence: demographics.residence,
        };
        localStorage.setItem('demographics', JSON.stringify(userFields));
        setOpen(false);
    };

    return (
        <Dialog
            open={open}
            maxWidth={'md'}
            sx={{
                backdropFilter: 'blur(5px) sepia(5%)',
            }}
        >
            <DialogTitle sx={{ backgroundColor: Colors.green, color: Colors.white }}> Demographic Information</DialogTitle>
            <DialogContent>
                <DialogContentText sx={{ color: Colors.black, mt: '3%', mb: '3%' }}>
                    This information is important for a comprehensive analysis, enabling us to better understand the correlation between
                    demographics of our users and their feedback on our recommendations.
                </DialogContentText>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={12} md={4}>
                        <FormControl required sx={{ width: '100%' }}>
                            <InputLabel htmlFor='age'>Age</InputLabel>
                            <Select
                                native
                                value={demographics.age}
                                onChange={handleChange}
                                inputProps={{
                                    name: 'age',
                                    id: 'age',
                                }}
                            >
                                <option aria-label='None' value='' />
                                {ages.map((age) => (
                                    <option key={age} value={age}>
                                        {age}
                                    </option>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={12} md={4}>
                        <FormControl required sx={{ width: '100%' }}>
                            <InputLabel htmlFor='gender'>Gender</InputLabel>
                            <Select
                                native
                                value={demographics.gender}
                                onChange={handleChange}
                                inputProps={{
                                    name: 'gender',
                                    id: 'gender',
                                }}
                            >
                                <option aria-label='None' value='' />
                                {genders.map((gender) => (
                                    <option key={gender} value={gender}>
                                        {gender}
                                    </option>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={12} md={4}>
                        <FormControl required sx={{ width: '100%' }}>
                            <InputLabel htmlFor='residence'>Country of residence</InputLabel>
                            <Select
                                native
                                value={demographics.residence}
                                onChange={handleChange}
                                inputProps={{
                                    name: 'residence',
                                    id: 'residence',
                                }}
                            >
                                <option aria-label='None' value='' />
                                {countries.map((country) => (
                                    <option key={country} value={country}>
                                        {country}
                                    </option>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
                {hasError ? (
                    <Typography variant='h6' gutterBottom style={{ color: 'red', fontWeight: 'bold' }}>
                        Please enter all the fields*
                    </Typography>
                ) : (
                    <Button
                        style={{ backgroundColor: Colors.blue, color: Colors.white }}
                        component={Link}
                        to='/'
                        variant='contained'
                        onClick={submitForm}
                    >
                        Save
                    </Button>
                )}
            </DialogActions>
        </Dialog>
    );
};

export default Demographics;
