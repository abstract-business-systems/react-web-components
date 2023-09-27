import React, { useEffect } from 'react';
import { map, omit, values } from '@laufire/utils/collection';
import buildEvent from '../common/helper/buildEvent';
import GlobalContext from '../Document/GlobalContext';

const excludedProps = ['value'];

const actions = {
	string: (props) => {
		const { transforms, fn } = props;

		return transforms[fn](props);
	},
	function: (props) => {
		const { fn } = props;

		return fn(props);
	},
	object: (props) => {
		const { fn } = props;

		return map(fn, (func) => func(props));
	},
};

const Transform = (props) => {
	const { onChange, fn, dependencies } = props;

	useEffect(() => {
		const value = actions[typeof fn](props);

		onChange(buildEvent({ value }));
	}, values(dependencies));
};

const Transformation = (props) => {
	const dependencies = omit(props, excludedProps);

	return (
		<GlobalContext.Consumer>
			{ ({ transforms }) =>
				<Transform { ...{ ...props, dependencies, transforms } }/> }
		</GlobalContext.Consumer>
	);
};

export default Transformation;
