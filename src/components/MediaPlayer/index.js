import React, { useState } from 'react';
import { map, omit } from '@laufire/utils/collection';
import { nothing } from '@laufire/utils/fn';
import ReactPlayer from 'react-player/lazy';
import buildEvent from '../common/helper/buildEvent';

const events = {
	onReady: { status: 'ready' },
	onStart: { status: 'playing' },
	onPlay: { status: 'playing' },
	onPause: { status: 'paused' },
	onBuffer: { status: 'buffering' },
	onBufferEnd: { status: 'playing' },
	onError: { status: 'error' },
	onEnded: { status: 'ended' },
	onClickPreview: { mode: 'full' },
	onEnablePIP: { pip: true },
	onDisablePIP: { pip: false },
};

const displayStyle = {
	audio: ({ controls }) =>
		controls || { display: 'none' },
	video: nothing,
};

const progress = ({ playedSeconds, loadedSeconds }) => ({
	played: playedSeconds,
	loaded: loadedSeconds,
});

const ReactMediaPlayer = (props) => {
	const {
		playerProps: { type = 'video', ...playerProps },
		playerEvents, patchValue,
		value, style, ...rest
	} = props;

	return (
		<ReactPlayer	{ ...{
			...playerProps,
			...playerEvents,
			style: { ...style, ...displayStyle[type](playerProps) },
			onSeek: () => patchValue({ played: value.played }),
			onProgress: (seconds) => patchValue(progress(seconds)),
			onDuration: (duration) => patchValue({ duration }),
			onPlaybackRateChange: (speed) =>
				patchValue({ playbackRate: speed }),
			...rest,
		} }
		/>);
};

const MediaPlayer = ({ onChange = nothing, value: initialValue }) => {
	const { mode, status, ...rest } = initialValue;
	const playerProps = omit(rest, { played: 'played', loaded: 'loaded' });
	const light = mode === 'light';
	const playing = status === 'playing';
	const [value, setValue] = useState(initialValue);

	const patchValue = (data) => {
		const newValue = { ...value, ...data };

		setValue(newValue);
		onChange(buildEvent({ value: newValue }));
	};
	const playerEvents = map(events, (eventData) =>
		() => patchValue(eventData));

	const props = {
		playerProps, light,
		playing, playerEvents, patchValue, value,
	};

	return <ReactMediaPlayer { ...props }/>;
};

export default MediaPlayer;