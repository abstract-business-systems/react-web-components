import React from 'react';
import { Typography as MuiTypography } from '@mui/material';

const Typography = ({ value, children, ...args }) =>
	<MuiTypography { ...args }>{ value }{ children }</MuiTypography>;

export default Typography;
