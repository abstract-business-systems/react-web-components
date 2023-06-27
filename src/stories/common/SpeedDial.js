import * as React from 'react';
import Box from '@mui/material/Box';
import { SpeedDial as MuiSpeedDial } from '@mui/material';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import * as Icons from '@mui/icons-material';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import { nothing } from '@laufire/utils/predicates';
import buildEvent from '../common/helper/buildEvent';

const getItemIcon = (ele) => {
	const Icon = Icons[ele.icon];

	return {
		icon: Icon && <Icon/>,
		tooltipTitle: ele.children,
	};
};

const getOpenIcon = (icon) => {
	const Icon = Icons[icon];

	return { openIcon: Icon && <Icon/> };
};

const MuiSpeedDialAction = ({ onChange = nothing, data, ...rest }) =>
	data.map((ele, key) =>
		<SpeedDialAction
			key={ key }
			{ ...{ ...getItemIcon(ele), ...rest } }
			onClick={ () => onChange(buildEvent({ value: ele.children })) }
		/>);

const SpeedDial = (args) => {
	const { hidden, direction, icon, value, data, ...rest } = args;

	return (
		<Box>
			<MuiSpeedDial
				ariaLabel="SpeedDial basic example"
				hidden={ hidden }
				direction={ direction }
				icon={ <SpeedDialIcon { ...getOpenIcon(icon) }/> }
			>
				<MuiSpeedDialAction { ...{ data, ...rest } }/>
			</MuiSpeedDial>
			<Box>{ value }</Box>
		</Box>
	);
};

export default SpeedDial;
