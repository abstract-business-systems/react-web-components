import React from 'react';
import MenuItem from '@mui/material/MenuItem';
import { ListItemIcon, ListItemText } from '@mui/material';
import Icon from '../Icon';
import buildEvent from '../helper/buildEvent';
import { nothing } from '@laufire/utils/fn';

const MenuItems = ({ data, sx = {}, setAnchorEl, onChange = nothing }) =>
	data.map(({ icon, children }, key) =>
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
		</MenuItem>);

export default MenuItems;
