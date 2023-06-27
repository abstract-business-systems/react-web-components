import React, { useState } from 'react';
import { map, omit } from '@laufire/utils/collection';
import { nothing } from '@laufire/utils/fn';
import ReactPlayer from 'react-player/lazy';
import buildEvent from './helper/buildEvent';

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
const reactPlayer = (
	playerProps, light, playing, playerEvents, patchValue, value
) =>
	<ReactPlayer
		{ ...{
			...playerProps,
			light: light,
			playing: playing,
			...playerEvents,
			onSeek: () => patchValue({ played: value.played }),
			onProgress: (state) => patchValue({
				played: state.playedSeconds,
				loaded: state.loadedSeconds,
			}),
			onDuration: (duration) => patchValue({ duration }),
			onPlaybackRateChange: (speed) =>
				patchValue({ playbackRate: parseFloat(speed) }),
		} }
	/>;

const VideoPlayer = ({ onChange = nothing, value: initialValue }) => {
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

	return (
		reactPlayer(
			playerProps, light, playing, playerEvents, patchValue, value
		)
	);
};

export default VideoPlayer;
