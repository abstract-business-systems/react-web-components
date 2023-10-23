import React from 'react';
import SpriteComponent from '../components/Sprite';
import blue from './assets/child.png';
import mask from './assets/mask.png';
import stackalt from './assets/stackalt.svg';
import { keys } from '@laufire/utils/collection';

const pathOptions = {
	triangle: '50% 0%, 0% 100%, 100% 100%',
	star: '50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%,'
		+ ' 21% 91%, 32% 57%, 2% 35%, 39% 35%',
	cross: '20% 0%, 0% 20%, 30% 50%, 0% 80%, 20% 100%, 50% 70%, 80%'
		+ ' 100%, 100% 80%, 70% 50%, 100% 20%, 80% 0%, 50% 30%',
};

const srcOptions = { blue, mask, stackalt };

const component = {
	title: 'Display/Sprite',
	argTypes: {
		path: {
			control: 'select',
			options: keys(pathOptions),
		},
		src: {
			control: 'select',
			options: keys(srcOptions),
		},
	},
	args: { src: 'blue', path: 'star' },
};

export default component;

const Template = ({ ...args }) => {
	const path = pathOptions[args.path];
	const src = srcOptions[args.src];

	return <SpriteComponent { ...{ ...args, path, src } }/>;
};

export const Sprite = Template.bind({});

Sprite.args = { style: { width: '40%', height: '40%' }};
