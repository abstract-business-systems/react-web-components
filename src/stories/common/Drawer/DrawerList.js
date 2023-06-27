import * as React from 'react';
import { map, values } from '@laufire/utils/collection';
import {
	Box, List, ListItem, ListItemButton,
	ListItemIcon,
	ListItemText,
	Typography,
} from '@mui/material';
import IconButton from '../IconButton';

const DrawerItemList = ({ lists, sx }) =>
	values(map(lists, ({ icon, text, typography }) => {
		const itemIcon = icon && <IconButton icon={ icon }/>;

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
