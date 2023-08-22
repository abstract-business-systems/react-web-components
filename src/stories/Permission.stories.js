import React, { useState } from 'react';
import PermissionsComp from '../components/Permissions';

const component = {
	title: 'Permissions',
	component: PermissionsComp,
};

export default component;

const Template = (args) => {
	const [state, setState] = useState([]);

	return (
		<div>
			<PermissionsComp
				{ ...args }
				onLoad={ ({ target: { value }}) => setState(value) }
				onChange={ ({ target: { value }}) =>
					setState((prev) => ({ ...prev, ...value })) }
			/>
			{ JSON.stringify(state) }
		</div>
	);
};

export const Permissions = Template.bind({});
