import React, { useState, useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet';
import { getAllMapValues } from '../../helpers/Functions.js';
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

const Legend = ({ sortBy, maxValue, getColorForValue }) => {
    const map = useMap();
    useEffect(() => {
        const legend = new L.Control({ position: 'bottomleft' });

        legend.onAdd = function () {
            const div = L.DomUtil.create('div', 'info legend');
            const gradientSteps = 5;
            const labels = [];

            div.style.backgroundColor = 'rgba(255, 255, 255, 0.8)';
            div.style.padding = '10px';
            div.style.border = '1px solid #ccc';
            div.style.borderRadius = '5px';

            if (sortBy === 'emission') {
                labels.push('<strong>Emissions</strong><br>');
                for (let i = 1; i <= gradientSteps; i++) {
                    let value = (maxValue / gradientSteps) * i;
                    labels.push(
                        '<i style="background:' + getColorForValue(value, maxValue) + ';">&nbsp;</i> ' + Math.round(value) + ' kg CO₂'
                    );
                }
            } else if (sortBy === 'popularity') {
                labels.push('<strong>Popularity</strong><br>');
                for (let i = 1; i <= gradientSteps; i++) {
                    let value = (maxValue / gradientSteps) * i;
                    labels.push(
                        '<i style="background:' + getColorForValue(value, maxValue) + ';">&nbsp;</i> ' + Math.round(value) + ' score'
                    );
                }
            } else if (sortBy === 'seasonality') {
                labels.push('<strong>Seasonality</strong><br>');
                for (let i = 1; i <= gradientSteps; i++) {
                    let value = (maxValue / gradientSteps) * i;
                    labels.push(
                        '<i style="background:' + getColorForValue(value, maxValue) + ';">&nbsp;</i> ' + Math.round(value) + ' score'
                    );
                }
            }

            div.innerHTML = labels.join('<br>');
            return div;
        };

        legend.addTo(map);

        return () => {
            map.removeControl(legend);
        };
    }, [sortBy, map, maxValue, getColorForValue]);

    return null;
};

const PolylineComponent = ({ fromDestination, selectedDestination }) => {
    const map = useMap();
    useEffect(() => {
        if (!selectedDestination) return;

        const latlngs = [
            [fromDestination.latitude, fromDestination.longitude],
            [selectedDestination.latitude, selectedDestination.longitude],
        ];

        const line = L.polyline(latlngs, {
            color: 'blue',
            dashArray: '5, 10',
            weight: 2,
        }).addTo(map);

        return () => {
            map.removeLayer(line);
        };
    }, [map, selectedDestination, fromDestination]);

    return null;
};

const Circles = ({ toDestinations, values, maxValue, getColorForValue, handleDestinationClick, sortBy }) => {
    const map = useMap();

    useEffect(() => {
        toDestinations.forEach((destination, index) => {
            const circle = L.circle([destination.latitude, destination.longitude], {
                fillColor: getColorForValue(values[index], maxValue),
                color: getColorForValue(values[index], maxValue),
                radius: 25000,
                fillOpacity: 0.8,
            });

            circle.addTo(map).on('click', () => handleDestinationClick(destination));
        });
    }, [map, toDestinations, values, maxValue, getColorForValue, handleDestinationClick, sortBy]);

    return null;
};

const CustomMap = ({ fromDestination, toDestinations, sortBy, month, height, clickHandler }) => {
    const [selectedDestination, setSelectedDestination] = useState(null);
    const values = getAllMapValues(fromDestination, toDestinations, sortBy, month);
    const maxValue = Math.max(...values);

    const getColorForValue = (value, maxValue) => {
        const normalizedValue = value / maxValue;
        const highest = normalizedValue < 0.5 ? Math.round(2 * normalizedValue * 255) : 255;
        const lowest = normalizedValue > 0.5 ? Math.round(2 * (1 - normalizedValue) * 255) : 255;
        const red = sortBy === 'emission' ? highest : lowest;
        const green = sortBy === 'emission' ? lowest : highest;
        const blue = 0;
        return `rgb(${red}, ${green}, ${blue})`;
    };

    const handleDestinationClick = (destination) => {
        setSelectedDestination(destination);
        clickHandler(destination);
    };

    return (
        <MapContainer center={[fromDestination.latitude, fromDestination.longitude]} zoom={7} style={{ height: height, width: '100%' }}>
            <TileLayer url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' />
            <Marker position={[fromDestination.latitude, fromDestination.longitude]} icon={new L.Icon.Default()} />
            <Circles
                sortBy={sortBy}
                toDestinations={toDestinations}
                values={values}
                maxValue={maxValue}
                getColorForValue={getColorForValue}
                handleDestinationClick={handleDestinationClick}
            />
            <Legend sortBy={sortBy} maxValue={maxValue} getColorForValue={getColorForValue} />
            {selectedDestination && <PolylineComponent fromDestination={fromDestination} selectedDestination={selectedDestination} />}
        </MapContainer>
    );
};

export default CustomMap;
