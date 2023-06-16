import * as React from 'react';
import TabList from '@mui/lab/TabList';
import { Tab as MuiTab } from '@mui/material';
import { map, values } from '@laufire/utils/collection';
import * as Icons from '@mui/icons-material';

const styles = {
	iconOnly: {
		icon: true,
		text: false,
	},
	textOnly: {
		icon: false,
		text: true,
	},
	iconAndText: {
		icon: true,
		text: true,
	},
};

const getLabel = (tabButton, { label }) =>
	tabButton.text && { label };

const getIcon = (tabButton, { icon }) => {
	const TabIcon = Icons[icon];
	const hasIcon = tabButton.icon && TabIcon;

	return hasIcon && { icon: <TabIcon/> };
} ;

const TabButtons = ({
	color, contents,
	onClick, orientation, type, centered,
}) =>
	<TabList
		orientation={ orientation }
		textColor={ color }
		indicatorColor={ color }
		centered={ centered }
	>
		{ values(map(contents, (content, tabKey) =>
			<MuiTab
				key={ tabKey }
				{ ...getLabel(styles[type], content) }
				{ ...getIcon(styles[type], content) }
				value={ tabKey }
				onClick={ () => onClick(tabKey) }

			/>)) }
	</TabList>;

export default TabButtons;
