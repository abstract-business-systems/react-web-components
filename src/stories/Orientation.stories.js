import React from 'react';
import OrientationComponent from '../components/Orientation';

const component = {
	title: 'Display/Orientation',
	component: OrientationComponent,
	argTypes: {
		lockOrientation: {
			control: 'select',
			options: ['portrait', 'landscape'],
		},
	},
	args: { lockOrientation: 'portrait', children: 'hello' },
};

export default component;

const Template = (args) =>
	<OrientationComponent { ... args }/>;

export const Orientation = Template.bind({});
