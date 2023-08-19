import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import MuiPagination from '@mui/material/Pagination';
import Pagination from './Pagination';
import * as buildEvent from './common/helper/buildEvent';
import { rndString } from '@laufire/utils/random';
import { range } from '@laufire/utils/collection';

jest.mock('@mui/material/Pagination', () => jest.fn());
const collectionLength = 10;

describe('Checkbox', () => {
	const props = {
		...range(0, collectionLength).reduce((acc) => ({
			...acc,
			[rndString()]: Symbol(rndString()),
		}), {}),
	};
	const buildValue = Symbol('buildValue');
	const { ...rest } = props;

	test('Renders Checkbox component with props', () => {
		MuiPagination.mockReturnValue(<div/>);

		const {
			container:
		{ children: [rootElement] },
		} = render(<Pagination { ...props }/>);

		expect(rootElement).toBeInTheDocument();
		expect(MuiPagination.mock.calls[0][0]).toEqual({
			...rest,
			onChange: expect.any(Function),
		});
	});

	test('Fires onChange event when pagination element is clicked', () => {
		const role = rndString();

		MuiPagination.mockImplementation(({ onChange }) =>
			<div
				role={ role }
				onClick={ onChange }
			/>);
		jest.spyOn(buildEvent, 'default').mockReturnValue(buildValue);

		const onChange = jest.fn();
		const innerText = rndString();

		render(<Pagination { ...{ onChange } }/>);
		const container = screen.getByRole(role);

		fireEvent.click(container, { target: { innerText }});

		expect(onChange).toHaveBeenCalledWith(buildValue);
		expect(buildEvent.default)
			.toHaveBeenCalledWith({ value: innerText });
	});
});
