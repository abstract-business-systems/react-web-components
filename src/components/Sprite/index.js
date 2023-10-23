import React from 'react';
import { nothing } from '@laufire/utils/predicates';

const Sprite = ({ path, style, onClick = nothing, ...props }) =>
	<img
		{ ...{
			onClick: (evt) => {
				onClick(evt);

				evt.stopPropagation();
			},
			style: {
				clipPath: `polygon(${ path })`,
				...style,
			},
			alt: 'Sprite',
			...props,
		} }
	/>;

export default Sprite;
