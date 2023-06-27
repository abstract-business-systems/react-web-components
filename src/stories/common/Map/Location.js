/* eslint-disable max-lines-per-function */
/* eslint-disable no-magic-numbers */
import React, { useEffect, useState } from 'react';
import { useMap, Marker, Popup, Circle } from 'react-leaflet';
import Leaflet from 'leaflet';

const Location = () => {
	const map = useMap();
	const [coordinates, setCoordinates] = useState(null);
	const icon = new Leaflet.Icon({
		iconUrl: '/images/marker-icon.png',
		shadowUrl: '/images/marker-shadow.png',
		iconSize: [25, 41],
		iconAnchor: [12, 41],
		popupAnchor: [1, -34],
		shadowSize: [41, 41],
	});

	useEffect(() => {
		map.locate({ setView: true });
		map.on('locationfound', (event) => {
			setCoordinates(event.latlng);
		});
	}, [map]);

	return coordinates
		? <>
			<Circle
				center={ coordinates }
				weight={ 2 }
				color="red"
				fillColor="red"
				sfillOpacity={ 0.1 }
				radius={ 500 }
			/>
			<Marker position={ coordinates } { ...{ icon } }>
				<Popup>Your Current Location</Popup>
			</Marker>
		</>
		: null;
};

export default Location;
