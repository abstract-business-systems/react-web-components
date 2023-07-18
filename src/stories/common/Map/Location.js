/* eslint-disable no-magic-numbers */
import React, { Fragment, useEffect, useState } from 'react';
import { useMap, Marker, Popup, Circle } from 'react-leaflet';
import Leaflet from 'leaflet';

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

const Location = ({ value, hasLocation }) => {
	const map = useMap();
	const [coordinates, setCoordinates] = useState(null);
	const popupMessage = hasLocation
		? 'Your Current Location'
		: 'Entered Location';

	useEffect(() => {
		map.locate({ setView: hasLocation });
		map.on('locationfound', (event) => {
			setCoordinates(value || event.latlng);
		});
	}, [map]);

	return coordinates && Map(coordinates, popupMessage);
};

export default Location;
