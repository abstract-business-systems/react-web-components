import { merge } from '@laufire/utils/collection';

const landscapePortraitProps = {
	transformOrigin: 'right top',
	top: '100%',
	right: 0,
};

const getSize = {
	width: '100dvh',
	height: '100dvw',
};

const getPortrait = {
	'landscape-primary': {
		transform: 'rotate(-90deg)',
		transformOrigin: 'left bottom',
		left: '100%',
		bottom: 0,
		...getSize,
	},
	'landscape-secondary': {
		transform: 'rotate(90deg)',
		transformOrigin: 'right top',
		top: '100%',
		right: 0,
		...getSize,
	},
	'portrait-primary': {},
	'portrait-secondary': {
		transform: 'rotate(-180deg)',
		transformOrigin: 'left bottom',
		left: '100%',
		bottom: '100%',
		width: '100dvw',
		height: '100dvh',
	},
};

const LandscapePortrait = {
	'landscape-primary': {
		'portrait-primary': {
			transform: 'rotate(90deg)',
			...landscapePortraitProps,
			...getSize,
		},
		'portrait-secondary': {
			transform: 'rotate(-90deg)',
			...getSize,
			transformOrigin: 'right bottom',
			bottom: '100%',
			right: 0,
		},
	},
	'landscape-secondary': {
		'portrait-primary': {
			transform: 'rotate(-90deg)',
			...getSize,
			transformOrigin: 'left top',
			top: '100%',
			left: '0%',
		},
		'portrait-secondary': {
			transform: 'rotate(90deg)',
			...landscapePortraitProps,
			...getSize,
		},
	},
};

const getLandscape = {
	'landscape-primary': {},
	'landscape-secondary': {},
};

const lockOrientations = {
	portrait: (props) => getPortrait[props.orientation.type],
	landscape: (props) => {
		const mergedLandscape = merge(
			{}, getLandscape, LandscapePortrait[props.type]
		);

		return mergedLandscape[props.orientation.type];
	},
};

const helper = {
	getStyle: (props) => {
		const style = lockOrientations[props.lockOrientation](props);

		return style;
	},
};

export default helper;
