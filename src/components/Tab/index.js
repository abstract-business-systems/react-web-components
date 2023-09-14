import React, { useMemo } from 'react';
import '../../stories/styles/global.scss';
import clsx from 'clsx';
import Box from '@mui/material/Box';
import { defined, nothing } from '@laufire/utils/fn';
import buildEvent from '../common/helper/buildEvent';
import TabContext from './TabContext';
import useFollowState from '../hook/useFollowState';
import { map, merge, values } from '@laufire/utils/collection';

const tabStyle = { vertical: 'absTab-vertical' };

const denormalize = (data) => {
	const res = map(data, (obj, key) => {
		const transformedValue = defined(obj.value, { value: key });

		return merge(
			{}, obj, transformedValue
		);
	});

	return values(res);
};

const Tab = (props) => {
	const {
		orientation, direction, className, value: initialValue,
		onChange = nothing,	data,
	} = props;

	const handleClick = ({ curValue }) =>
		onChange(buildEvent({ value: curValue }));

	const [value, setValue] = useFollowState(initialValue, handleClick);

	const dir = direction === 'right' ? 'rtl' : 'ltr';

	const denormalizedData = useMemo(() => denormalize(data), [data]);
	const extendedProps = {
		...props, setValue: setValue, value: value,
		data: denormalizedData,
	};

	return (
		<Box dir={ dir } className={ clsx(tabStyle[orientation], className) }>
			<TabContext { ...extendedProps }/>
		</Box>
	);
};

export default Tab;
