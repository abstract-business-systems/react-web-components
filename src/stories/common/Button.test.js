import React from 'react';
import { render } from '@testing-library/react';
import { Button as MuiButton } from '@mui/material';
import { rndString } from '@laufire/utils/random';
import { map } from '@laufire/utils/collection';
import * as getIcons from './getIcons';
import Button from './Button';

test('Button', () => {
	const props = {
		className: rndString(),
		children: 'HI',
		variant: 'contained',
		size: 'large',
		color: 'success',
		disabled: false,
		disableElevation: true,
		startIcon: 'Delete',
		fullWidth: false,
		href: 'https://mui.com/material-ui/react-button/',
		disableFocusRipple: true,
		disableRipple: false,
		sx: { border: '10px solid black' },
	};
	const { startIcon, endIcon } = props;

	const iconValue = map({ startIcon, endIcon }, () => rndString());

	jest.spyOn(getIcons, 'default').mockReturnValue(iconValue);
	jest.spyOn(MuiButton, 'render').mockImplementation(({ children }) =>
		<div>{ children }</div>);

	const {
		container:
		{ children: [rootElement] },
	} = render(<Button { ...props }/>);

	expect(rootElement).toBeInTheDocument();
	expect(rootElement).toHaveTextContent(props.children || 'Button');
	expect(MuiButton.render.mock.calls[0][0])
		.toEqual({ ...props, ...iconValue });
	expect(getIcons.default).toHaveBeenCalledWith({ startIcon, endIcon });
});
