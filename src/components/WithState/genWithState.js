import React from 'react';
import { equals, map, result } from '@laufire/utils/collection';
import GlobalContext from '../Document/GlobalContext';
import { pathType } from '@laufire/utils/path';
import { falsy, isEqual } from '@laufire/utils/predicates';
import { isDefined } from '@laufire/utils/reflection';
import { peek } from '@laufire/utils/debug';

const isPath = (prop) => falsy(equals(pathType(prop), 'lax'));

const getValue = ({
	state, data: { value, key },
	default: defaultValue, options,
}) => {
	const extractedValue = result(state, value);

	return isDefined(extractedValue)
		? extractedValue
		: isEqual(key)('options') ? options : defaultValue ;
};

const getProps = ({ props, ...rest }) => map(props, (value, key) =>
	(isPath(value) ? getValue({ ...rest, data: { value, key }}) : value));

const genWithState = ({ Component, ...rest }) =>
	// eslint-disable-next-line react/display-name
	({ action = 'patch', ...props }) =>
		<GlobalContext.Consumer>
			{ ({ state, sendMessage }) => {
				const onChange = ({ data }) => {
					sendMessage({
						data: data,
						action: action,
						id: props.value,
						entity: 'state',
					});
				};

				return (
					<Component { ...{
						onChange,
						...peek(getProps({ props, state, ...rest })),
					} }
					/>);
			} }
		</GlobalContext.Consumer>;

export default genWithState;
