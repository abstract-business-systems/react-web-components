/* eslint-disable max-lines-per-function */
import React from 'react';
import {
	Box,
	ListItemText,
	MenuItem, MenuList,
} from '@mui/material';
import { Link } from 'react-router-dom';

const GetMenuItem = ({ name, label }, key) =>
	<MenuItem
		key={ key }
		to={ name.replace('/*', '') }
		component={ Link }
	>
		<ListItemText>
			{ label }
		</ListItemText>
	</MenuItem>;

const NavMenu = ({ value }) =>
	<MenuList>
		{ value.map(({ children, ...rest }, key) =>
			<Box key={ key }>
				{ GetMenuItem(rest) }
				{ children && children.map(GetMenuItem) }
			</Box>) }
	</MenuList>;

export default NavMenu;
