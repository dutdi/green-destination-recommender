import * as React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Box, Toolbar, IconButton, Typography, Menu, Button, MenuItem } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Colors } from '../../helpers/Colors.js';

const pages = [
    { title: 'Home', link: '/' },
    { title: 'About', link: '/about' },
    { title: 'Contact', link: '/contact' },
];

const Navbar = () => {
    const [anchorElNav, setAnchorElNav] = React.useState(null);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    return (
        <AppBar position='static' sx={{ background: Colors.green }}>
            <Toolbar disableGutters>
                <Typography
                    variant='h6'
                    noWrap
                    component={Link}
                    to='/'
                    sx={{
                        ml: 2,
                        display: { xs: 'none', md: 'flex' },
                        flexGrow: 1,
                        fontFamily: 'Open Sans',
                        fontWeight: 700,
                        letterSpacing: '.1rem',
                        color: 'inherit',
                        textDecoration: 'none',
                    }}
                >
                    🌴🏔️ Green Destination Recommender
                </Typography>
                <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: { xs: 'none', md: 'flex-end' } }}>
                    {pages.map((page) => (
                        <Button component={Link} to={page.link} key={page.title} sx={{ my: 2, color: 'white', display: 'block' }}>
                            {page.title}
                        </Button>
                    ))}
                </Box>
                <Typography
                    variant='body1'
                    noWrap
                    component={Link}
                    to='/'
                    sx={{
                        ml: 2,
                        display: { xs: 'flex', md: 'none' },
                        flexGrow: 1,
                        fontFamily: 'Open Sans',
                        fontWeight: 700,
                        letterSpacing: '.1rem',
                        color: 'inherit',
                        textDecoration: 'none',
                    }}
                >
                    🌴🏔️ Green Destination Recommender
                </Typography>
                <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' }, justifyContent: { xs: 'flex-end', md: 'none' } }}>
                    <IconButton size='large' aria-controls='menu-appbar' aria-haspopup='true' onClick={handleOpenNavMenu} color='inherit'>
                        <MenuIcon />
                    </IconButton>
                    <Menu
                        id='menu-appbar'
                        anchorEl={anchorElNav}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'left',
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'left',
                        }}
                        open={Boolean(anchorElNav)}
                        onClose={handleCloseNavMenu}
                        sx={{
                            display: { xs: 'block', md: 'none' },
                        }}
                    >
                        {pages.map((page) => (
                            <MenuItem key={page.title} onClick={handleCloseNavMenu}>
                                <Typography component={Link} to={page.link} textAlign='center' sx={{ textDecoration: 'none' }}>
                                    {page.title}
                                </Typography>
                            </MenuItem>
                        ))}
                    </Menu>
                </Box>
            </Toolbar>
        </AppBar>
    );
};
export default Navbar;
