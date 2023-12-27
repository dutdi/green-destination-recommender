import React, { useState, useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Circle, Marker, useMap } from 'react-leaflet';
import { calculateMinCo2Value } from '../../helpers/Functions.js';
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

const Legend = ({ maxCo2Value, getColorForCo2Value }) => {
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

            labels.push('<strong>Emissions</strong><br>');
            for (let i = 1; i <= gradientSteps; i++) {
                let value = (maxCo2Value / gradientSteps) * i;
                labels.push('<i style="background:' + getColorForCo2Value(value) + ';">&nbsp;</i> ' + Math.round(value) + ' kg CO₂');
            }

            div.innerHTML = labels.join('<br>');
            return div;
        };

        legend.addTo(map);

        return () => {
            map.removeControl(legend);
        };
    }, [map, maxCo2Value, getColorForCo2Value]);

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
    }, [selectedDestination, map]);

    return null;
};

const CustomMap = ({ fromDestination, toDestinations, clickHandler, height }) => {
    const [selectedDestination, setSelectedDestination] = useState(null);
    const co2Values = toDestinations.map((destination) => calculateMinCo2Value(fromDestination, destination));
    const maxCo2Value = Math.max(...co2Values);

    const getColorForCo2Value = (value) => {
        const normalizedValue = value / maxCo2Value;
        const red = normalizedValue < 0.5 ? Math.round(2 * normalizedValue * 255) : 255;
        const green = normalizedValue > 0.5 ? Math.round(2 * (1 - normalizedValue) * 255) : 255;
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
            {toDestinations.map((destination, index) => (
                <Circle
                    key={destination.id}
                    center={[destination.latitude, destination.longitude]}
                    fillColor={getColorForCo2Value(co2Values[index])}
                    color={getColorForCo2Value(co2Values[index])}
                    radius={25000}
                    fillOpacity={0.8}
                    eventHandlers={{
                        click: () => handleDestinationClick(destination),
                    }}
                />
            ))}
            <Legend maxCo2Value={maxCo2Value} getColorForCo2Value={getColorForCo2Value} />
            {selectedDestination && <PolylineComponent fromDestination={fromDestination} selectedDestination={selectedDestination} />}
        </MapContainer>
    );
};

export default CustomMap;
