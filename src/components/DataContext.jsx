import React, { useContext, useState, useEffect } from 'react';
import { getAllGreenDestinations, getAllRedDestinations } from '../server/db.js';

const DataContext = React.createContext();

const DataProvider = ({ children }) => {
    const [dataFetched, setDataFetched] = useState(false);
    const [destinations, setDestinations] = useState({
        greenDestinations: [],
        redDestinations: [],
    });

    const getData = async () => {
        const greenDestinations = await getAllGreenDestinations();
        const redDestinations = await getAllRedDestinations();

        setDestinations({
            greenDestinations,
            redDestinations,
        });
        setDataFetched(true);
    };

    useEffect(() => {
        getData();
    }, []);

    return <DataContext.Provider value={{ destinations, dataFetched }}>{children}</DataContext.Provider>;
};

const useData = () => {
    return useContext(DataContext);
};

export { DataProvider, useData };
