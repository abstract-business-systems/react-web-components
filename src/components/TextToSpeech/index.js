import React from 'react';
import { useSpeechSynthesis } from 'react-speech-kit';
import buildEvent from '../common/helper/buildEvent';

const TextToSpeech = ({
	value = 'Hello',
	...rest
}) => {
	const { speak } = useSpeechSynthesis();

	return (
		<button { ...{
			onClick: () => buildEvent({ value: speak({ text: value }) }),
			...rest,
		} }
		/>
	);
};

export default TextToSpeech;
