import React, { useRef, useEffect, useState, Fragment } from 'react';
import color from '../../helper/color';
import Container from './Container';
import { identity } from '@laufire/utils/fn';
import buildEvent from './helper/buildEvent';

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

const setValue = ({ canvasRef, onChange }) => (evt) => {
	const value = getColor(evt, canvasRef);

	onChange(buildEvent(value));
};

const MaskContainer = (props) => {
	const {
		onChange = identity,
		state: { width, height }, setState, children,
	} = props;
	const canvasRef = useRef(null);

	useEffect(() => {
		setCanvasImage({ ...props, canvasRef });
	}, [width, height]);

	return <Fragment>
		{ children }
		<canvas
			ref={ canvasRef }
			className="mask"
			onClick={ setValue({ canvasRef, setState, onChange }) }
		/>
	</Fragment>;
};

const resize = { refreshRate: 250 };

const Mask = (props) => {
	const image = new Image();
	const [state, setState] = useState({ width: 0, height: 0 });

	const enhancedProps = { ...props, state, setState, image };

	const containerOnChange = ({ target: { value }}) => setState(value);

	return (
		<Container { ...{
			className: 'mask-container',
			onChange: containerOnChange,
			resize: resize,
		} }
		>
			<MaskContainer { ...enhancedProps }/>
		</Container>
	);
};

export default Mask;
