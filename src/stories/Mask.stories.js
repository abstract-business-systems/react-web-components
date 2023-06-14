import { React } from 'react';
import MaskComponent from './common/Mask';
import parent from './assets/direction.svg';
import child from './assets/colors.svg';
import { peek } from '@laufire/utils/debug';

const component = {
	title: 'Display/Mask',
	component: MaskComponent,
};

export default component;

const Template = (args) => <MaskComponent { ...args }/>;

export const Mask = Template.bind({});

Mask.args = {
	children: <img className="child" src={ child } alt="img"/>,
	onChange: peek,
	src: parent,
	style: {},
};
