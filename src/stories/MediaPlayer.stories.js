import React from 'react';
import ReactMediaPlayer from '../components/MediaPlayer';
import video from './assets/video.mp4';
import audio from './assets/audio.mp3';
import { nothing } from '@laufire/utils/predicates';

const videoUrl = video;
const audioUrl = audio;
const component = {
	title: 'Display/MediaPlayer',
	component: ReactMediaPlayer,
	argTypes: {
		status: {
			type: 'select',
			options: [
				'playing',
				'paused',
			],
		},
		mode: {
			type: 'select',
			options: [
				'light',
				'normal',
			],
		},
		volume: {
			control: {
				type: 'range',
				min: 0,
				max: 1,
				step: 0.1,
			},
		},
		playbackRate: {
			control: {
				type: 'range',
				min: 0.25,
				max: 2,
				step: 0.25,
			},
		},
		type: {
			type: 'select',
			options: ['audio', 'video'],
		},
	},
	args: { type: 'video' },
};

export default component;

const mediaType = {
	audio: audioUrl,
	video: videoUrl,
};

const Template = ({ type, onChange, ...props }) => {
	const url = mediaType[type];
	const value = { ...props, url, type };

	return <ReactMediaPlayer { ...{ value, onChange } }/>;
}
;

export const MediaPlayer = Template.bind({});

MediaPlayer.args = {
	status: 'unknown',
	mode: 'light',
	loop: false,
	controls: true,
	volume: 0.5,
	muted: false,
	pip: false,
	played: 0,
	loaded: 0,
	duration: 0,
	playbackRate: 1.0,
	onChange: nothing,
};
