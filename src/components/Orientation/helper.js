import { merge } from '@laufire/utils/collection';

const landscapePortraitProps = {
	transformOrigin: 'right top',
	top: '100%',
	right: 0,
};

const getSize = (props) => ({
	width: props.size.height,
	height: props.size.width,
});

const getPortrait = {
	'landscape-primary': (props) => ({
		transform: 'rotate(-90deg)',
		transformOrigin: 'left bottom',
		left: '100%',
		bottom: 0,
		...getSize(props),
	}),
	'landscape-secondary': (props) => ({
		transform: 'rotate(90deg)',
		transformOrigin: 'right top',
		top: '100%',
		right: 0,
		...getSize(props),
	}),
	'portrait-primary': () => ({}),
	'portrait-secondary': (props) => ({
		transform: 'rotate(-180deg)',
		transformOrigin: 'left bottom',
		left: '100%',
		bottom: '100%',
		...props.size,
	}),
};

const LandscapePortrait = {
	'landscape-primary': {
		'portrait-primary': (props) => ({
			transform: 'rotate(90deg)',
			...landscapePortraitProps,
			...getSize(props),
		}),
		'portrait-secondary': (props) => ({
			transform: 'rotate(-90deg)',
			...getSize(props),
			transformOrigin: 'right bottom',
			bottom: '100%',
			right: 0,
		}),
	},
	'landscape-secondary': {
		'portrait-primary': (props) => ({
			transform: 'rotate(-90deg)',
			...getSize(props),
			transformOrigin: 'left top',
			top: '100%',
			left: '0%',
			with: '100vh',
			height: '100vw',
		}),
		'portrait-secondary': (props) => ({
			transform: 'rotate(90deg)',
			...landscapePortraitProps,
			...getSize(props),
		}),
	},
};

const getLandscape = {
	'landscape-primary': () => ({}),
	'landscape-secondary': () => ({}),
};

const lockOrientations = {
	portrait: (props) => getPortrait[props.orientation.type](props),
	landscape: (props) => {
		merge(getLandscape, LandscapePortrait[props.type]);

		return getLandscape[props.orientation.type]
		&& getLandscape[props.orientation.type](props);
	},
};

const helper = {
	getStyle: (props) => {
		const style = lockOrientations[props.lockOrientation](props);

		return style;
	},
};

export default helper;
