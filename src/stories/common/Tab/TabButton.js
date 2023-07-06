import React from 'react';
import TabList from '@mui/lab/TabList';
import { Tab as MuiTab } from '@mui/material';
import { map, values } from '@laufire/utils/collection';
import getIcons from '../helper/getIcons';

// Todo: Necessity of the icon only, text only and icon & text in tab.

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

const TabButtons = ({
	textColor, data, indicatorColor,
	setValue, orientation, type, centered,
}) =>
	<TabList { ...{
		orientation,
		textColor,
		indicatorColor,
		centered,
	} }
	>
		{ values(map(data, (content, tabKey) =>
			<MuiTab { ...{
				key: tabKey,
				...styles[type].text && { label: content.label },
				...styles[type].icon && getIcons({ icon: content.icon }),
				value: tabKey,
				onClick: () => setValue(tabKey),
			} }
			/>)) }</TabList>;

export default TabButtons;
