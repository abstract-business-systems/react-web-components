import * as React from 'react';
import * as Icons from '@mui/icons-material';
import { map, values } from '@laufire/utils/collection';
import {
	Box, List, ListItem, ListItemButton,
	ListItemIcon,
	ListItemText,
	Typography,
} from '@mui/material';

const DrawerItemList = ({ lists, sx }) =>
	values(map(lists, ({ icon, text, typography }) => {
		const Icon = Icons[icon];
		const itemIcon = icon && <Icon/>;

		return <ListItem key={ text } sx={ sx }>
			<ListItemButton>
				<ListItemIcon>{ itemIcon }</ListItemIcon>
				<ListItemText primary={ text }/>
				<Typography>{ typography }</Typography>
			</ListItemButton>
		</ListItem>;
	}));

const DrawerList = ({ lists, sx }) =>
	<Box>
		<List>
			<DrawerItemList { ...{ lists, sx } }/>
		</List>
	</Box>;

export default DrawerList;
