import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Box, CssBaseline } from '@mui/material';
import Navbar from './components/main/Navbar.jsx';
import Landing from './components/main/Landing.jsx';
import Explore from './components/main/Explore.jsx';
import Contact from './components/main/Contact.jsx';
import Footer from './components/main/Footer.jsx';
import CityDetails from './components/city/CityDetails.jsx';
import Parse from 'parse/dist/parse.min.js';
import { DataProvider } from './components/main/DataContext.jsx';

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
                <DataProvider>
                    <Routes>
                        <Route exact path='/' element={<Landing></Landing>}></Route>
                        <Route exact path='/explore' element={<Explore></Explore>}></Route>
                        <Route exact path='/details' element={<CityDetails></CityDetails>}></Route>
                        <Route exact path='/contact' element={<Contact></Contact>}></Route>
                    </Routes>
                </DataProvider>
                <Footer />
            </Box>
        </BrowserRouter>
    );
};

export default App;
