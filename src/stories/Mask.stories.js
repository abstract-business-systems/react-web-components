import React, { Fragment, useState } from 'react';
import MaskComponent from '../components/Mask';
import parent from './assets/direction.svg';
import child from './assets/colors.svg';
import { peek } from '@laufire/utils/debug';
import { Box } from '@mui/material';

const component = {
	title: 'Display/Mask',
	component: MaskComponent,
	argTypes: {
		trigger: {
			type: 'select',
			options: ['click', 'hover'],
		},
	},
	args: { trigger: 'click' },
};

export default component;

const Template = (args) => {
	const [state, setState] = useState('');

	const onChange = ({ target: { value }}) => {
		setState(value);
	};

	return (
		<Fragment>
			<MaskComponent { ...{ ...args, onChange } }/>
			<Box sx={ { width: '10%', height: '5vh', background: state } }/>
			<Box>{ state }</Box>
		</Fragment>
	);
};

export const Mask = Template.bind({});

Mask.args = {
	children: <img className="child" src={ child } alt="img"/>,
	onChange: peek,
	src: parent,
	style: {},
	resize: { refreshRate: 250 },
};
