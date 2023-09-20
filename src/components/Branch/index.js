import { find } from '@laufire/utils/collection';
import React, { useMemo } from 'react';
import denormalize from '../common/helper/denormalize';

const Branch = ({ options, value }) => {
	const denormalizedOptions = useMemo(() => denormalize({ options }),
		[options]);
	const Component = find(denormalizedOptions,
		(option) => option.value === value).component;

	return <Component/>;
};

export default Branch;
