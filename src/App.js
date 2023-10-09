import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Box, CssBaseline } from '@mui/material';
import Navbar from './components/Navbar.jsx';
import Landing from './components/Landing.jsx';
import ContactUs from './components/ContactUs';
import Footer from './components/Footer.jsx';
import Parse from 'parse/dist/parse.min.js';

const PARSE_HOST_URL = 'https://parseapi.back4app.com/';
const PARSE_JAVASCRIPT_KEY = 'ieoAfk71LlfrAlXl6MzPb1xw1ilLKP636wcAoY1v';
const PARSE_APPLICATION_ID = 'uNmChSgdPHBiFJwXB6gmR6rD3EONMMnnv0cHhQgu';

Parse.initialize(PARSE_APPLICATION_ID, PARSE_JAVASCRIPT_KEY);
Parse.serverURL = PARSE_HOST_URL;

const App = () => {
    return (
        <BrowserRouter>
            <Box>
                <Navbar />
                <CssBaseline />
                <Routes>
                    <Route path='/' element={<Landing></Landing>}></Route>
                    <Route path='/contact' element={<ContactUs></ContactUs>}></Route>
                </Routes>
                <Footer />
            </Box>
        </BrowserRouter>
    );
};

export default App;
