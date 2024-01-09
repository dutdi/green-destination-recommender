import React from 'react';
import { Box, Paper, Typography } from '@mui/material';

const Contact = () => {
    return (
        <Paper sx={{ padding: '20px', boxShadow: 'none', mb: 6 }}>
            <Typography variant='h5'>Chair of Connected Mobility, TUM</Typography>
            <Box>
                <Typography variant='h6' sx={{ marginTop: '20px', fontWeight: 'bold' }}>
                    Research & Development
                </Typography>
                <Typography variant='body1'>
                    Tunar Mahmudov, B.Sc. - tunar.mahmudov@tum.de <br />
                    Ashmi Banerjee, M.Sc. - ashmi.banerjee@tum.de <br />
                </Typography>
            </Box>
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
        </Paper>
    );
};

export default Contact;
