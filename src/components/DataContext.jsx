import React, { useContext, useState, useEffect } from 'react';
import data from '../data/real_data.json';
const DataContext = React.createContext();

const DataProvider = ({ children }) => {
    const [dataFetched, setDataFetched] = useState(false);
    const [destinations, setDestinations] = useState({
        sustainableDestinations: [],
        miscDestinations: [],
    });

    const getData = async () => {
        const sustainableDestinations = data.sustainable;
        const miscDestinations = data.misc;

        setDestinations({
            sustainableDestinations,
            miscDestinations,
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
