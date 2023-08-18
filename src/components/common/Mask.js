import React, { useRef, useEffect, useState, Fragment } from 'react';
import { identity } from '@laufire/utils/fn';
import color from './helper/color';
import '../../stories/styles/global.scss';
import buildEvent from './helper/buildEvent';
import Container from './Container';

const setCanvasImage = ({ canvasRef, src, image, state }) => {
	const canvas = canvasRef.current;
	const context = canvas.getContext('2d', { willReadFrequently: true });

	canvas.width = state.width;
	canvas.height = state.height;

	image.onload = () => {
		context.drawImage(
			image, 0, 0, state.width, state.width
		);
	};
	image.src = src;
};

const getColor = (evt, canvasRef) => {
	const canvas = canvasRef.current;
	const context = canvas.getContext('2d', { willReadFrequently: true });
	const rect = canvas.getBoundingClientRect();
	const x = evt.clientX - rect.left;
	const y = evt.clientY - rect.top;
	const { data } = context.getImageData(
		x, y, 1, 1
	);

	return color.rgbToHex(data);
};

const triggers = {
	click: 'onClick',
	hover: 'onMouseMove',
};

const MaskContainer = (props) => {
	const { onChange = identity, trigger, state, children } = props;
	const { width, height } = state;
	const canvasRef = useRef(null);

	useEffect(() => {
		setCanvasImage({ ...props, canvasRef });
	}, [width, height]);

	return <Fragment>{ children }
		<canvas
			ref={ canvasRef }
			className="absMask-canvas"
			{ ...{
				[triggers[trigger]]: (evt) =>
					onChange(buildEvent({ value: getColor(evt, canvasRef) })),
			} }
		/></Fragment>;
};

const Mask = (props) => {
	const { resize } = props;
	const image = new Image();
	const [state, setState] = useState({ width: 0, height: 0 });

	const enhancedProps = { ...props, state, setState, image };

	const containerOnChange = ({ target: { value }}) => setState(value);

	return (
		<Container { ...{
			className: 'absMask-root',
			onChange: containerOnChange,
			resize: resize,
		} }
		>
			<MaskContainer { ...enhancedProps }/>
		</Container>
	);
};

export default Mask;
