import React from 'react';
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer } from 'react-leaflet';
import tileLayer from './tileLayer';
import Location from './Location';
import { values } from '@laufire/utils/collection';
import Markers from './Markers';

const Map = ({ value: initialValue, tileLayerProps, locations, ...args }) => {
	const value = values(initialValue);

	return (
		<MapContainer
			{ ...args }
			center={ value }
			style={ { height: '100vh' } }
		>
			<Location { ...{ value } }/>
			<Markers { ...{ locations } }/>
			<TileLayer { ...{ ...tileLayer, ...tileLayerProps } }/>
		</MapContainer>
	);
}
;

export default Map;
