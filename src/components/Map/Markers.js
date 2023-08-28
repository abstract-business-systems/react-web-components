/* eslint-disable no-magic-numbers */
import React from 'react';
import 'leaflet/dist/leaflet.css';
import Leaflet from 'leaflet';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import tileLayer from './tileLayer';
import { map, values } from '@laufire/utils/collection';

const icon = new Leaflet.Icon({
	iconUrl: '/images/marker-icon.png',
	shadowUrl: '/images/marker-shadow.png',
	iconSize: [25, 41],
	iconAnchor: [12, 41],
	popupAnchor: [1, -34],
	shadowSize: [41, 41],
});

const Markers = ({
	tileLayerProps,
	locations,
	value: initialValue,
	...args
}) => {
	const value = values(initialValue);
	const style = { height: '100vh' };

	return (
		<MapContainer style={ style } center={ value } { ...args }>
			<TileLayer { ...{ ...tileLayer, ...tileLayerProps } }/>
			{ map(locations, (coordinates, key) =>
				<Marker key={ key } position={ coordinates } { ...{ icon } }>
					<Popup>{ `Lat: ${ coordinates.lat }, Long: ${ coordinates.lng }` }</Popup>
				</Marker>) }
		</MapContainer>
	);
};

export default Markers;
