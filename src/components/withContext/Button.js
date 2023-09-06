import React from 'react';
import { Button as ButtonWithState } from '../WithState';

const Button = ({ onClick, value, props }) =>
	<ButtonWithState { ...{
		...props,
		onClick: { ...onClick, data: value },
	} }
	/>;

export default Button;
