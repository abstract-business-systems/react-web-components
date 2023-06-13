import * as React from 'react';
import * as Icons from '@mui/icons-material';
import { map, values } from '@laufire/utils/collection';
import {
	Box, List, ListItem, ListItemButton,
	ListItemIcon,
	ListItemText,
	Typography,
} from '@mui/material';

const DrawerItemList = (lists) =>
	values(map(lists, ({ icon, text, typography }) => {
		const Icon = Icons[icon];
		const itemIcon = icon && <Icon/>;

		// Todo: Style should not static.
		return <ListItem key={ text } sx={ { width: '200px' } }>
			<ListItemButton>
				<ListItemIcon>{ itemIcon }</ListItemIcon>
				<ListItemText primary={ text }/>
				<Typography>{ typography }</Typography>
			</ListItemButton>
		</ListItem>;
	}));

const DrawerList = ({ direction, lists, anchor, setAnchor }) =>
	<Box
		onClick={ () =>
			setAnchor({ ...anchor, [direction]: false }) }
	>
		<List>
			<DrawerItemList { ...lists }/>
		</List>
	</Box>;

export default DrawerList;
