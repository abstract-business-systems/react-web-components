import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { Checkbox as MuiCheckbox } from '@mui/material';
import Checkbox from './Checkbox';
import * as buildEvent from '../common/helper/buildEvent';
import { rndString, rndValue } from '@laufire/utils/random';
import { range } from '@laufire/utils/collection';

jest.mock('@mui/material/Checkbox', () => jest.fn());

const collectionLength = 10;

describe('Checkbox', () => {
	const props = {
		value: rndValue([true, false]),
		...range(0, collectionLength).reduce((acc) => ({
			...acc,
			[rndString()]: Symbol(rndString()),
		}), {}),
	};
	const buildValue = Symbol('buildValue');
	const { value, ...rest } = props;

	test('Renders Checkbox component with props', () => {
		MuiCheckbox.mockReturnValue(<div/>);

		const {
			container:
				{ children: [rootElement] },
		} = render(<Checkbox { ...props }/>);

		expect(rootElement).toBeInTheDocument();
		expect(MuiCheckbox.mock.calls[0][0]).toEqual({
			...rest,
			checked: value,
			onChange: expect.any(Function),
		});
	});

	test('Fires onChange event when Checkbox is clicked', () => {
		MuiCheckbox.mockImplementation(({ onChange }) =>
			<div
				role="checkbox"
				aria-checked="false"
				onClick={ onChange }
			/>);
		jest.spyOn(buildEvent, 'default').mockReturnValue(buildValue);

		const onChange = jest.fn();
		const checked = rndString();

		render(<Checkbox { ...{ onChange } }/>);
		const container = screen.getByRole('checkbox');

		fireEvent.click(container, { target: { checked }});

		expect(onChange).toHaveBeenCalledWith(buildValue);
		expect(buildEvent.default).toHaveBeenCalledWith({ value: checked });
	});
});
