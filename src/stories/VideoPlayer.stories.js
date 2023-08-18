import React from 'react';
import ReactVideoPlayer from '../components/common/VideoPlayer';
import video from './assets/video.mp4';

const url = video;
const component = {
	title: 'Display/Video Player',
	component: ReactVideoPlayer,
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
	},
};

export default component;

const Template = ({ onChange, ...value }) =>
	<ReactVideoPlayer { ...{ value, onChange } }/>;

export const VideoPlayer = Template.bind({});

VideoPlayer.args = {
	url: url,
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
};
