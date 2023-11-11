import React from 'react';
import { Box, Grid, Paper, Typography, TextField, Button } from '@mui/material';

const Contact = () => {
    const handleSubmit = (e) => {
        e.preventDefault();
    };

    return (
        <Grid container spacing={2} justify='center' sx={{ padding: '20px', mb: 6 }}>
            <Grid item xs={12} sm={12} md={8}>
                <Paper sx={{ padding: '0px', boxShadow: 'none' }}>
                    <Typography variant='h5'>Contact Us</Typography>
                    <form onSubmit={handleSubmit}>
                        <TextField label='Name' variant='outlined' fullWidth margin='normal' required />
                        <TextField label='Email' variant='outlined' fullWidth margin='normal' required />
                        <TextField label='Message' variant='outlined' fullWidth margin='normal' multiline rows={4} required />
                        <Button type='submit' variant='contained' color='primary' fullWidth sx={{ marginTop: '10px' }}>
                            Submit
                        </Button>
                    </form>
                </Paper>
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
                <Paper sx={{ padding: '20px', boxShadow: 'none' }}>
                    <Typography variant='h5'>Chair of Connected Mobility, TUM</Typography>
                    <Box>
                        <Typography variant='h6' sx={{ marginTop: '20px', fontWeight: 'bold' }}>
                            Visiting address
                        </Typography>
                        <Typography variant='body1'>
                            Technische Universität München <br />
                            School of Computation, Information and Technology <br />
                            Boltzmannstrasse 3 <br />
                            85748 Garching bei München <br />
                            Germany <br />
                            1st floor, wing 05 <br />
                        </Typography>
                    </Box>
                    <Box>
                        <Typography variant='h6' sx={{ marginTop: '20px', fontWeight: 'bold' }}>
                            Secretariat
                        </Typography>
                        <Typography variant='body1'>
                            Christine Lissner <br />
                            Room 01.05.052 <br />
                            Phone +49 89 289-18656 <br />
                            Fax: +49 89 289-18657 <br />
                            Email: lissner@in.tum.de <br />
                        </Typography>
                    </Box>
                    <Box>
                        <Typography variant='h6' sx={{ marginTop: '20px', fontWeight: 'bold' }}>
                            Research & Development
                        </Typography>
                        <Typography variant='body1'>
                            Ashmi Banerjee, M.Sc. - ashmi.banerjee@tum.de <br />
                            Tunar Mahmudov, B.Sc. - tunar.mahmudov@tum.de <br />
                        </Typography>
                    </Box>
                </Paper>
            </Grid>
        </Grid>
    );
};

export default Contact;
