import React, { useState } from 'react';
import CustomMap from './CustomMap';
import CityDrawer from '../city/CityDrawer';

const CustomMapContainer = ({ fromDestination, toDestinations, month, avgCo2AllConnections }) => {
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
                activeTooltip={activeTooltip}
                setActiveTooltip={setActiveTooltip}
                clickHandler={clickHandler}
                height='85vh'
            />
            {cityDrawerOpen && (
                <CityDrawer
                    fromDestination={fromDestination}
                    toDestinations={toDestinations}
                    selectedToDestination={selectedToDestination}
                    month={month}
                    avgCo2AllConnections={avgCo2AllConnections}
                    open={cityDrawerOpen}
                    onClose={closeCityDrawer}
                />
            )}
        </div>
    );
};

export default CustomMapContainer;
