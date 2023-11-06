const getPortrait = {
	'landscape-primary': (props) => ({
		transform: 'rotate(-90deg)',
		transformOrigin: 'left bottom',
		left: '100%',
		bottom: 0,
		width: props.size.height,
		height: props.size.width,
	}),
	'landscape-secondary': (props) => ({
		transform: 'rotate(-270deg)',
		transformOrigin: 'right top',
		top: '100%',
		right: 0,
		width: props.size.height,
		height: props.size.width,
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

const getLandscape = {
	'landscape-primary': () => ({}),
	'landscape-secondary': () => ({}),
	'portrait-primary': (props) => ({
		transform: 'rotate(90deg)',
		transformOrigin: 'right top',
		top: '100%',
		right: 0,
		width: props.size.height,
		height: props.size.width,
	}),
	'portrait-secondary': (props) => ({
		transform: 'rotate(90deg)',
		transformOrigin: 'right top',
		top: '100%',
		right: '0%',
		width: props.size.height,
		height: props.size.width,
	}),
};

const lockOrientations = {
	portrait: (props) => getPortrait[props.orientation.type](props),
	landscape: (props) => getLandscape[props.orientation.type](props),
};

const helper = {
	getStyle: (props) => {
		const style = lockOrientations[props.lockOrientation](props);

		return style;
	},
};

export default helper;
