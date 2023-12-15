import React, { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import { BarChart } from '@mui/x-charts/BarChart';
import { axisClasses } from '@mui/x-charts';
import { useData } from '../main/DataContext.jsx';
import { findTrainConnectionWithMinCo2, findDrivingConnectionWithMinCo2, findFlightConnectionWithMinCo2 } from '../../helpers/Functions.js';

const chartSetting = {
    xAxis: [
        {
            label: 'CO₂ Emission (kg)',
        },
    ],
    width: 500,
    height: 400,
};

const valueFormatter = (value) => `${value} kg`;

const RouteChart = () => {
    const { destinations, dataFetched } = useData();
    const [dataset, setDataset] = useState([]);
    const fromDestination = destinations.find((destination) => destination.name === 'Munich'); //TODO
    const toDestination = destinations.find((destination) => destination.name === 'Berlin'); //TODO

    useEffect(() => {
        if (fromDestination && toDestination) {
            const dataset = [];
            if (toDestination) {
                const trainMinCo2 = findTrainConnectionWithMinCo2(fromDestination, toDestination)?.co2_kg;
                const drivingMinCo2 = findDrivingConnectionWithMinCo2(fromDestination, toDestination)?.co2_kg;
                const flightMinCo2 = findFlightConnectionWithMinCo2(fromDestination, toDestination)?.co2_kg;

                dataset.push(
                    {
                        co2: trainMinCo2,
                        transport: 'Train',
                    },
                    { co2: drivingMinCo2, transport: 'Driving' },
                    { co2: flightMinCo2, transport: 'Flight' }
                );
            }
            setDataset(dataset);
        }
    }, [fromDestination, toDestination]);

    return (
        dataFetched &&
        dataset.length > 0 && (
            <BarChart
                dataset={dataset}
                yAxis={[{ scaleType: 'band', dataKey: 'transport' }]}
                series={[{ dataKey: 'co2', label: 'CO₂ emissions per transportation', valueFormatter }]}
                layout='horizontal'
                {...chartSetting}
            />
        )
    );
};

export default RouteChart;
