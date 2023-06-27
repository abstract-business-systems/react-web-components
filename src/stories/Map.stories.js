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
	// eslint-disable-next-line no-magic-numbers
	value: [13.088140, 80.161820],
	zoom: 13,
	scrollWheelZoom: true,
	currentLocation: false,
};
