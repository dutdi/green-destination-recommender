import React from 'react';
import Navbar from './components/Navbar.jsx';
import Main from './components/Main.jsx';
import DestinationAlbum from './components/DestinationAlbum.jsx';
import Footer from './components/Footer.jsx';

const App = () => {
    return (
        <>
            <Navbar />
            <Main />
            <DestinationAlbum />
            <Footer />
        </>
    );
};

export default App;
