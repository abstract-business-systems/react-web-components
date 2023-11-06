import React from 'react';
import './index.scss';
import { useOrientation } from '@uidotdev/usehooks';
import { useWindowSize } from 'usehooks-ts';
import helper from './helper';

const Orientation = ({ children, lockOrientation = 'portrait' }) => {
	const orientation = useOrientation();
	const size = useWindowSize();

	const style = helper.getStyle({ size, orientation, lockOrientation });

	return <div { ...{ style } } className="orientation">
		{ children }
	</div>;
};

export default Orientation;
