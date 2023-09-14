import React from 'react';
import TabList from '@mui/lab/TabList';
import { Tab as MuiTab } from '@mui/material';
import { map } from '@laufire/utils/collection';

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
		{ map(data, (content, tabKey) =>
			<MuiTab { ...{
				key: tabKey,
				...styles[type].text && { label: content.label },
				...styles[type].icon && { icon: content.icon },
				value: content.value,
				onClick: () => setValue(content.value),
			} }
			/>) }</TabList>;

export default TabButtons;
