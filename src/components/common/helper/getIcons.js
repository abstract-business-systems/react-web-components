import React from 'react';
import { filter, map } from '@laufire/utils/collection';
import { truthy } from '@laufire/utils/predicates';
import Icon from '../Icon';

const getIcons = (icons) => {
	const Icons = filter(icons, truthy);

	return map(Icons, (icon) => <Icon { ...{ icon } }/>);
};

export default getIcons;
