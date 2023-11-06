import React, { useEffect, useState } from 'react';
import './index.scss';
import { useOrientation } from '@uidotdev/usehooks';
import { useWindowSize } from 'usehooks-ts';
import helper from './helper';

const Orientation = ({ children, lockOrientation = 'portrait' }) => {
	const orientation = useOrientation();
	const size = useWindowSize();

	const [type, setType] = useState('');

	useEffect(() => {
		orientation.type.indexOf('landscape') >= 0
			&& setType(orientation.type);
	}, [orientation.type]);

	const style = helper.getStyle({ size, orientation, lockOrientation, type });

	return <div { ...{ style } } className="orientation">
		{ children }
	</div>;
};

export default Orientation;
