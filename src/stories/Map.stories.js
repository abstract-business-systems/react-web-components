import React from 'react';
import LeafletMap from '../components/Map/index';

const component = {
	title: 'Display/Map',
	component: LeafletMap,
};

export default component;

const Template = (args) => <LeafletMap { ...args }/>;

export const Map = Template.bind({});

Map.args = {
	value: {
		latitude: 13.088140,
		longitude: 80.161820,
	},
	zoom: 13,
	scrollWheelZoom: true,
	tileLayerProps: {
		attribution: `'&copy; <a href="http://osm.org/copyright">
					OpenStreetMap
					</a> contributors'`,
		subdomains: 'abc',
		minZoom: 0,
		maxZoom: 18,
		errorTileUrl: '',
		zoomOffset: 0,
		tms: false,
		zoomReverse: false,
		detectRetina: false,
		crossOrigin: false,
		referrerPolicy: false,
	},
	locations: [
		{ lat: 51.505, lng: -0.09 },
		{ lat: 12.998290424100555, lng: 80.33064656249998 },
		{ lat: 9.898261422048769, lng: 78.11140828124998 },
		{ lat: 11.95931614519158, lng: 79.91865925781248 },
		{ lat: 12.930539737078057, lng: 77.51265339843748 },
	],
};
