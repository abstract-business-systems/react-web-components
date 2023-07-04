import React from 'react';
import IconButton from '../IconButton';
import { filter, map } from '@laufire/utils/collection';
import { truthy } from '@laufire/utils/predicates';

const getIcons = (icons, sx) => {
	const Icons = filter(icons, truthy);

	return map(Icons, (icon) =>
		<IconButton { ...{ sx, icon } }/>);
};

export default getIcons;
