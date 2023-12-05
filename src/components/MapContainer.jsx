import React, { useEffect, useState, useRef } from 'react';
import { OverlayView, Marker, GoogleMap, withScriptjs, withGoogleMap, Polyline } from 'react-google-maps';
import { Colors } from '../helpers/Colors';
import { calculateMinCo2Value } from '../helpers/Functions';
import mapStyles from '../helpers/mapStyles';

const MAX_MARKERS = 20;

const MapContainer = ({ fromDestination, toDestinations, clickedToDestination, handleClickedToDestination }) => {
    const mapRef = useRef(null);
    const [selectedToDestination, setSelectedToDestination] = useState(null);
    const [visibleMarkers, setVisibleMarkers] = useState([]);
    const [mapBounds, setMapBounds] = useState(null);
    const [mapLoaded, setMapLoaded] = useState(false);
    const [movable, setMovable] = useState(true);

    useEffect(() => {
        handleBoundsChanged();
        setMapLoaded(true);
    }, []);

    useEffect(() => {
        clickedToDestination && setSelectedToDestination(clickedToDestination);
        setMovable(false);
    }, [clickedToDestination]);

    useEffect(() => {
        if (mapRef.current && mapBounds) {
            let numberOfVisibleMarkers = MAX_MARKERS;
            const bounds = new window.google.maps.LatLngBounds();
            bounds.extend(new window.google.maps.LatLng(parseFloat(fromDestination.latitude), parseFloat(fromDestination.longitude)));

            if (selectedToDestination) {
                numberOfVisibleMarkers -= 1;
                bounds.extend(
                    new window.google.maps.LatLng(parseFloat(selectedToDestination.latitude), parseFloat(selectedToDestination.longitude))
                );
            }

            const toDestinationsWithinBound = toDestinations.filter((toDestination) =>
                mapBounds.contains(new window.google.maps.LatLng(parseFloat(toDestination.latitude), parseFloat(toDestination.longitude)))
            );

            !movable && mapRef.current.fitBounds(bounds);

            setVisibleMarkers(
                selectedToDestination
                    ? [...toDestinationsWithinBound.slice(0, numberOfVisibleMarkers), selectedToDestination]
                    : toDestinationsWithinBound.slice(0, numberOfVisibleMarkers)
            );
        }
    }, [mapBounds, movable, clickedToDestination, selectedToDestination, fromDestination, toDestinations]);

    const handleBoundsChanged = () => {
        setMovable(true);
        if (mapRef.current && mapRef.current.getBounds()) {
            setMapBounds(mapRef.current.getBounds());
        }
    };

    const handleClicked = (toDestination) => {
        setSelectedToDestination(toDestination);
        handleClickedToDestination(toDestination);
        setMovable(false);
    };

    return (
        <GoogleMap
            ref={mapRef}
            defaultZoom={6}
            defaultCenter={{ lat: parseFloat(fromDestination.latitude), lng: parseFloat(fromDestination.longitude) }}
            defaultOptions={{
                styles: mapStyles,
                scrollwheel: false,
                mapTypeControl: false,
                fullscreenControl: false,
                streetViewControl: false,
            }}
            onBoundsChanged={handleBoundsChanged}
        >
            {mapLoaded && (
                <>
                    <Marker
                        key={fromDestination.id}
                        position={{ lat: parseFloat(fromDestination.latitude), lng: parseFloat(fromDestination.longitude) }}
                    />
                    {visibleMarkers.map((toDestination) => (
                        <OverlayView
                            key={Math.random()}
                            position={{ lat: toDestination.latitude, lng: toDestination.longitude }}
                            mapPaneName='overlayMouseTarget'
                            getPixelPositionOffset={(width, height) => ({
                                x: -(width / 2),
                                y: -(height / 2),
                            })}
                        >
                            <div
                                style={{
                                    backgroundColor: 'white',
                                    padding: '5px 10px',
                                    borderRadius: '8px',
                                    border: '2px solid #333',
                                    boxShadow: '0 2px 4px rgba(0,0,0,0.3)',
                                    cursor: 'pointer',
                                    userSelect: 'none',
                                    textAlign: 'center',
                                }}
                                onClick={() => handleClicked(toDestination)}
                            >
                                <div>
                                    {toDestination.name} {toDestination.country.slice(-4)}
                                </div>
                                <div style={{ fontSize: '12px', marginTop: '5px', color: Colors.green, fontWeight: 'bold' }}>
                                    {calculateMinCo2Value(fromDestination, toDestination)} kg CO2
                                </div>
                            </div>
                        </OverlayView>
                    ))}
                    {selectedToDestination && (
                        <Polyline
                            options={{
                                geodesic: true,
                                strokeColor: Colors.blue,
                                strokeOpacity: 1,
                                strokeWeight: 2,
                                icons: [
                                    {
                                        icon: {
                                            path: 'M 0,-1 0,1',
                                            strokeOpacity: 4,
                                            scale: 4,
                                        },
                                        offset: '0',
                                        repeat: '20px',
                                    },
                                ],
                            }}
                            path={[
                                { lat: parseFloat(fromDestination.latitude), lng: parseFloat(fromDestination.longitude) },
                                { lat: parseFloat(selectedToDestination.latitude), lng: parseFloat(selectedToDestination.longitude) },
                            ]}
                        />
                    )}
                </>
            )}
        </GoogleMap>
    );
};

export default withScriptjs(withGoogleMap(MapContainer));
