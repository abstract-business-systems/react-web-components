import React from 'react';
import Menu from '../Menu/index.js';
import SpeedDial from '../SpeedDial';

const Navigation = {
	menu: Menu,
	speedDial: SpeedDial,
};

const ActionSet = (args) => {
	const { type } = args;

	const Component = Navigation[type];

	return <Component { ...args }/>;
};

export default ActionSet;
