import * as React from 'react';
import Box from '@mui/material/Box';
import { SpeedDial as MuiSpeedDial } from '@mui/material';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import * as Icons from '@mui/icons-material';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';

// Todo: Rename getItemIcon.
const itemIcon = (ele) => {
	const Icon = Icons[ele.icon];

	return {
		icon: Icon && <Icon/>,
		tooltipTitle: ele.children,
	};
};

// Todo: Rename getOpenIcon.
const openIcon = (icon) => {
	const Icon = Icons[icon];

	return { openIcon: Icon && <Icon/> };
};

const MuiSpeedDialAction = ({ setValue, data, ...rest }) =>
	data.map((ele, key) =>
		<SpeedDialAction
			key={ key }
			{ ...{ ...itemIcon(ele), ...rest } }
			onClick={ () => setValue(ele.children) }
		/>);

const SpeedDial = (args) => {
	const { hidden, direction, icon, data, ...rest } = args;
	const [value, setValue] = React.useState('');

	return (
		<Box>
			<MuiSpeedDial
				ariaLabel="SpeedDial basic example"
				hidden={ hidden }
				direction={ direction }
				icon={ <SpeedDialIcon { ...openIcon(icon) }/> }
			>
				{ /* // Todo: Call by Component syntax. */ }
				{ MuiSpeedDialAction({ setValue, data, ...rest }) }
			</MuiSpeedDial>
			<Box>{ value }</Box>
		</Box>
	);
};

export default SpeedDial;
