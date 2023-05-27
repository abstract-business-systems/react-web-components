import * as React from 'react';
import SplashImage from '../stories/common/SplashScreen/SplashImage';
import SplashText from '../stories/common/SplashScreen/SplashText';
import MuiSplashScreen from '../stories/common/SplashScreen/index';

const component = {
	title: 'Components/SplashScreen',
	component: MuiSplashScreen,
	argTypes: {
		child: {
			control: {
				type: 'select',
				options: ['SplashImage', 'SplashText'],
			},
		},
	},
};

export default component;

const childComponents = {
	SplashImage,
	SplashText,
};

const Template = ({ child, text, ...rest }) => {
	const SelectedChild = childComponents[child];

	return <MuiSplashScreen { ...rest }>
		<SelectedChild>{ text }</SelectedChild>
	</MuiSplashScreen>;
};

export const SplashScreen = Template.bind({});

SplashScreen.args = {
	textColor: 'white',
	backgroundColor: 'black',
	child: 'SplashImage',
	text: '',
};
