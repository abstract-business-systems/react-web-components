import React from 'react';
import TabList from '@mui/lab/TabList';
import { Tab as MuiTab } from '@mui/material';
import { map, values } from '@laufire/utils/collection';
import getIcons from '../helper/getIcons';

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
			<MuiTab { ...{
				key: tabKey,
				...styles[type].text && { label: content.label },
				...styles[type].icon && getIcons({ icon: content.icon }),
				value: tabKey,
				onClick: () => onClick(tabKey),
			} }
			/>)) }
	</TabList>;

export default TabButtons;
