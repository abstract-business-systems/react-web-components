import React from 'react';
import MenuItem from '@mui/material/MenuItem';
import * as Icons from '@mui/icons-material';
import { Box, ListItemIcon, ListItemText, Typography } from '@mui/material';

const MenuItems = ({ data, sx, setValue }) =>
	data.map(({ icon, typography, children }, key) => {
		const Icon = Icons[icon];
		const ItemIcon = () => (icon ? <Icon/> : '');

		return (
			<Box key={ key }>
				<MenuItem
					onClick={ () => setValue((prev) =>
						({ ...prev, anchorEl: null, content: children })) }
					sx={ sx }
				><ListItemIcon><ItemIcon/></ListItemIcon>
					<ListItemText>{ children }</ListItemText>
					<Typography>{ typography }</Typography></MenuItem>
			</Box>);
	});

export default MenuItems;
