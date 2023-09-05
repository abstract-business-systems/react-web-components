import React, { useEffect } from 'react';
import GlobalContext from '../Document/GlobalContext';
import { resolve } from '@laufire/utils/path';
import { omit, result, values } from '@laufire/utils/collection';
import buildEvent from '../common/helper/buildEvent';

const TransformingComponent = (context) => {
	const { onChange, fn } = context;
	const transformedProps = omit(context, ['onChange', 'fn', 'name']);

	useEffect(() => {
		onChange(buildEvent({ value: fn(transformedProps) }));
	}, values(transformedProps));
};

const Transformation = (props) => {
	const { data } = props;

	return (
		<GlobalContext.Consumer>
			{ (context) => {
				const path = resolve(
					'./', context.parentPath, data
				);
				const entity = result(context.state, path);

				return <TransformingComponent { ...{ ...props, entity } }/>;
			} }
		</GlobalContext.Consumer>
	);
};

export default Transformation;
