import React from 'react';
import SplashImage from '../stories/common/SplashScreen/SplashImage';
import SplashText from '../stories/common/SplashScreen/SplashText';
import MuiSplashScreen from '../stories/common/SplashScreen/index';
import image from '../assets/splash_icon/Splash_rotate.gif';

const component = {
	title: 'Display/SplashScreen',
	component: MuiSplashScreen,
	argTypes: {
		child: {
			type: 'select',
			options: ['SplashImage', 'SplashText'],
		},
		text: {
			control: { type: 'object' },
			if: { arg: 'child', eq: 'SplashText' },
		},
		imgSrc: {
			control: { type: 'object' },
			if: { arg: 'child', eq: 'SplashImage' },
		},
	},
	args: {
		text: 'hi',
		imgSrc: image,
	},
};

export default component;

const childComponents = {
	SplashImage,
	SplashText,
};

const Template = ({ child, text, imgSrc, ...rest }) => {
	const SelectedChild = childComponents[child];

	return <MuiSplashScreen { ...rest }>
		<SelectedChild { ...{ imgSrc } }>{ text }</SelectedChild>
	</MuiSplashScreen>;
};

export const SplashScreen = Template.bind({});

SplashScreen.args = {
	textColor: 'white',
	backgroundColor: 'black',
	child: 'SplashImage',
};
