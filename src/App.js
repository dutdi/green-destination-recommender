import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Box, CssBaseline } from '@mui/material';
import Navbar from './components/main/Navbar.jsx';
import Landing from './components/main/Landing.jsx';
import Explore from './components/main/Explore.jsx';
import About from './components/main/About.jsx';
import Footer from './components/main/Footer.jsx';
import { DataProvider } from './components/main/DataContext.jsx';

const App = () => {
    return (
        <BrowserRouter basename='/green-destination-recommender'>
            <Box>
                <Navbar />
                <CssBaseline />
                <DataProvider>
                    <Routes>
                        <Route exact path='/' element={<Landing></Landing>}></Route>
                        <Route exact path='/explore' element={<Explore></Explore>}></Route>
                        <Route exact path='/about' element={<About></About>}></Route>
                    </Routes>
                </DataProvider>
                <Footer />
            </Box>
        </BrowserRouter>
    );
};

export default App;
