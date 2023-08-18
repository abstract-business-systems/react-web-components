import React from 'react';
import tile from './helper/tile';
import { Box } from '@mui/material';

const defaultConfig = [
	{
		flex: '1 0 0',
		border: '2px solid black',
		boxSizing: 'border-box',
		overflow: 'auto',
	},
];

const Layout = ({ children, config = defaultConfig }) => {
	const tiledConfig = tile(config, children.length);

	return (
		<Box className="layout">
			{ children.map((child, i) =>
				<Box
					key={ i }
					style={ { ...tiledConfig[i] } }
				>{ child }</Box>) }
		</Box>);
};

export default Layout;
