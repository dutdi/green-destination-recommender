import React, { useRef } from 'react';
import { OverlayView, Marker, GoogleMap, withScriptjs, withGoogleMap, Polyline } from 'react-google-maps';
import { Colors } from '../../helpers/Colors.js';
import { calculateMinCo2Value } from '../../helpers/Functions.js';

const MapContainer = ({ fromDestination, toDestination }) => {
    const mapRef = useRef(null);

    return (
        <GoogleMap
            ref={mapRef}
            defaultZoom={8}
            defaultCenter={{ lat: fromDestination.latitude, lng: fromDestination.longitude }}
            defaultOptions={{
                scrollwheel: false,
                mapTypeControl: false,
                fullscreenControl: false,
                streetViewControl: false,
            }}
        >
            {
                <>
                    <Marker key={fromDestination.id} position={{ lat: fromDestination.latitude, lng: fromDestination.longitude }} />
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
                        >
                            <div>
                                {/* {toDestination.name} {toDestination.country.slice(-4)} */}
                                {toDestination.name} {toDestination.country}
                            </div>
                            <div style={{ fontSize: '12px', marginTop: '5px', color: Colors.green, fontWeight: 'bold' }}>
                                {calculateMinCo2Value(fromDestination, toDestination)} kg CO2
                            </div>
                        </div>
                    </OverlayView>
                    {
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
                                { lat: fromDestination.latitude, lng: fromDestination.longitude },
                                { lat: toDestination.latitude, lng: toDestination.longitude },
                            ]}
                        />
                    }
                </>
            }
        </GoogleMap>
    );
};

export default withScriptjs(withGoogleMap(MapContainer));
