import React from 'react';
import MenuItem from '@mui/material/MenuItem';
import { ListItemIcon, ListItemText, Typography } from '@mui/material';
import Icon from '../Icon';
import buildEvent from '../helper/buildEvent';
import { nothing } from '@laufire/utils/fn';

// TODO: Discuss the requirement of typography.

const MenuItems = ({ data, sx = {}, setAnchorEl, onChange = nothing }) =>
	data.map(({ icon, typography, children }, key) =>
		<MenuItem
			key={ key }
			{ ...{
				onClick: () => {
					setAnchorEl(null);
					onChange(buildEvent({ value: children }));
				},
				sx: sx,
			} }
		>
			<ListItemIcon>{ icon && <Icon { ...{ icon } }/> }</ListItemIcon>
			<ListItemText>{ children }</ListItemText>
			<Typography>{ typography }</Typography>
		</MenuItem>);

export default MenuItems;
