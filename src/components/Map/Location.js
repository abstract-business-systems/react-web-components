/* eslint-disable no-magic-numbers */
import React, { Fragment, useEffect, useState } from 'react';
import { useMap, Marker, Popup, Circle } from 'react-leaflet';
import Leaflet from 'leaflet';
import { isDefined } from '@laufire/utils/reflection';

const icon = new Leaflet.Icon({
	iconUrl: '/images/marker-icon.png',
	shadowUrl: '/images/marker-shadow.png',
	iconSize: [25, 41],
	iconAnchor: [12, 41],
	popupAnchor: [1, -34],
	shadowSize: [41, 41],
});

const Map = (coordinates, popupMessage) =>
	<Fragment>
		<Circle
			center={ coordinates }
			weight={ 2 }
			color="red"
			fillColor="red"
			sfillOpacity={ 0.1 }
			radius={ 500 }
		/><Marker position={ coordinates } { ...{ icon } }>
			<Popup>{ popupMessage }</Popup>
		</Marker>
	</Fragment>
	;

const getCurrentLocation = (map, setCoordinates) => {
	map.locate({ setView: true });
	map.on('locationfound', (event) => {
		setCoordinates(event.latlng);
	});
};

const Location = ({ value }) => {
	const hasLocation = isDefined(value);
	const map = useMap();
	const [coordinates, setCoordinates] = useState(value);
	const popupMessage = hasLocation
		? 'Your Current Location'
		: 'Entered Location';

	useEffect(() => {
		hasLocation || getCurrentLocation(map, setCoordinates);
	}, [map]);

	return coordinates && Map(coordinates, popupMessage);
};

export default Location;
