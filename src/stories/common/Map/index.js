import React from 'react';
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer } from 'react-leaflet';
import tileLayer from './tileLayer';
import Location from './Location';

const Map = ({ value, ...args }) => {
	const currentLocation = value === undefined;

	return (
		<MapContainer
			{ ...args }
			center={ value }
			style={ { height: '100vh' } }
		>
			<Location { ...{ value, currentLocation } }/>
			<TileLayer { ...tileLayer }/>
		</MapContainer>
	);
}
;

export default Map;
