/* eslint-disable no-magic-numbers */
import React from 'react';

const getRandomHexColor = () => {
	const hexColor = Math.random().toString(16)
		.slice(2, 8);

	return `#${ hexColor }`;
};

const Box = ({ title }) =>
	<div style={ { background: getRandomHexColor() } }>{ title }</div>
	;

export default Box;
