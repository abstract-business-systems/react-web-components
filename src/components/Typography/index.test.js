import React from 'react';
import { render } from '@testing-library/react';
import MuiTypography from '@mui/material/Typography';
import Typography from './Typography';
import { rndString, rndValue } from '@laufire/utils/random';

jest.mock('@mui/material/Typography', () => jest.fn());

test('Typography', () => {
	const boolean = rndValue([true, false]);
	const props = {
		children: rndString(),
		variant: 'h5',
		align: 'left',
		gutterBottom: boolean,
		noWrap: boolean,
	};

	MuiTypography.mockReturnValue(<div/>);

	const {
		container:
		{ children: [rootElement] },
	} = render(<Typography { ...props }/>);

	expect(rootElement).toBeInTheDocument();
	expect(MuiTypography.mock.calls[0][0]).toEqual(props);
});
