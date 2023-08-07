import React from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';
import { Box } from '@mui/material';
import Navbar from './components/Navbar.jsx';
import Main from './components/Main.jsx';
import DestinationAlbum from './components/DestinationAlbum.jsx';
import Footer from './components/Footer.jsx';

const App = () => {
    return (
        <HashRouter>
            <Box>
                <Navbar />
                <Main />
                <DestinationAlbum />
                <Footer />
                <Routes></Routes>
            </Box>
        </HashRouter>
    );
};

export default App;
