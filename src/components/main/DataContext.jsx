import React, { useContext, useState, useEffect } from 'react';
import data from '../../data/data.json';
const DataContext = React.createContext();

const DataProvider = ({ children }) => {
    const [dataFetched, setDataFetched] = useState(false);
    const [destinations, setDestinations] = useState([]);

    const getData = async () => {
        setDestinations(data);
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
