import PropTypes from 'prop-types';
import { Button as MuiButton } from '@mui/material';
import * as React from 'react';
import IconButton from './IconButton';
import { reduce } from '@laufire/utils/collection';

const Icon = ({ startIcon, endIcon }) => reduce(
	{ startIcon, endIcon }, (
		acc, cur, key
	) => ({
		...acc,
		...cur && { [key]: <IconButton icon={ cur }/> },
	}), {}
);

const Button = ({ children = 'Button', ...rest }) =>
	<MuiButton { ...{ ...rest, ...Icon(rest) } }>
		{ children }
	</MuiButton>;

export default Button;

Button.propTypes = { children: PropTypes.node.isRequired };
