import { Container as MuiContainer } from '@mui/material';
import * as React from 'react';

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
				height: '100vh',
				bgcolor: backgroundColor,
				color: textColor,
			} }
		>
			{ children }
		</MuiContainer>
	);
};

export default SplashScreen;
