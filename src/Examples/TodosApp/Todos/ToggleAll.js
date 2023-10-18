import React, { Fragment } from 'react';
import { Checkbox } from '../../../components/WithState';
import ToggleAllTransform from './ToggleAllTransform';

const toggleAllProps = {
	value: '/toggleAll/',
	onChange: [
		{ to: '/' },
		{
			action: 'updateAll',
			entity: 'todos',
			to: '/todoClient/',
			data: './',
		},
	],
};

const ToggleAll = () =>
	<Fragment>
		<ToggleAllTransform/>
		<Checkbox { ...toggleAllProps }/>
	</Fragment>;

export default ToggleAll;
