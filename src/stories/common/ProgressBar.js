import * as React from 'react';
import MuiLinearProgress from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

const ProgressBar = (args) => {
	const {
		value, color = 'primary', variant = 'determinate',
		labelVariant = 'body1', ...rest
	} = args;

	return (
		<Box>
			<MuiLinearProgress { ...{ color, value, variant, ...rest } }/>
			<Typography { ...{ color: color, variant: labelVariant } }>
				{ `${ Math.round(value) }%` }</Typography>
		</Box>);
};

export default ProgressBar;
