import React from 'react';
import LeafletMap from './common/Map/index';

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
};
