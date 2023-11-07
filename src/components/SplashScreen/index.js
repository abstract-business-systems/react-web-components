import React from 'react';
import { Container as MuiContainer } from '@mui/material';

const SplashScreen = (context) => {
	const { backgroundColor, textColor, children, ...args } = context;

	return (
		<MuiContainer
			{ ...args }
			disableGutters={ true }
			maxWidth={ false }
			sx={ {
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				height: '100dvh',
				backgroundColor: backgroundColor,
				color: textColor,
			} }
		>
			{ children }
		</MuiContainer>
	);
};

export default SplashScreen;
