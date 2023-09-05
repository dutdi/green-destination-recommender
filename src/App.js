import React from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';
import { Box } from '@mui/material';
import Navbar from './components/Navbar.jsx';
import Landing from './components/Landing.jsx';
import DestinationAlbum from './components/DestinationAlbum.jsx';
import Footer from './components/Footer.jsx';
import { GreenDestinations } from './data/Destinations';
import { shuffleArray } from './helpers/Functions.js';

const App = () => {
    const destinations = shuffleArray(GreenDestinations).slice(0, 8);

    return (
        <HashRouter>
            <Box>
                <Navbar />
                <Landing />
                <DestinationAlbum destinations={destinations} />
                <Footer />
                <Routes></Routes>
            </Box>
        </HashRouter>
    );
};

export default App;
