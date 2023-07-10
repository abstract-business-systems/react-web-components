import React from 'react';
import { map, values } from '@laufire/utils/collection';
import {
	List, ListItem, ListItemButton,
	ListItemIcon, ListItemText, Typography,
} from '@mui/material';
import Icon from '../Icon';

const DrawerItemList = ({ data, sx = {}}) =>
	values(map(data, ({ icon, text, typography }) =>
		<ListItem key={ text } sx={ sx }>
			<ListItemButton>
				{ icon && <ListItemIcon><Icon { ...{ icon } }/></ListItemIcon> }
				<ListItemText primary={ text }/>
				<Typography>{ typography }</Typography>
			</ListItemButton>
		</ListItem>));

const DrawerList = (args) =>
	<List>
		<DrawerItemList { ...args }/>
	</List>;

export default DrawerList;
