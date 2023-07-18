import React from 'react';
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer } from 'react-leaflet';
import tileLayer from './tileLayer';
import Location from './Location';
import { values } from '@laufire/utils/collection';
import { isDefined } from '@laufire/utils/reflection';

const Map = ({ value: initialValue, ...args }) => {
	const hasLocation = !isDefined(initialValue);
	const value = values(initialValue);

	return (
		<MapContainer
			{ ...args }
			center={ value }
			style={ { height: '100vh' } }
		>
			<Location { ...{ value, hasLocation } }/>
			<TileLayer { ...tileLayer }/>
		</MapContainer>
	);
}
;

export default Map;
