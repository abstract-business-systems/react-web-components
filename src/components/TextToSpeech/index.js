import React from 'react';
import { useSpeechSynthesis } from 'react-speech-kit';
import buildEvent from '../common/helper/buildEvent';

const TextToSpeech = ({
	value = 'Hello', voice,
	...rest
}) => {
	const { speak, voices } = useSpeechSynthesis();

	return (
		<button { ...{
			onClick: () => buildEvent({
				value: speak({
					text: value,
					voice: voices[voice],
				}),
			}),
			...rest,
		} }
		/>
	);
};

export default TextToSpeech;
