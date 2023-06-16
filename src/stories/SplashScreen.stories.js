import * as React from 'react';
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

// Todo: when SplashImage is selected as a child then imgSrc arg should be visible but
// text arg should not be visible and if SplashText is selected its viceverse.
SplashScreen.args = {
	textColor: 'white',
	backgroundColor: 'black',
	child: 'SplashImage',
	imgSrc: image,
	text: '',
};
