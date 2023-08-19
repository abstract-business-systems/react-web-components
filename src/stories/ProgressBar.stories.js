import React from 'react';
import MuiProgressBar from '../components/ProgressBar';

const component = {
	title: 'Inputs/ProgressBar',
	component: MuiProgressBar,
	argTypes: {
		color: {
			control: 'select',
			options: ['success', 'secondary', 'primary', 'error', 'warning'],
		},
		labelVariant: {
			control: 'select',
			options: [
				'h1',
				'h2',
				'h3',
				'h4',
				'h5',
				'h6',
				'subtitle1',
				'subtitle2',
				'body1',
				'body2',
				'button',
				'caption',
				'overline',
			],
		},
		variant: {
			control: 'select',
			options: ['determinate', 'indeterminate'],
		},
	},
	args: {
		color: 'primary',
		labelVariant: 'body1', 	variant: 'determinate',
	},
};

export default component;

const Template = (args) =>
	<MuiProgressBar { ...args }/>;

export const ProgressBar = Template.bind({});

ProgressBar.args = { value: 1 };
