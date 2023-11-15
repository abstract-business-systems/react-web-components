import React from 'react';
import MediaPlayer from './components/MediaPlayer';

// eslint-disable-next-line max-lines-per-function
const App = () =>
	<div className="App">
		<MediaPlayer
			{ ...{
				value: {
					url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
					style: { width: '100%', height: '100%' },
				},
			} }
		/>
	</div>;

export default App;
