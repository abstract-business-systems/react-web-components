import React from 'react';

const SplashImage = ({ imgSrc }) =>
	<img
		alt="SplashScreen"
		src={ imgSrc }
		style={ { width: '90vw' } }
	/>;

export default SplashImage;
