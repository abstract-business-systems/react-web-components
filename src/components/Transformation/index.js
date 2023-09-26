import React, { useEffect } from 'react';
import { omit, values } from '@laufire/utils/collection';
import buildEvent from '../common/helper/buildEvent';
import GlobalContext from '../Document/GlobalContext';

const excludedProps = ['onChange', 'fn', 'name', 'value'];

const actions = {
	string: ({ transforms, fn, data }) => transforms[fn](data),
	function: ({ fn, data }) => fn(data),
};

const Transform = (props) => {
	const { onChange, fn, data } = props;

	useEffect(() => {
		const value = actions[typeof fn](props);

		onChange(buildEvent({ value }));
	}, values(data));
};

const Transformation = (props) => {
	const data = omit(props, excludedProps);

	return (
		<GlobalContext.Consumer>
			{ ({ transforms }) =>
				<Transform { ...{ ...props, data, transforms } }/> }
		</GlobalContext.Consumer>
	);
};

export default Transformation;
