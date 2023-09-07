import React, { useEffect } from 'react';
import GlobalContext from '../Document/GlobalContext';
import { resolve } from '@laufire/utils/path';
import { omit, reduce, result, values } from '@laufire/utils/collection';
import buildEvent from '../common/helper/buildEvent';

const excludedProps = ['onChange', 'fn', 'name'];

const TransformingComponent = ({ props, data }) => {
	const { onChange, fn } = props;

	useEffect(() => {
		onChange(buildEvent({ value: fn(data) }));
	}, values(data));
};

const extractData = ({ props, parentPath, state }) =>
	reduce(
		props,
		(
			acc, cur, key
		) => {
			const path = resolve(parentPath, cur);

			return { ...acc, [key]: result(state, path) };
		},
		{}
	);

const Transformation = (props) => {
	const filteredProps = omit(props, excludedProps);

	return (
		<GlobalContext.Consumer>
			{ (context) => {
				const data = extractData({
					...context,
					props: filteredProps,
				});

				return <TransformingComponent { ...{ data, props } }/>;
			} }
		</GlobalContext.Consumer>
	);
};

export default Transformation;
