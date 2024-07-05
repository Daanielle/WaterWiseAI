import React from 'react';
import { ComposableMap, Geographies, Geography, Marker } from 'react-simple-maps';
import israelGeoJSON from '../../resources/mapping/israelGeoJSON.json';
import overlayImage from '../../resources/images/IsraelMap.jpg';
import { Tooltip, Typography } from '@mui/material';
import markers from '../../resources/mapping/imsStations.json'; // Import the JSON data


const MapComponent = ({ myCoordinates, selectedStation }) => {
    let userLocation = [];
    if (myCoordinates) {
        userLocation = [{ name: "Your location", coordinates: [myCoordinates.userLongitude, myCoordinates.userLatitude] }];
    }

    return (
        <ComposableMap
            projection="geoMercator"
            projectionConfig={{ scale: 12500, center: [35, 31.5] }}
            style={{ width: '100%', height: '180%' }} // Ensure map fills the container

        >
            <Geographies geography={israelGeoJSON}>
                {({ geographies }) => (
                    <>
                        {geographies.map(geo => (
                            <Geography key={geo.rsmKey} geography={geo} />
                        ))}
                    </>
                )}
            </Geographies>
            <g>
                <image
                    href={overlayImage}
                    x="60"
                    y="-220"
                    width="675"
                    height="1090"
                    opacity="1"
                />
            </g>
            {myCoordinates && userLocation.length > 0 && (
                // <Tooltip key="user-location" title={"Your location - " + myCity.label}>
                <Tooltip key="user-location" title={
                    <React.Fragment>
                        <Typography gutterBottom component="div" fontSize={18}>Your location</Typography>
                    </React.Fragment>}
                >
                    <Marker coordinates={userLocation[0].coordinates}>
                        <circle r={15} fill="var(--red-orange)" stroke="var(--black-color)" strokeWidth={2} />
                    </Marker>
                </Tooltip>
            )}
            {markers.map(({ id, name, coordinates }, i) => {
                let isSelected = false
                if (selectedStation){
                    isSelected = name === selectedStation.label;
                }
                return (
                    <Tooltip key={i} title={
                        <React.Fragment>
                            <Typography gutterBottom component="div" fontSize={18}>{name} station</Typography>
                        </React.Fragment>}
                    >
                        <Marker coordinates={coordinates}>
                            <circle
                                r={12}
                                // fill="var(--light-yellow-green)"
                                fill={isSelected ? "var(--primary-white)" : "var(--light-yellow-green)"}
                                stroke="var(--black-color)"
                                strokeWidth={isSelected ? 7 : 2}
                                className={isSelected ? 'fadeOut' : ''}
                            />
                        </Marker>
                    </Tooltip>
                )
            })}

        </ComposableMap>
    );
};

export default MapComponent;
