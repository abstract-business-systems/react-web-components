import * as React from 'react';
import IconButton from './IconButton';
import { filter, map } from '@laufire/utils/collection';
import { isDefined } from '@laufire/utils/reflection';

const getIcons = (icons, sx) => {
	const Icons = filter(icons, isDefined);

	return map(Icons, (icon) =>
		<IconButton sx={ sx } icon={ icon }/>);
};

export default getIcons;
