import React from 'react';
import './index.scss';
import { useWindowSize, useScreen } from 'usehooks-ts';
import helper from './helper';

const Orientation = ({ children, lockOrientation = 'portrait' }) => {
	const { orientation } = useScreen();
	const size = useWindowSize();

	const style = helper.getStyle({ size, orientation, lockOrientation });

	return <div { ...{ style } } className="orientation">
		{ children }
	</div>;
};

export default Orientation;
