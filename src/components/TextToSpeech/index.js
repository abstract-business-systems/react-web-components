import React from 'react';
import { useSpeechSynthesis } from 'react-speech-kit';
import IconButton from '../IconButton/index';

const TextToSpeech = ({ value = 'Hello' }) => {
	const { speak } = useSpeechSynthesis();

	return (
		<IconButton { ...{
			icon: 'VolumeUp',
			onClick: () => speak({ text: value }),
			color: 'primary',
		} }
		/>
	);
};

export default TextToSpeech;
