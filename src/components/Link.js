import React from 'react';
import MuiLink from '@mui/material/Link';

const Link = ({ children, ...rest }) =>
	<MuiLink { ...rest }>{ children }</MuiLink>;

export default Link;
