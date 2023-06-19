import React from 'react';
import { render } from '@testing-library/react';
import MuiPagination from '@mui/material/Pagination';
import Pagination from './Pagination';
import { rndBetween, rndValue } from '@laufire/utils/random';

jest.mock('@mui/material/Pagination', () => jest.fn());

test('Pagination', () => {
	const boolean = rndValue([true, false]);
	const props = {
		count: rndBetween(),
		color: 'secondary',
		disabled: boolean,
		variant: 'outlined',
		size: 'small',
		shape: 'rounded',
		showFirstButton: boolean,
		showLastButton: boolean,
		hidePrevButton: boolean,
		hideNextButton: boolean,
		defaultPage: rndBetween(),
	};

	MuiPagination.mockReturnValue(<div/>);

	const {
		container:
		{ children: [rootElement] },
	} = render(<Pagination { ...props }/>);

	expect(rootElement).toBeInTheDocument();
	expect(MuiPagination.mock.calls[0][0]).toEqual(props);
});
