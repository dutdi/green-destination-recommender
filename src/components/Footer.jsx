import { Paper, Typography, Box, Container } from '@mui/material';
import { Colors } from '../helpers/Colors.js';

const Footer = () => {
    return (
        <Paper
            sx={{ width: '100%', position: 'fixed', bottom: 0, backgroundColor: Colors.gray }}
            component='footer'
            square
            variant='outlined'
        >
            <Container maxWidth='lg'>
                <Box
                    sx={{
                        flexGrow: 1,
                        justifyContent: 'center',
                        display: 'flex',
                        p: 2,
                    }}
                >
                    <Typography variant='caption' color='initial'>
                        Copyright ©2024. Chair of Connected Mobility, TUM
                    </Typography>
                </Box>
            </Container>
        </Paper>
    );
};

export default Footer;
