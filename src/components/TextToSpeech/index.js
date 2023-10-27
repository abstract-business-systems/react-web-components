import { Box } from '@mui/material';
import React from 'react';
import { useSpeechSynthesis } from 'react-speech-kit';

const TextToSpeech = ({ value = 'Hello' }) => {
	const { speak } = useSpeechSynthesis();

	return (
		<Box onClick={ () => speak({ text: value }) }>{ value }</Box>
	);
};

export default TextToSpeech;
