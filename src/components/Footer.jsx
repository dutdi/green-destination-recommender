import { Link, Typography } from '@mui/material';

const Footer = () => {
    return (
        <Typography variant='body2' color='text.secondary' align='center'>
            {'Copyright © '}
            <Link color='inherit' href='https://www.ce.cit.tum.de/cm/home/'>
                Chair of Connected Mobility, CIT, TUM{' '}
            </Link>
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
};

export default Footer;
