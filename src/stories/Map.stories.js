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
};
