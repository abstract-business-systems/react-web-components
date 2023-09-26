import { useEffect } from 'react';
import { omit, values } from '@laufire/utils/collection';
import buildEvent from '../common/helper/buildEvent';

const excludedProps = ['onChange', 'fn', 'name', 'value'];

const Transformation = (props) => {
	const data = omit(props, excludedProps);
	const { onChange, fn } = props;

	useEffect(() => {
		onChange(buildEvent({ value: fn(data) }));
	}, values(data));

	return null;
};

export default Transformation;
