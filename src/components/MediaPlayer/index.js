import React, { useRef, useState } from 'react';
import { map, omit } from '@laufire/utils/collection';
import { nothing } from '@laufire/utils/fn';
import ReactPlayer from 'react-player/lazy';
import buildEvent from '../common/helper/buildEvent';

const events = {
	onReady: { status: 'ready' },
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
const handleSeek = (time, playerRef) =>
	playerRef.current.seekTo(time, 'seconds');

const progress = ({ playedSeconds, loadedSeconds }) => ({
	played: playedSeconds,
	loaded: loadedSeconds,
});

const getEvents = (
	playerRef, patchValue, value
) => ({
	onStart: () => {
		handleSeek(value.seekToTime, playerRef);
		patchValue({ status: 'playing' });
	},
	onSeek: () => patchValue({ played: value.played }),
	onProgress: (seconds) => patchValue(progress(seconds)),
	onDuration: (duration) => patchValue({ duration }),
	onPlaybackRateChange: (speed) =>
		patchValue({ playbackRate: speed }),
});

const ReactMediaPlayer = (props) => {
	const {
		playerProps: { type = 'video', ...playerProps }, playerEvents,
		patchValue, stopped, value, style, ...rest
	} = props;
	const url = stopped ? null : playerProps.url;
	const playerRef = useRef(null);

	return (
		<ReactPlayer	{ ...{
			...{ ...playerProps, url },
			...playerEvents,
			ref: playerRef,
			style: { ...style, ...displayStyle[type](playerProps) },
			...getEvents(
				playerRef, patchValue, value
			),
			...rest,
		} }
		/>);
};

const MediaPlayer = ({ onChange = nothing, value: initialValue }) => {
	const { mode, status, ...rest } = initialValue;
	const playerProps = omit(rest, { loaded: 'loaded' });
	const light = mode === 'light';
	const playing = status === 'playing';
	const stopped = status === 'stopped';
	const [value, setValue] = useState(initialValue);

	const patchValue = (data) => {
		const newValue = { ...value, ...data };

		setValue(newValue);
		onChange(buildEvent({ value: newValue }));
	};
	const playerEvents = map(events, (eventData) =>
		() => patchValue(eventData));

	const props = {
		playerProps, light, stopped, playing,
		playerEvents, patchValue, value,
	};

	return <ReactMediaPlayer { ...props }/>;
};

export default MediaPlayer;
