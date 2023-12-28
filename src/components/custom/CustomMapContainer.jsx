import React, { useState } from 'react';
import CustomMap from './CustomMap';
import CityDrawer from '../city/CityDrawer';

const CustomMapContainer = ({ fromDestination, toDestinations, month, averages, sortBy }) => {
    const [activeTooltip, setActiveTooltip] = useState(null);
    const [cityDrawerOpen, setCityDrawerOpen] = useState(false);
    const [selectedToDestination, setSelectedToDestination] = useState(null);

    const clickHandler = (selected) => {
        if (activeTooltip === selected) {
            setActiveTooltip(null);
            setCityDrawerOpen(false);
        } else {
            setActiveTooltip(selected);
            setCityDrawerOpen(true);
            setSelectedToDestination(selected);
        }
    };

    const closeCityDrawer = () => {
        setCityDrawerOpen(false);
        setSelectedToDestination(null);
    };

    return (
        <div>
            <CustomMap
                fromDestination={fromDestination}
                toDestinations={toDestinations}
                sortBy={sortBy}
                month={month}
                height='85vh'
                clickHandler={clickHandler}
            />
            {cityDrawerOpen && (
                <CityDrawer
                    fromDestination={fromDestination}
                    toDestination={selectedToDestination}
                    month={month}
                    averages={averages}
                    sortBy={sortBy}
                    open={cityDrawerOpen}
                    onClose={closeCityDrawer}
                />
            )}
        </div>
    );
};

export default CustomMapContainer;
