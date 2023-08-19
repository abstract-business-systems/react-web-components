import React from 'react';
import Box from '@mui/material/Box';
import { SpeedDial as MuiSpeedDial } from '@mui/material';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import { nothing } from '@laufire/utils/predicates';
import buildEvent from './common/helper/buildEvent';
import getIcons from './common/helper/getIcons';

const getItem = (ele) => ({
	...getIcons({ icon: ele.icon }),
	tooltipTitle: ele.children,
});

const MuiSpeedDialAction = ({ onChange = nothing, data, ...rest }) =>
	data.map((ele, key) =>
		<SpeedDialAction
			key={ key }
			{ ...{ ...getItem(ele), ...rest } }
			onClick={ () => onChange(buildEvent({ value: ele.children })) }
		/>);

const SpeedDial = (args) => {
	const { hidden, direction, icon, value, data, ...rest } = args;

	return (
		<Box>
			<MuiSpeedDial { ...{
				ariaLabel: 'SpeedDial basic example',
				hidden: hidden,
				direction: direction,
				icon: <SpeedDialIcon { ...getIcons({ openIcon: icon }) }/>,
			} }
			>
				<MuiSpeedDialAction { ...{ data, ...rest } }/>
			</MuiSpeedDial>
			<Box>{ value }</Box>
		</Box>
	);
};

export default SpeedDial;
