import React from 'react';
import { MapContainer, TileLayer, Tooltip, Marker, CircleMarker } from 'react-leaflet';
import L from 'leaflet';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import 'leaflet/dist/leaflet.css';
import { calculateMinCo2Value } from '../../helpers/Functions.js';

delete L.Icon.Default.prototype._getIconUrl;

let icon = L.icon({
    iconSize: [25, 41],
    iconAnchor: [10, 41],
    popupAnchor: [2, -40],
    iconUrl: 'https://unpkg.com/leaflet@1.6/dist/images/marker-icon.png',
    shadowUrl: iconShadow,
});

const CustomMap = ({ fromDestination, toDestinations, activeTooltip, clickHandler, height }) => {
    return (
        <MapContainer center={[fromDestination.latitude, fromDestination.longitude]} zoom={7} style={{ height: height, width: '100%' }}>
            <TileLayer url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' />
            <Marker key={fromDestination.id} position={[fromDestination.latitude, fromDestination.longitude]} icon={icon}></Marker>
            {toDestinations.map((toDestination, index) => (
                <CircleMarker
                    key={toDestination.name}
                    fillOpacity={0.8}
                    radius={index < 5 ? 10 : 5}
                    center={[toDestination.latitude, toDestination.longitude]}
                    color={index < 5 ? 'green' : 'red'}
                    eventHandlers={{
                        click: () => clickHandler(toDestination),
                    }}
                >
                    <Tooltip
                        direction='top'
                        offset={[0, -20]}
                        permanent={index < 5 || activeTooltip === toDestination}
                        interactive={true}
                        className='custom-tooltip'
                    >
                        <div style={{ textAlign: 'center' }}>
                            {toDestination.name}, {toDestination.country} {toDestination.flag}
                            <br /> {calculateMinCo2Value(fromDestination, toDestination)} kg CO₂
                        </div>
                    </Tooltip>
                </CircleMarker>
            ))}
        </MapContainer>
    );
};

export default CustomMap;
