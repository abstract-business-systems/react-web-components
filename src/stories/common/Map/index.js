/* eslint-disable no-magic-numbers */
import React from 'react';
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker, Popup, Circle } from 'react-leaflet';
import tileLayer from './tileLayer';
import Location from './Location';
import Leaflet from 'leaflet';

const icon = new Leaflet.Icon({
	iconUrl: '/images/marker-icon.png',
	shadowUrl: '/images/marker-shadow.png',
	iconSize: [25, 41],
	iconAnchor: [12, 41],
	popupAnchor: [1, -34],
	shadowSize: [41, 41],
});

const Locator = ({ value, currentLocation }) =>
	<>
		<Circle
			center={ value }
			weight={ 2 }
			color="red"
			fillColor="red"
			sfillOpacity={ 0.1 }
			radius={ 500 }
		/>
		<Marker position={ value } { ...{ icon } }>
			<Popup>Entered Location</Popup>
		</Marker>
		{ currentLocation && <Location/> }
	</>
	;

const Map = ({ value, currentLocation, ...args }) =>

	<MapContainer
		{ ...args }
		center={ value }
		style={ { height: '100vh' } }
	>
		<Locator { ...{ value, currentLocation } }/>
		<TileLayer { ...tileLayer }/>
	</MapContainer>
;

export default Map;
